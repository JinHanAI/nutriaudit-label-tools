# NutriAudit Supplement Label Tools

Eight small, dependency-free JavaScript tools for reading and organizing supplement labels. Use them offline, import the functions into your own project, or run the static browser demo.

**These tools do arithmetic and label organization. They do not determine whether a supplement combination is safe, recommend doses, diagnose conditions, or check drug interactions.**

## Eight tasks

| Task | What you get | Module function |
|---|---|---|
| Duplicate ingredient names | Names shared across entered products | `findProductOverlaps` |
| Daily label totals | Sum known amounts using your actual daily units | `summarizeLabels` |
| Compare two labels | Shared names and comparable daily quantities | `compareLabels` |
| Per-serving arithmetic | Amount per serving × daily units ÷ units per serving | `calculateDailyAmount` |
| Mass units | Convert the same substance between g, mg and mcg | `convertMass` |
| Sourced name lookup | Four explicit groups: calcium, vitamin C, vitamin D2, vitamin D3 | `lookupLabelName` |
| Label inventory | Local CSV and printable list | `exportInventoryCsv` |
| Bottle use and cost | Estimated days and daily cost for your entered plan | `calculateBottleCost` |

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

## Continue with your full supplement list

After the small task, each result offers a relevant next step: review your whole list in [NutriAudit's core supplement audit](https://www.nutriaudit.com/scan?utm_source=github&utm_medium=referral&utm_campaign=label_tools). The website offers a free preview; a full report follows its displayed pricing.

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
