const assert = require('assert');

const URL = require('url');

function links(url, $) {
    assert(String(url) === url, 'url must be a string');
    assert(Boolean(url), 'url must be defined');
    return $('a')
        .map((i, el) => $(el).attr('href'))
        .toArray()
        .filter(href => typeof href !== 'undefined')
        .map(href => URL.resolve(url, href))
        .map(removeFragment)
        ;
}

function removeFragment(url) {
    var parts = URL.parse(url);
    delete parts.hash;
    return URL.format(parts);
}

module.exports = links;
