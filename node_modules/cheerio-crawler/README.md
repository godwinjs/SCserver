# cheerio-crawler

Web site crawler that visits URL's recursively, starting from one initial URL
and following links in HTML responses, and invokes your callback function for each one.

## Example

```
var crawl = Crawler(function (url, $) {
    var title = $('title').text();
    console.log(title, '---', url);
});

// ...

crawl('http://www.resource.com/', function (err) {
    if (err) {
        console.error('unable to complete crawl:', err.message);
    }
    else {
        console.log('finished');
    }
});
```

## Example: Cancel

To cancel a crawl at any time, such as when exceeding a threshold, call the "cancel" method:

```
var crawl = Crawler(function(url, $) {
    if (visits++ > MAX_VISITS) {
        crawl.cancel();
    }
});
```

## Example: Skip Recursion

To skip recursion on a URL, return false from the handler function:

```
var crawl = Crawler(function(url, $) {
    if (DO_NOT_CRAWL_LIST.contains(url)) {
        return false;
    }
});
```

## Functionality

* stays on the origin of the initial URL
* gets URL's from `a@href`
* makes one request at a time
* requests each URL only once (de-duplicates requests)
* removes URL fragments (hash)
