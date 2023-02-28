const assert = require('assert');
const URL = require('url');

function origin(url) {
    var parts = URL.parse(url);
    var protocol = parts.protocol;
    assert(Boolean(protocol), 'protocol required');
    var host = parts.host;
    var orig = `${protocol}//${host}`;
    return orig;
}

module.exports = origin;
