import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../aigosmart-premium-card.js', import.meta.url), 'utf8');
function fixture(overrides = {}, config = {}) {
  const registry = new Map(), calls = [], logs = [];
  let confirm = true;
  class Element {
    attachShadow() {
      return this.shadowRoot = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [] };
    }
    dispatchEvent(event) { this.lastEvent = event; }
  }
  const context = vm.createContext({
    HTMLElement: Element,
    CustomEvent: class { constructor(type, options) { this.type = type; Object.assign(this, options); } },
    customElements: { get: key => registry.get(key), define: (key, value) => registry.set(key, value) },
    window: { confirm: () => confirm },
    console: { info: () => {}, error: (...args) => logs.push(args) }
  });
  vm.runInContext(source, context);
  const Card = registry.get('aigosmart-premium-card');
  const card = new Card();
  card.setConfig({ power_entity:'switch.kettle', target_entity:'number.kettle_target',
    status_entity:'sensor.kettle_status', mode_entity:'select.kettle_mode',
    keep_warm_entity:'number.kettle_warm', time_entity:'sensor.kettle_time', ...config });
  const states = {
    'switch.kettle': { state:'off', attributes:{} },
    'number.kettle_target': { state:'80', attributes:{min:0,max:100,step:1} },
    'sensor.kettle_status': { state:'1', attributes:{} },
    'select.kettle_mode': { state:'0', attributes:{options:['0','1','2']} },
    'number.kettle_warm': { state:'2', attributes:{min:0,max:13,step:1} },
    'sensor.kettle_time': { state:'5', attributes:{} }, ...overrides
  };
  card.hass = { states, callService: async (...args) => { calls.push(args); } };
  return {card, calls, context, Card, states, logs, setConfirm: value => {confirm = value;} };
}
const settle = () => new Promise(resolve => setImmediate(resolve));
const plain = value => JSON.parse(JSON.stringify(value));

test('registers once and setting HA state never sends commands', () => {
  const f=fixture();
  assert.equal(f.context.window.customCards.length,1);
  assert.equal(f.calls.length,0);
  assert.match(f.card.shadowRoot.innerHTML,/ZIElTEMPERATUR/);
  vm.runInContext(`{${source}}`,f.context);
  assert.equal(f.context.window.customCards.length,1);
});
test('heating on requires confirmation; cancellation sends nothing', async () => {
  const f=fixture();f.setConfirm(false);f.card.power();await settle();assert.equal(f.calls.length,0);
});
test('explicit heating ON sends one HA service request', async () => {
  const f=fixture();f.card.power();await settle();
  assert.deepEqual(plain(f.calls),[['switch','turn_on',{entity_id:'switch.kettle'}]]);
});
test('heating OFF does not require start confirmation', async () => {
  const f=fixture({'switch.kettle':{state:'on',attributes:{}}});f.setConfirm(false);
  f.card.power();await settle();assert.equal(f.calls.length,1);assert.equal(f.calls[0][1],'turn_off');
});
test('unavailable power prevents commands', async () => {
  const f=fixture({'switch.kettle':{state:'unavailable',attributes:{}}});f.card.power();await settle();assert.equal(f.calls.length,0);
});
test('temperature respects entity bounds and integer type', async () => {
  const f=fixture();for(const n of [-1,101,80.5,NaN])f.card.setTemperature(n);
  assert.equal(f.calls.length,0);f.card.setTemperature(100);await settle();
  assert.deepEqual(plain(f.calls),[['number','set_value',{entity_id:'number.kettle_target',value:100}]]);
});
test('unavailable temperature does not send a request', () => {
  const f=fixture({'number.kettle_target':{state:'unavailable',attributes:{}}});f.card.setTemperature(80);assert.equal(f.calls.length,0);
});
test('mode sends the selected TSL key including zero', async () => {
  const f=fixture();f.card.setMode('0');await settle();
  assert.deepEqual(plain(f.calls),[['select','select_option',{entity_id:'select.kettle_mode',option:'0'}]]);
});
test('warm adjustment clamps at the entity maximum', async () => {
  const f=fixture({'number.kettle_warm':{state:'13',attributes:{min:0,max:13,step:1}}});f.card.setWarm(1);await settle();
  assert.equal(f.calls[0][2].value,13);
});
test('warm adjustment respects the entity step and lower bound', async () => {
  const f=fixture({'number.kettle_warm':{state:'0',attributes:{min:0,max:13,step:1}}});f.card.setWarm(-1);await settle();assert.equal(f.calls[0][2].value,0);
});
test('failed service is not retried and busy state clears', async () => {
  const f=fixture();let attempts=0;
  f.card._hass.callService=async()=>{attempts++;throw new Error('offline test failure');};
  await f.card.service('switch','turn_on',{entity_id:'switch.kettle'});
  assert.equal(attempts,1);assert.equal(f.card._busy,false);assert.equal(f.logs.length,1);
});
test('busy guard prevents concurrent service calls', async () => {
  const f=fixture();let finish;f.card._hass.callService=(...args)=>{f.calls.push(args);return new Promise(resolve=>{finish=resolve;});};
  const pending=f.card.service('switch','turn_on',{entity_id:'switch.kettle'});
  await f.card.service('switch','turn_on',{entity_id:'switch.kettle'});
  assert.equal(f.calls.length,1);finish();await pending;
});
test('card name is escaped and temperature display is target state', () => {
  const f=fixture({}, {name:'<script>fixture</script>'});
  assert.ok(f.card.shadowRoot.innerHTML.includes('&lt;script&gt;fixture&lt;/script&gt;'));
  assert.ok(!f.card.shadowRoot.innerHTML.includes('<script>fixture</script>'));
  assert.match(f.card.shadowRoot.innerHTML,/80<em>°C/);
});
test('more-info event targets the selected entity', () => {
  const f=fixture();f.card.more('switch.kettle');assert.equal(f.card.lastEvent.type,'hass-more-info');assert.equal(f.card.lastEvent.detail.entityId,'switch.kettle');
});
