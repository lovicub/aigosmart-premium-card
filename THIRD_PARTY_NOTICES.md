# License and provenance review

The repository uses the MIT License. On 2026-10-22 the supplier confirmed that the
JS, CSS and SVG were made by them with ChatGPT, in response to the question about
original authorship and permission to publish under MIT. This author statement,
plus the source inspection below, is the basis for licensing the supplied code.
It is not an independent proof of ownership of every possible design element.

The source README describes visual inspiration from a Smarthomecity Dehumidifier
card. No upstream source, package, repository link or copied license notice was
provided. The supplier confirmed original authorship rather than use of copied
third-party fragments. No third-party code copying was identified in the inspected
file; visual inspiration is recorded rather than represented as a bundled dependency.

Static inspection found no import/require statements, external JS/CSS/font/image
URLs, fetch/XMLHttpRequest/WebSocket calls, package manifest or bundled library.
The card uses browser APIs, inline CSS/SVG and Home Assistant's existing ha-card,
ha-icon and hass.callService interfaces. Those host components are not redistributed.
Home Assistant is separately licensed under Apache-2.0:
https://github.com/home-assistant/core/blob/dev/LICENSE.md

Aigostar branding appears as text in the inline drawing. No permission to use a
third-party trademark as an endorsement is claimed. All product names remain the
property of their owners. Node.js is used only for development checks and is not
shipped with this repository. Repeat the dependency/license review if imports,
assets or third-party code are added later.

Original file: premium-card/aigosmart-premium-card.js, v0.1.0.
SHA-256: cb9e923c7e3f4bb00114a8bafbd7794df87a832bc8f34c14eae5d54886fbb517
The publication copy is byte-identical to the supplied file.
