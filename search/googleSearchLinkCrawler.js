// ==UserScript==
// @name        GoogleSearchLinkCrawler
// @namespace   Violentmonkey Scripts
// @match       *://www.google.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/12/2023, 1:06:01 AM
// ==/UserScript==
let linkEle = '.MjjYud a';
let linkArr = [];

window.addEventListener('scroll', function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    // Code to execute when scrolled to the end
    console.log('Scrolled to the end of the page!');
    document.querySelectorAll(linkEle).forEach((a) => {
        // console.log({domain: a.host, url: a.href})
      if(a.host.includes('www.')){
        let domain = a.host.replace('www.', '')
        //
        if(linkArr.length < 1){
          linkArr.push({domain: domain, url: a.href});
        }else{
            linkArr.some((item, idx) => {
              let bool = item.domain === domain;
              
              if(bool){
                return bool;
              }else{
                if((linkArr.length - 1) === idx && !bool){
                  linkArr.push({domain: domain, url: a.href});
                }
              }
              return bool
            })
        }
      //
      }
      })
  }
});


window.addEventListener('click', function(event) {
  if (event.button === 0) {
    // Code to execute when the left mouse button is clicked
     if (window.confirm('Do you want to run the function?')) {
          console.log('Logging crawled links to the Console..');
          console.log(linkArr)
        } else {
          console.log('Continue scrolling to crawl links.');
        }
  }
});