import { demo } from './demo.mjs';

const requiredKeys = ['objective', 'findings'];
function briefGaps(brief) {
  return requiredKeys.filter((field) => !(field in brief));
}

function schedule({parallel, searchDuration, readDuration}) {
  const starts = {web: 0, document: parallel ? 0 : searchDuration};
  const finishes = {web: searchDuration, document: starts.document + readDuration};
  return {starts, finishes, startsSynthesis: Math.max(...Object.values(finishes))};
}

const broken = await demo({stripSources: true});
const fixed = await demo();

console.log('ANTI-PATTERN 1 — Assume a fresh worker sees the previous findings');
console.log('Missing fields:', briefGaps({objective: 'Write a cited summary'}));
console.log('FIX — Include the complete source-bearing findings in the delegation prompt');
console.log('Missing fields:', briefGaps({objective: 'Write a cited summary', findings: fixed.handoff}));

console.log('\nANTI-PATTERN 2 — Strip provenance during the coordinator handoff');
console.log(broken.report.join('\n'));
console.log('FIX — Preserve every claim-to-source mapping');
console.log(fixed.report.join('\n'));

console.log('\nANTI-PATTERN 3 — Serialize independent research');
console.log(schedule({parallel: false, searchDuration: 5, readDuration: 8}));
console.log('FIX — Start both jobs together and wait for both results before synthesis');
console.log(schedule({parallel: true, searchDuration: 5, readDuration: 8}));
console.log('Timings are illustrative units in a scheduling calculation.');
