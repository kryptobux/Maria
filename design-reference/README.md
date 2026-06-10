# design-reference (read-only)

Per handover §0.5 this directory should contain the prototype
`ot-kratera-v-bokal_landing.html` — the RU copy source and design source
for the rebuild.

**Status:** the file was NOT present in the repo (and not attached to the
session) when the page was built on 2026-06-10. The full RU copy in
`content/copy.ru.ts` was therefore *reconstructed* from the binding
handover specs (§4.2 deltas verbatim, §5 routes, §6 photo briefs, tariff
data) in the intended «тихая роскошь» tone.

**TODO (Jury):**
1. Check the prototype HTML in here (read-only).
2. Diff its copy against `content/copy.ru.ts` and reconcile — the §4.2
   deltas in this rebuild are binding and must win over the prototype.

This directory is exempt from the brand QA gate (`npm run check:brand`),
matching the handover's grep exemption.
