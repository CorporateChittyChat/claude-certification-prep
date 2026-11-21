import assert from 'node:assert/strict';
import test from 'node:test';
import { demo, formatCitation } from './demo.mjs';

test('a citation survives the handoff for each source type', async () => {
  const {handoff, report} = await demo();
  assert.equal(handoff.length, 2);
  assert.match(report[0], /https:\/\/example\.org\/library-pilot/);
  assert.match(report[1], /Library Pilot Evaluation, p\. 7/);
});

test('removing sources leaves claims unchanged and visibly unverified', async () => {
  const fixed = await demo();
  const broken = await demo({stripSources: true});
  assert.deepEqual(broken.handoff.map(({content}) => content), fixed.handoff.map(({content}) => content));
  assert.ok(broken.handoff.every((finding) => !Object.hasOwn(finding, 'source')));
  assert.ok(broken.report.every((line) => line.includes('[missing source]')));
});

test('an incomplete citation is flagged instead of printing a guessed source', () => {
  assert.equal(formatCitation({document: 'Library Pilot Evaluation'}), null);
  assert.equal(formatCitation({url: 'https://example.org/library-pilot'}), null);
});
