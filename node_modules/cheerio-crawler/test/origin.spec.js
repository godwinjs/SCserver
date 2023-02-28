const should = require('should');

const origin = require('../lib/origin');

describe('origin', () => {

    it('should work on simple nonsecure domain', () => {
        should(origin('http://domain.com')).eql('http://domain.com')
    });

    it('should work on simple nonsecure domain with path', () => {
        should(origin('http://domain.com/pq')).eql('http://domain.com');
    });

    it('should work on secure domain without path', () => {
        should(origin('https://secure.com')).eql('https://secure.com');
    });

    it('should work with port', () => {
        should(origin('http://domain.com:8000')).eql('http://domain.com:8000');
    });

    it('should work with port and path', () => {
        should(origin('http://domain.com:8000/pqr')).eql('http://domain.com:8000');
    });

    it('should work on localhost', () => {
        should(origin('http://localhost')).eql('http://localhost');
    });

    it('should work on localhost with port', () => {
        should(origin('http://localhost:3000/')).eql('http://localhost:3000');
    });

    it('should fail on url without protocol', () => {
        should(() => {
            origin('//domain.com/')
        }).throw();
    });

    it('should fail on url without domain', () => {
        should(() => {
            origin('/path/to/thing')
        }).throw();
    });
});
