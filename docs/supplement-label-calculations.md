# Supplement Label Calculations: Eight Worked Examples

Use this guide to compare supplement labels, calculate daily amounts, convert mass units and organize a printable supplement list. Each example uses the functions in this repository and includes an expected result you can reproduce.

**[Open the online supplement label tools](https://www.nutriaudit.com/tools/supplement-label-tools?utm_source=github&utm_medium=referral&utm_campaign=label_tools)** or follow the [offline quick start](../README.md#quick-start). All quantities and prices below are synthetic examples, not suggested intake or actual product claims. These tools do not determine safety or recommend doses.

## Example labels and serving sizes

Run the snippets from the repository root with Node.js 22 or later. Copy this setup first, then add the snippet for the task you want to try. The browser tools use the same calculation logic.

```js
import {
  findProductOverlaps, summarizeLabels, compareLabels,
  calculateDailyAmount, convertMass, lookupLabelName,
  exportInventoryCsv, calculateBottleCost,
} from './label-tools.mjs'

const a = {
  id: 'a', name: 'Example A', servingSize: '2', dailyUnits: '2',
  ingredients: [{ name: 'calcium', amount: '200', unit: 'mg' }],
}
const b = {
  id: 'b', name: 'Example B', servingSize: '1', dailyUnits: '1',
  ingredients: [{ name: 'calcium', amount: '0.5', unit: 'g' }],
}
```

Label A contains 200 mg of calcium per two units; the example uses two units per day. Label B contains 0.5 g per one unit; the example uses one unit per day. The daily amounts are therefore 200 mg and 500 mg. Always use the same unit, such as capsules or scoops, for the serving size and daily units within each product.

## Duplicate supplement ingredients

**Question:** Do these two labels list the same ingredient?

```js
const overlaps = findProductOverlaps([a, b])
console.log(overlaps.map(row => ({ name: row.key, products: row.productIds })))
// [{ name: 'calcium', products: ['a', 'b'] }]
```

Calcium appears in both entered products. A shared name does not establish an overdose, interaction or unsafe combination. Unverified names are matched literally after normalization of case and whitespace; they are not silently treated as equivalent nutrients.

[Find repeated ingredient names online](https://www.nutriaudit.com/tools/supplement-label-tools?task=duplicate&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Daily supplement amount calculator

**Question:** What is the combined daily calcium amount on these labels?

```js
const totals = summarizeLabels([a, b])
console.log(totals.find(row => row.key === 'calcium').totalMg)
// 700
```

The result is 200 mg + 500 mg = **700 mg from the entered labels per day**. Food, unentered products and medical context are outside this calculation. The toolkit does not compare the result with a recommended intake or an upper limit.

If one amount is missing, the combined result stays unknown:

```js
const missing = {
  ...b, ingredients: [{ name: 'calcium', amount: '', unit: 'g' }],
}
console.log(summarizeLabels([a, missing])[0].totalMg)
// null
```

Automatic totals are limited to calcium, vitamin C, vitamin D2 and vitamin D3 with supported mass units. Other names can be organized without inventing a total.

[Calculate daily label totals online](https://www.nutriaudit.com/tools/supplement-label-tools?task=daily-total&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Supplement label comparison

**Question:** How do these two products compare at the entered daily usage?

```js
const comparison = compareLabels(a, b)
const calcium = comparison.find(row => row.key === 'calcium')
console.log([calcium.aMg, calcium.bMg, calcium.changeMg])
// [200, 500, 300]
```

Label B contributes 300 mg more calcium per entered day than label A. This is a quantity comparison, not a recommendation to choose B. Ingredients listed on only one side remain one-sided; a missing ingredient is not assumed to contain zero.

[Compare two supplement labels online](https://www.nutriaudit.com/tools/supplement-label-tools?task=compare&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Serving size calculator

**Question:** If a label says 250 mg per two capsules, what amount corresponds to one capsule?

```js
console.log(calculateDailyAmount('250', '2', '1').value)
// 125
```

The formula is **amount per serving × actual daily units ÷ units per serving**. Here, 250 mg × 1 ÷ 2 = 125 mg. The output keeps the unit of the entered amount; the function does not select how many capsules you should take. Empty inputs and a zero serving size return an explanation instead of a number.

[Calculate an amount from serving size online](https://www.nutriaudit.com/tools/supplement-label-tools?task=daily-dose&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## mg to mcg converter

**Question:** How do I compare amounts written in milligrams and micrograms?

```js
console.log(convertMass('1', 'mg', 'mcg').value)    // 1000
console.log(convertMass('1000', 'mcg', 'mg').value) // 1
console.log(convertMass('0.5', 'g', 'mg').value)   // 500
console.log(convertMass('1', 'IU', 'mg').value)   // null
```

1 mg = 1,000 mcg; 1 g = 1,000 mg. The converter accepts `mcg`, `μg`, `µg` and `ug` for micrograms. Use it for the same substance. It cannot convert IU, %DV or volume into mass without additional substance-specific information, and it does not turn calcium carbonate mass into elemental calcium.

[Convert g, mg and mcg online](https://www.nutriaudit.com/tools/supplement-label-tools?task=units&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Supplement ingredient name lookup

**Question:** Which listed group includes cholecalciferol?

```js
console.log(lookupLabelName('cholecalciferol').canonical) // 'vitamin d3'
console.log(lookupLabelName('ergocalciferol').canonical)  // 'vitamin d2'
console.log(lookupLabelName('calcium carbonate'))        // null
```

The lookup has four explicit groups: calcium, vitamin C, vitamin D2 and vitamin D3. It links recognized names to the [NIH sources listed below](#sources-and-scope); it is not a comprehensive ingredient database. Vitamin D2 and D3 stay separate. A shared lookup group does not prove clinical interchangeability.

[Look up supported label names online](https://www.nutriaudit.com/tools/supplement-label-tools?task=aliases&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Printable supplement list and CSV export

**Question:** How do I organize my entered labels in a spreadsheet or printable list?

```js
const csv = exportInventoryCsv([a, b], 'en')
console.log(csv)
// Product, Units per serving, Units per day, Ingredient,
// Amount per serving, Unit, Notes (quoted CSV cells)
```

The CSV contains one row per entered ingredient and preserves product names, label amounts, serving units and notes. The static browser demo provides download and print buttons. Common spreadsheet formula prefixes are neutralized; review spreadsheet import settings when opening a file. Files stay under your control and are not uploaded by the standalone demo.

[Make a printable supplement list or CSV online](https://www.nutriaudit.com/tools/supplement-label-tools?task=inventory&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Supplement cost per day calculator

**Question:** How long does a bottle last, and what is the cost for the entered daily usage?

```js
const cost = calculateBottleCost('60', '2', '30')
console.log(cost.days)       // 30
console.log(cost.costPerDay) // 1
```

A synthetic bottle with 60 servings, used at two servings per day, lasts 30 days. A price of 30 in your chosen currency gives a daily cost of 1 in that same currency. The function does not convert currencies or recommend usage. Enter **servings**, not capsule count unless one capsule equals one serving. Leaving the price empty still calculates days, with an unknown daily cost.

[Estimate bottle duration and daily cost online](https://www.nutriaudit.com/tools/supplement-label-tools?task=cost&utm_source=github&utm_medium=referral&utm_campaign=label_tools).

## Continue from a label task to your full list

A repeated ingredient or calculated total may leave you with a broader question about your whole supplement list. You can optionally [start a full-list review on NutriAudit](https://www.nutriaudit.com/scan?utm_source=github&utm_medium=referral&utm_campaign=label_tools), which offers a free preview and a full report at its displayed pricing.

The standalone toolkit does not send your entered labels to NutriAudit. Links use fixed task and campaign parameters; add or upload your actual labels on the website. The website has its own privacy policy. Arithmetic here does not replace advice from a clinician.

## Sources and scope

- [NIH Office of Dietary Supplements: calcium](https://ods.od.nih.gov/factsheets/Calcium-Consumer/)
- [NIH Office of Dietary Supplements: vitamin C](https://ods.od.nih.gov/factsheets/VitaminC-Consumer/)
- [NIH Office of Dietary Supplements: vitamin D](https://ods.od.nih.gov/factsheets/VitaminD-Consumer/)

These references support the limited label-name lookup. They do not validate each user-entered label or endorse the toolkit, and their content is not relicensed. You can reproduce the calculations with `node examples.mjs` and review input boundaries with `node --test tests/*.test.mjs`. [Return to the README](../README.md).
