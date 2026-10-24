# Changelog

## 0.1.1-beta.1 — 2026-10-24 — ENUM COMPATIBILITY BETA

- Add normalizeMode/normalizeStatus for numeric values, numeric strings, English
  labels and existing German aliases, using private semantic identifiers.
- Prefer live TSL label metadata; display other model-specific options without
  assigning tested-kettle meanings. Handle unknown/unavailable values safely.
- Resolve all select services against current HA options, preserving exact values
  and rejecting unsupported/ambiguous aliases. Rerender on options/labels/limits
  changes even without a state change.
- Use normalized status for display, visual activity, colors and steam; keep the
  power switch as the heating-command authority and active-animation guard.
- Exclude diagnostic/description sensors from raw-status auto-detection, including
  translated description names. Preserve existing configured entity IDs.
- Keep SVG/CSS design, temperature/keep-warm controls, start confirmation, busy
  guard and one-attempt services. Log service errors as a fixed summary only.
- Add offline compatibility coverage for integration v0.1.3 and v0.1.4 betas,
  every known enum, numeric/text options, unknowns and attribute-only updates.

This opt-in pre-release is not merged into stable main. No live HA/kettle or
browser verification was performed. Issue #3 remains open for user verification.

## 0.1.0 — historical baseline

- Independent Premium Card with inline SVG, temperature presets, explicit heating
  controls, keep-warm duration, mode select, status and confirmation.
