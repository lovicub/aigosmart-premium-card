# AigoSmart Premium Card

A native Home Assistant dashboard card for AigoSmart kettles. Version **0.1.1-beta.1** (opt-in beta).
Animated kettle artwork, target-temperature presets and everyday controls in one
responsive card. No external JavaScript or CSS libraries are required.

The Python integration is a separate project:
[**AigoSmart HA**](https://github.com/lovicub/aigosmart-ha). Install and configure
it first. This card uses Home Assistant entity services; it does not log in to
AigoSmart or communicate directly with Alibaba IoT.

<img width="728" height="1292" alt="image" src="https://github.com/user-attachments/assets/f0de3a4a-f8d8-494a-af9b-ca04b0767fd7" />

<img width="744" height="1216" alt="image" src="https://github.com/user-attachments/assets/cd9ec3c8-b8ab-489d-bed3-cc172744301c" />


## Features

- Heating ON/OFF, with confirmation before starting by default.
- Target-temperature slider and presets; changes are sent with **Übernehmen** (Apply).
- Mode selection using the options exposed by your Home Assistant select entity.
- Keep-warm duration adjustment respecting the number entity's range and step.
- Status and time display, plus Home Assistant more-info dialogs.
- Inline SVG kettle, temperature-based glow, steam effects and responsive layout.
- Reduced-motion support and optional animation disablement.
- Busy-state guard and no automatic retry of failed service requests.

The large temperature readout and glow represent the **target temperature**, not
a live measurement of water temperature. The supplied UI labels and confirmations
are currently German; this English README does not imply an English card UI.
Device-provided labels take precedence. Without them, known numeric/text modes
use German display labels; other declared options display their original text.
The card does not switch heating on when it is loaded or when HA sends state updates.

## Supported devices

Intended for kettles supported by [AigoSmart HA](https://github.com/lovicub/aigosmart-ha)
that provide the entity domains listed below. No exact retail model number has
been supplied, so universal Aigostar device support is not claimed. Other appliances
and cloud regions are outside the verified scope of the integration.

## Installation via HACS

After the repository is published:

1. Open **HACS → Custom repositories**.
2. Add `https://github.com/lovicub/aigosmart-premium-card`.
3. Select **Dashboard** as the category and download the card.
4. Check that the dashboard resource is registered as a **JavaScript module**.
5. Reload the browser, then add the YAML configuration below.

The HACS backend/action calls this category `plugin`. This project is a custom
repository; inclusion in the default HACS catalog is not claimed.

## Manual installation

1. Copy `aigosmart-premium-card.js` to `config/www/aigosmart-premium-card.js`.
2. In **Settings → Dashboards → Resources**, add
   `/local/aigosmart-premium-card.js?v=0.1.1-beta.1` with type **JavaScript module**.
   Enable advanced mode if Resources is hidden.
3. Reload your browser and add a Manual card with the configuration below.

For updates, replace the JS file, change the resource query version and reload
the browser. Do not add both manual and HACS resource entries for the same card.

## Configuration

Install and verify the integration first. Replace these example entity IDs with
the actual IDs shown in **Developer tools → States**:

```yaml
type: custom:aigosmart-premium-card
name: AigoSmart Kettle
power_entity: switch.aigosmart_kettle_heatingswitch
target_entity: number.aigosmart_kettle_target_temperature
status_entity: sensor.aigosmart_kettle_status
mode_entity: select.aigosmart_kettle_mode
keep_warm_entity: number.aigosmart_kettle_heatpreservation
time_entity: sensor.aigosmart_kettle_time
animate: true
confirm_start: true
min_temperature: 40
presets: [40, 70, 80, 90, 100]
```

A copy is available in [examples/card.yaml](examples/card.yaml). No account
credentials, tokens or device identifiers belong in this YAML.

| Option | Default | Purpose |
| --- | --- | --- |
| name | Aigostar Wasserkocher | Card heading |
| power_entity | auto-detect | switch entity for HeatingSwitch |
| target_entity | auto-detect | number entity for Target_temperature |
| status_entity | auto-detect | sensor entity for status |
| mode_entity | auto-detect | select entity for Mode |
| keep_warm_entity | auto-detect | number entity for heatpreservation |
| time_entity | auto-detect | sensor entity for Time |
| heating_sensor | auto-detect | Accepted binary-sensor mapping; currently not used to determine active heating |
| animate | true | Enable visual animation |
| confirm_start | true | Ask for confirmation before turning heating on |
| min_temperature | 40 | Fallback minimum if the number entity has no minimum attribute |
| presets | [40, 70, 80, 90, 100] | Numeric temperature presets, filtered to the displayed range |

Use numeric preset values. Home Assistant entity attributes provide the actual
minimum, maximum and step. The temperature renderer limits the displayed range to
0–100 °C. Selecting a preset edits the draft; pressing Apply sends the change.

Auto-detection searches entity IDs for aigo, kettle or wasserkocher plus the
property name and requires exactly one match. Explicit mappings are recommended,
especially with multiple kettles. Normalized status controls visual activity with
the power switch as a guard: switch OFF/unavailable never shows active steam.
The power switch alone determines which explicit ON/OFF service is sent.

## Troubleshooting

- **Custom element does not exist:** confirm the resource URL and module type,
  reload the browser, and remove duplicate/old resource entries.
- **Entities not recognized:** enter explicit entity IDs; auto-detection intentionally
  refuses ambiguous matches.
- **Controls disabled:** check the power entity's availability and the integration.
- **Target temperature does not change after clicking a preset:** press Apply.
- **Command failed:** inspect the device state before trying again. The card does
  not automatically retry; a backend timeout may leave the actual outcome unknown.
- **Old appearance after updating:** change the resource URL query version and clear
  the browser/app cache.
- **Options, TSL labels or numeric limits changed:** the beta observes those
  attributes even if the entity state stays the same. Check entity configuration
  if the expected option is not offered; the card never invents a service value.

Service errors log a fixed summary only, without the backend error object.
Never attach account exports, tokens or HA `.storage` files to a public issue.

## Development

The card JS is maintained directly; no bundling or build step is needed.
With Node.js 22:

```sh
node --check aigosmart-premium-card.js
node tests/card.test.mjs
```

The offline tests use VM/DOM stubs and mocked HA service calls; they do not contact
a kettle. They are not a substitute for browser layout, accessibility or live-device
testing. GitHub Actions runs syntax and offline checks plus HACS plugin validation.
hassfest applies to the Python integration, not this dashboard repository.

See [Validation](VALIDATION.md), [Security review](SECURITY_REVIEW.md),
[license/provenance notes](THIRD_PARTY_NOTICES.md) and [Publication handoff](PUBLISHING.md).

## Disclaimer

Unofficial community project, not affiliated with or endorsed by Aigostar, Alibaba,
Home Assistant or HACS. Follow the appliance manufacturer's instructions. Keep
heating-start confirmation enabled, ensure sufficient water and supervise use.
This cloud-connected control is not an emergency stop or a safety interlock.
Provided under the MIT License without warranty. Product names and trademarks
belong to their respective owners.


## v0.1.1-beta.1 compatibility and installation

This pre-release lives on `beta/enum-compat-v011`, based on the latest stable
card main. It does not change the stable main branch. It supports integration
v0.1.3, v0.1.4-beta.1 diagnostics and v0.1.4-beta.2 diagnostics + enum labels.
The integration is not required to upgrade first. Keep existing YAML entity IDs.

`normalizeMode()` accepts 0 / `"0"` / `One-click boil`, 1 / `"1"` /
`Boil and keep warm`, and 2 / `"2"` / `Heating and keep warm`.
`normalizeStatus()` accepts 1 / `"1"` / `Standby` (`Stand by` too),
2 / `"2"` / `Heating`, 3 / `"3"` / `Cooling`, and 4 / `"4"` /
`Keeping warm`. Common case/spacing/hyphen and existing German aliases normalize
to private semantic IDs. Those IDs are never blindly sent to HA.

Every Mode request is resolved against the **current** `attributes.options`.
Exact declared values win, including model-specific options. A semantic alias
is allowed only when it uniquely matches a supported option. Missing, stale,
unavailable or ambiguous options send no command. Numeric and labeled state/
option combinations remain correctly selected. Changed options, TSL labels and
number limits rerender without requiring a state change. Runtime `mode_labels`
and `status_labels` override the tested-model numeric assumptions, so another
model's `0 = Tea profile` is not silently interpreted as boiling.

Rendering never sends commands. Normalized status drives text, visual activity,
steam and glow consistently for numeric and text input. The original SVG/CSS,
target-temperature controls, keep-warm steps, confirmation, busy guard and
single-attempt requests remain. Diagnostic and description sensors (including
translated names) are excluded from automatic raw-state detection. Explicit
entity mappings remain recommended, especially for multiple kettles.

For HACS: open **AigoSmart Premium Card → ⋮ → Update information**, then
**⋮ → Redownload → Need a different version? → Release → v0.1.1-beta.1 → Download**.
Older UIs may require **Show beta versions**. Reload the browser/app (hard refresh
or clear the frontend cache if it still shows 0.1.0). Keep a single JavaScript
module resource at `/hacsfiles/aigosmart-premium-card/aigosmart-premium-card.js`.
No HA integration deletion or account reconnect is required for a card update.

The GitHub release is a pre-release with `latest=false`. Live browser rendering,
installed-HA interaction and physical-device behavior remain unverified. Issue
#3 stays open until real HA verification.
