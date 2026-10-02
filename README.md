# NutriAudit Supplement Label Calculator & Ingredient Comparison

Compare supplement labels, find duplicate ingredient names, calculate daily label amounts, convert mg and mcg, and export a printable supplement list. Eight open-source JavaScript tools run locally with zero dependencies.

**[Use the supplement label tools online](https://www.nutriaudit.com/tools/supplement-label-tools?utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme)** — no download is needed. Prefer offline use? Follow the [quick start](#quick-start). Building your own tool? [Import the functions](#import-a-function).

**These tools do arithmetic and label organization. They do not determine whether a supplement combination is safe, recommend doses, diagnose conditions, or check drug interactions.**

## What can I do with my supplement labels?

- **A multivitamin and a separate calcium product:** find repeated ingredient names and total the known daily label amounts.
- **Two products you are considering:** compare their entered labels on the same daily-unit basis.
- **A collection you want to organize:** make a supplement list for your records, export CSV, or print it for a conversation with a clinician.

Read the [worked examples for all eight tools](docs/supplement-label-calculations.md). They show the inputs, expected results and limits using synthetic labels.

## Focused tools you can run independently

Each focused project has its own local demo, worked example and question-based guide. They reuse this toolkit’s MIT core.

- [Supplement label overlap & daily totals](https://github.com/JinHanAI/nutriaudit-label-overlap): repeated label names and known daily amounts.
- [Two supplement label comparison](https://github.com/JinHanAI/nutriaudit-label-compare): shared and one-sided ingredients, with arithmetic differences.
- [Supplement list export](https://github.com/JinHanAI/nutriaudit-list-export): local spreadsheet-safe CSV and printing for an appointment.

Their main-site links identify the referring project without transferring label input. These are focused distribution experiments; separate repositories do not guarantee search ranking or AI citations.

## Eight supplement label tools

| Task | What you get | Module function |
|---|---|---|
| [Duplicate supplement ingredients](https://www.nutriaudit.com/tools/supplement-label-tools?task=duplicate&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Names shared across entered products | `findProductOverlaps` |
| [Daily supplement amount calculator](https://www.nutriaudit.com/tools/supplement-label-tools?task=daily-total&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Sum known amounts using your actual daily units | `summarizeLabels` |
| [Supplement label comparison](https://www.nutriaudit.com/tools/supplement-label-tools?task=compare&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Shared names and comparable daily quantities | `compareLabels` |
| [Serving size calculator](https://www.nutriaudit.com/tools/supplement-label-tools?task=daily-dose&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Amount per serving × daily units ÷ units per serving | `calculateDailyAmount` |
| [mg to mcg converter](https://www.nutriaudit.com/tools/supplement-label-tools?task=units&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Convert the same substance between g, mg and mcg | `convertMass` |
| [Sourced name lookup](https://www.nutriaudit.com/tools/supplement-label-tools?task=aliases&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Four explicit groups: calcium, vitamin C, vitamin D2, vitamin D3 | `lookupLabelName` |
| [Printable supplement list and CSV](https://www.nutriaudit.com/tools/supplement-label-tools?task=inventory&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Local CSV and printable list | `exportInventoryCsv` |
| [Supplement cost per day calculator](https://www.nutriaudit.com/tools/supplement-label-tools?task=cost&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme) | Estimated days and daily cost for your entered plan | `calculateBottleCost` |

No package installation, API key, account, database, or external asset is required. Original label names remain visible; an unknown amount is not converted into zero. Name overlap is not a clinical interaction or a safety conclusion.

## Quick start

Use Node.js 22 or later to run all eight synthetic examples:

```sh
node examples.mjs
node --test tests/*.test.mjs
```

To run the browser demo, serve this directory locally:

```sh
python3 -m http.server 3140 --bind 127.0.0.1
```

Open http://127.0.0.1:3140/. Choose a task, load a synthetic example or enter your own label, and show the result. The English and Chinese interfaces share the same calculations. Inventory can be downloaded as CSV or printed. Download failures display a printing alternative.

## Import a function

```js
import { calculateDailyAmount, convertMass } from './label-tools.mjs'

// The label says 250 mg per 2 capsules; you enter 1 capsule per day.
calculateDailyAmount('250', '2', '1') // { value: 125, error: null }
convertMass('1', 'mg', 'mcg')        // { value: 1000, error: null }
```

Product inputs use strings taken from the label:

```js
const product = {
  id: 'a',
  name: 'Synthetic example',
  servingSize: '2',        // units per label serving
  dailyUnits: '1',         // actual units used per day, using the same unit
  ingredients: [{ name: 'calcium', amount: '200', unit: 'mg' }],
  notes: '',
}
```

These numbers are synthetic demonstrations, not suggested intake. Use the same capsule/scoop/etc. basis for serving size and daily units. Missing values remain unknown; invalid values return an explanation. IU, %DV and volume do not have a universal conversion into mass. Salt weight is not automatically turned into nutrient weight. Vitamin D2 and D3 remain separate groups.

## Sources and coverage

The small name lookup covers four explicitly listed groups, not a comprehensive supplement database. Sources: [NIH calcium](https://ods.od.nih.gov/factsheets/Calcium-Consumer/), [NIH vitamin C](https://ods.od.nih.gov/factsheets/VitaminC-Consumer/), [NIH vitamin D](https://ods.od.nih.gov/factsheets/VitaminD-Consumer/). A grouped label name does not establish chemical or clinical equivalence.

## Frequently asked questions

### How do I add calcium from a multivitamin and another supplement?

Calculate each product's amount using the units you actually take per day, convert compatible mass units, then add the amounts for the same supported label name. For example, synthetic daily amounts of 200 mg and 0.5 g of calcium total 700 mg. That is label arithmetic, not an assessment of your total dietary intake or whether the amount is appropriate. [See the daily-total example](docs/supplement-label-calculations.md#daily-supplement-amount-calculator).

### How do I compare two supplement labels with different serving sizes?

Enter each label's amount per serving, units per serving and actual daily units. The comparison uses the calculated daily amounts, rather than assuming that one capsule equals one serving. A larger number does not establish a better product. [See the comparison example](docs/supplement-label-calculations.md#supplement-label-comparison).

### How many mcg are in 1 mg?

1 mg equals 1,000 mcg. The converter also accepts μg and µg for micrograms. It converts mass units for the same substance; it does not convert IU, %DV or mL into mass. [Try the unit converter](https://www.nutriaudit.com/tools/supplement-label-tools?task=units&utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme).

### Can I export a vitamin and supplement list to a spreadsheet?

Yes. The inventory tool exports the entered product names, serving sizes, ingredients, amounts, units and notes as local CSV. The browser demo also supports printing. CSV preserves the label entries rather than inventing missing values. [See the inventory example](docs/supplement-label-calculations.md#printable-supplement-list-and-csv-export).

### Does a duplicate ingredient mean the combination is unsafe?

No. A repeated label name is a prompt to review your list, not a safety conclusion. This toolkit does not assess medical history, drug interactions, upper intake limits or your diet. [Continue with your full supplement list](#continue-with-your-full-supplement-list) if you want to move beyond the small label task.

### Why is a total missing instead of zero?

A missing amount, unsupported unit or unverified ingredient name prevents a reliable total. The result stays unknown and explains the limitation. Name lookup covers calcium, vitamin C, vitamin D2 and vitamin D3 only; other names may be shown as literal overlaps without a total.

## Continue with your full supplement list

After the small task, each result offers a relevant next step: review your whole list in [NutriAudit's core supplement audit](https://www.nutriaudit.com/scan?utm_source=github&utm_medium=referral&utm_campaign=label_tools&utm_content=readme). The website offers a free preview; a full report follows its displayed pricing.

The standalone demo does **not** transfer entered labels to the website. Its links contain fixed campaign and task attribution only. Add or upload your actual labels on NutriAudit. Examples are never treated as personal labels.

## Privacy

- The modules and demo make no network requests and use no analytics SDK.
- Inputs stay in the current page and are lost when it closes. There is no account or health-data storage.
- CSV and printing happen locally. Keep exported files under your own control.
- CSV generation neutralizes common spreadsheet formula prefixes; spreadsheet import settings may vary.
- Following the optional NutriAudit link opens that website, where its privacy policy applies.

## License and maintenance

MIT for this toolkit's code. Linked sources are external references; their content is not relicensed here. The commercial NutriAudit application, payment code, model prompts, product database and private reports are not part of this repository.

Report calculation or input-handling problems with a minimal synthetic example. Do not put personal health details, real labels with identity information, credentials or payment data in public issues.
