# Validation results

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
