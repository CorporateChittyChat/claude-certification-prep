import { pathToFileURL } from 'node:url';

const findings = [
  {
    id: 'web-1',
    content: { claim: 'The pilot ran across three library branches.' },
    source: { url: 'https://example.org/library-pilot', title: 'Pilot update' },
  },
  {
    id: 'doc-1',
    content: { claim: 'The evaluation period was six weeks.' },
    source: { document: 'Library Pilot Evaluation', page: 7 },
  },
];

const searchWeb = async () => findings[0];
const readReport = async () => findings[1];

export async function demo({ stripSources = false } = {}) {
  const results = await Promise.all([searchWeb(), readReport()]);
  const handoff = results.map(({ id, content, source }) =>
    stripSources ? { id, content } : { id, content, source },
  );
  return { handoff, report: synthesize(handoff) };
}

function synthesize(handoff) {
  return handoff.map(({ id, content, source }) => {
    const citation = formatCitation(source);
    if (!citation) return `${id}: [missing source] ${content.claim}`;
    return `${id}: ${content.claim} [${citation}]`;
  });
}

export function formatCitation(source) {
  if (source?.url && source.title) return `${source.title} — ${source.url}`;
  if (source?.document && Number.isInteger(source.page) && source.page > 0) {
    return `${source.document}, p. ${source.page}`;
  }
  return null;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const { handoff, report } = await demo({ stripSources: process.argv.includes('--strip-sources') });
  console.log(JSON.stringify(handoff, null, 2));
  console.log('\nREPORT\n' + report.join('\n'));
}
