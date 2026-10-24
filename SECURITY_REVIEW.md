# Beta v0.1.1-beta.1 security update — 2026-10-24

Service failures now log a fixed summary rather than the raw backend exception.
Options and label text remain HTML escaped. Unknown/prototype-name aliases are
not treated as semantic states; select calls use only actual current options.
The card has no account login, direct cloud client or automatic service retry.
Attribute-only updates to options/labels/limits are included in rendering.
Offline tests cover these changes. The following original review is historical;
its raw-error-logging and state-only-signature limitations are resolved in this
beta. Other browser/XSS/layout limitations of VM stubs remain; this is not a
complete browser security audit.

---

# Security and privacy review

Reviewed on 2026-10-22. Source: premium-card/aigosmart-premium-card.js v0.1.0.
The publication file is byte-identical to the supplied JS (SHA-256 in VALIDATION.md).

## Publication data

No hard-coded account email, password, access/session token, live iotId, MAC,
private IP or Virtual ID was identified in the card or exported documentation.
YAML entity IDs are synthetic examples, not account/device identifiers. The public
GitHub username lovicub was obtained using the requested read-only CLI command.

No .env, .venv, node_modules, private reports, logs, caches, HA .storage files,
account exports or source Git history were copied. The source Polish README was
used for provenance review; the English README and example YAML were written from
the actual code. Both repositories have fresh Git history without commits/remotes.
No repository, issue, message, release or other content was published to GitHub.

## Automated scan

The final local detect-secrets 1.5.0 scan covered 58 publishable files across both
repositories, using --no-verify and one-file invocations (no external token checks).
It found zero candidates in the card repository and the same 11 reviewed candidates
in the integration: two on a public app constant, four password-label strings and
five synthetic test credentials. Independent checks found only reserved example
emails, no IPv4/MAC literals, no repository-owner placeholders, and no prohibited export paths.
Raw scan data remains outside both repositories.

## Runtime inspection

The card has no direct network client, cloud credentials, external import or storage
API. It sends commands through the supplied hass.callService object. Offline tests
use a mock and never send a real command. Initialization only renders state.
A busy guard prevents concurrent requests; failed services are not retried by the card.

Observed limitations, preserved because changes to working logic were prohibited:

- service() logs the raw caught exception object to console.error. HA/backend errors
  may contain entity identifiers or other details. Redact browser logs before sharing.
- Rendering uses innerHTML. Name and select-option text are escaped, while some
  preset values and number-entity attributes are interpolated into markup. Configure
  trusted numeric presets and entity attributes; the mock tests are not a complete
  browser/XSS audit and do not certify arbitrary hostile metadata as safe.
- The hass update signature follows state values, not all attribute changes; a reload
  may be needed after entity limits or option attributes change.

No modifications were made to hide or fix those behaviors in the supplied JS.
No actual private values were found by the publication-content review; this is not
a guarantee against every possible secret pattern or runtime data exposure.

## Rights and dependencies

The supplier confirmed original authorship with ChatGPT and permission to publish
on MIT. Source inspection found no external runtime library or vendored dependency.
Visual inspiration noted in the original README is recorded in THIRD_PARTY_NOTICES.md.
Host HA components and trademarks retain their own ownership and license terms.
The authorship declaration is not an independent copyright-clearance certificate.

## Git and publication

The publication repository was initialized independently and contains no inherited
history. The visible original project .git did not expose valid auditable history.
Before publishing future commits, repeat the scan if additional files are added.
Only the two named publication directories should be used as GitHub CLI sources.
