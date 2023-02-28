const cheerio = require('cheerio');
const should = require('should');
const links = require('../lib/links');

describe('links', () => {

    var url, $;

    describe('given root url', () => {
        beforeEach(() => {
            url = 'http://localhost:3000';
        });

        describe('given empty body', () => {
            beforeEach(() => {
                $ = cheerio.load('');
            });

            it('should find no urls in empty string', () => {
                should(links(url, $)).eql([]);
            });
        });

        describe('given body with one link', () => {
            beforeEach(() => {
                var html = `
            <div>
            <a href="/">home</a>
            </div>
`;
                $ = cheerio.load(html);
            });
            it('should find the one link', () => {
                var urls = links(url, $);
                should(urls).eql(['http://localhost:3000/']);
            });
        });

        describe('given body with two links', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="/">home</a>
                <a href="/about">about</a>
                </div>
`;
                $ = cheerio.load(html);
            });

            it('should find the two urls', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/',
                    'http://localhost:3000/about'
                ]);
            });
        });

        describe('given body with link lacking href', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a>anchor</a>
                </div>
`;
                $ = cheerio.load(html);
            });

            it('should find no links', () => {
                var urls = links(url, $);
                should(urls).eql([]);
            });
        });

        describe('given body with link to root missing trailing slash', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="http://localhost:3000">home</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/'
                ]);
            });
        });

        describe('given body with same-domain-absolute link', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="http://localhost:3000/about">about</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/about'
                ]);
            });
        });

        describe('given body with other-domain link', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="http://google.com/">search</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct urls', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://google.com/'
                ]);
            });
        });

        describe('given body with link containing fragment', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="http://localhost:3000/about#faq"></a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should remove fragment', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/about'
                ]);
            });
        });

    });

    describe('given non-root url', () => {
        beforeEach(() => {
            url = 'http://localhost:3000/account/settings';
        });

        describe('given body with domain-relative link', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="/logout">log out</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/logout'
                ]);
            });
        });

        describe('given body with relative link', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="posts">your posts</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/account/posts'
                ]);
            });
        });

        describe('given body with .. link', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="../abc">up</a>
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/abc'
                ]);
            });
        });

        describe('given body with protocol-relative url', () => {
            beforeEach(() => {
                var html = `
                <div>
                <a href="//localhost:3000/about"
                </div>
`;
                $ = cheerio.load(html);
            });
            it('should find correct url', () => {
                var urls = links(url, $);
                should(urls).eql([
                    'http://localhost:3000/about'
                ]);
            });
        });
    });

});
