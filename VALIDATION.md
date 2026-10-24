# Validation — v0.1.1-beta.1

Date: 2026-10-24. Node.js 22.23.4. Branch: `beta/enum-compat-v011`.
Stable base: `52178c322f4afd6cd936ef1599e0cd7b3453c154` (latest origin/main).
Only README differs between the earlier local main and this upstream main;
those upstream documentation changes are retained. Stable main is not modified.

- JS syntax: passed (`node --check aigosmart-premium-card.js`).
- Complete offline JS suite: 31 passed (`node tests/card.test.mjs`).
- Existing 14 control/confirmation/busy/security regressions remain passing.
- Added cases cover every Mode/status numeric + string + English mapping,
  semantic aliases, prototype names, numeric/text mixed states/options,
  integration v0.1.3 and v0.1.4 beta shapes, live label precedence,
  options-only and labels-only updates, all available modes, unknown/malformed
  values, translated description-sensor exclusion and sanitized service errors.
- Stable SVG artwork and CSS are unchanged; no dependency or build step added.
- HACS JSON, intended diff, whitespace and secret-pattern review pass locally.
- GitHub JavaScript and HACS plugin checks are required green on the exact beta
  commit before pre-release publication. hassfest applies only to the integration.
- Integration companion v0.1.4-beta.2 passes 158 offline tests under each of
  cryptography 48.0.1 and 50.0.1; its v0.1.3 recovery/control suite is retained.

DOM/VM stubs and mocked service calls are used; no live heating, HA-instance
modification, installed frontend, browser layout or accessibility test occurred.
Compatibility means the documented state/option contracts are regression-tested,
not that every third-party model or translated label is recognized. Unknown
options remain selectable by exact declared value; unknown aliases are not guessed.

Commands:

```sh
node --check aigosmart-premium-card.js
node tests/card.test.mjs
git diff --check
```

Local log: `/tmp/aigo-card-beta-tests.log`. Publish as v0.1.1-beta.1 with
`--prerelease --latest=false`, pointing to the checked beta branch commit.
No merge to stable main and no automatic closure of issue #3.

---

# v0.1.0 validation — historical baseline

Preparation date: 2026-10-22. Card v0.1.0; companion integration v0.1.1.

- GitHub CLI `gh api user --jq '.login'` returned lovicub. No other profile fields
  or authentication tokens were exported.
- Supplied JS and publication JS SHA-256 match exactly:
  cb9e923c7e3f4bb00114a8bafbd7794df87a832bc8f34c14eae5d54886fbb517.
- Node.js v22.23.4: `node --check aigosmart-premium-card.js` passed.
- `node tests/card.test.mjs`: 14 offline tests passed using mock HA services.
- Tests cover registration, no command on initialization, heating ON/OFF,
  confirmation cancellation, unavailable states, temperature bounds, mode key 0,
  keep-warm limits, single request after failure, busy guard, escaped name and more-info.
- HACS JSON, workflow YAML, example YAML and required README sections checked locally.
- Repository has a matching aigosmart-premium-card.js at root and
  content_in_root=true; validation action category is plugin.
- Privacy and provenance review: see SECURITY_REVIEW.md and THIRD_PARTY_NOTICES.md.
- Official HACS validation was not run locally: Docker is unavailable and this
  remote repository has not been published. The official workflow is configured.
- hassfest is not applicable to this dashboard card.

Node.js was downloaded into /tmp from nodejs.org; the archive SHA-256 matched the
published SHASUMS256.txt. It was not installed system-wide or bundled with the card.
No browser layout/live HA interaction or physical kettle test was performed.
DOM stubs do not validate browser parsing or event binding in a real dashboard.
The working JavaScript and the integration's Python files were not modified.
