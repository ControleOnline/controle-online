const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = fs.readFileSync(path.join(__dirname, 'runtime-error-guard.js'), 'utf8');
const transformed = source
  .replace('export { describeRejection };', '')
  .replace(/export default \(\) => \{[\s\S]*\}\s*;\s*$/, 'module.exports = { describeRejection };');

const sandbox = { module: { exports: {} }, exports: {}, console };
vm.createContext(sandbox);
vm.runInContext(transformed + '\nmodule.exports = { describeRejection };', sandbox);
const { describeRejection } = sandbox.module.exports;

assert.strictEqual(describeRejection(null), 'Unknown rejection');
assert.strictEqual(describeRejection(undefined), 'Unknown rejection');
assert.strictEqual(describeRejection('plain'), 'plain');
assert.strictEqual(describeRejection(new Error('boom')), 'boom');
assert.strictEqual(describeRejection({ status: 401, message: 'Authentication required' }), '401: Authentication required');
assert.strictEqual(describeRejection({ error: 'fail' }), 'fail');
assert.strictEqual(describeRejection({ statusText: 'Not Found', status: 404 }), '404: Not Found');
assert.strictEqual(describeRejection({ foo: 'bar' }), '{"foo":"bar"}');
const circular = {};
circular.self = circular;
assert.strictEqual(describeRejection(circular), 'Request failed');
assert.strictEqual(describeRejection(42), '42');
console.log('runtime-error-guard tests ok');
