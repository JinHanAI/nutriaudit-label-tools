import assert from 'node:assert/strict'
import { findProductOverlaps, summarizeLabels, compareLabels, calculateDailyAmount, convertMass, lookupLabelName, exportInventoryCsv, calculateBottleCost } from './label-tools.mjs'
const a = { id: 'a', name: 'Example A', servingSize: '2', dailyUnits: '2', ingredients: [{ name: 'calcium', amount: '200', unit: 'mg' }] }
const b = { id: 'b', name: 'Example B', servingSize: '1', dailyUnits: '1', ingredients: [{ name: 'calcium', amount: '0.5', unit: 'g' }] }
const results = {
  duplicate: findProductOverlaps([a, b]),
  dailyTotal: summarizeLabels([a, b]),
  comparison: compareLabels(a, b),
  dailyAmount: calculateDailyAmount('250', '2', '1'),
  massConversion: convertMass('1', 'mg', 'mcg'),
  alias: lookupLabelName('cholecalciferol'),
  inventory: exportInventoryCsv([a, b]),
  bottleCost: calculateBottleCost('60', '2', '30'),
}
assert.equal(results.duplicate.length, 1)
assert.equal(results.dailyTotal[0].totalMg, 700)
assert.equal(results.comparison[0].changeMg, 300)
assert.equal(results.dailyAmount.value, 125)
assert.equal(results.massConversion.value, 1000)
assert.equal(results.alias.canonical, 'vitamin d3')
assert.ok(results.inventory.includes('Example A'))
assert.equal(results.bottleCost.days, 30)
console.log(JSON.stringify({ examples: 8, status: 'passed', results }, null, 2))
