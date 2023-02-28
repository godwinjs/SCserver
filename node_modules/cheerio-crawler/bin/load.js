const Crawler = require('../');

var args = process.argv.slice(2);
var url = args[0];
if (!url) {
    console.error('must provide url');
    process.exit(1);
}

const crawl = Crawler((url, $) => {
    var title = $('title').text();
    var hrefs = $('a').map((i, el) => $(el).attr('href')).toArray().filter(href => typeof href !== 'undefined');
    console.log(title, '---', url);
    for (let href of hrefs) {
        console.log('>>  ', href);
    }
    return false;
});

crawl(url, (err) => {
    if (err) {
        console.error('unable to load:', err.message);
    }
    else {
        console.log('FINISHED');
    }
});
