// ==UserScript==
// @name        CasinoUrlTraffic
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description 7/4/2023, 1:06:12 PM
// ==/UserScript==
let urlTraffic = [];
let rank = '';
let url = '';

window.addEventListener('keydown', function(event) {
  
    if (event.key === 'a') {
      
      rank = document.querySelector('.engagement-list__item-value').innerHTML;
      url = document.querySelector('.wa-overview__title').innerHTML;
     if (window.confirm(`Add "${url}" to list?`)) {
       if(localStorage.getItem('urlTraffic')){
         urlTraffic = JSON.parse(localStorage.getItem('urlTraffic'));
       }
          urlTraffic.push({url: url, visits: rank});
          localStorage.setItem('urlTraffic', JSON.stringify(urlTraffic))
          console.log(`added site to the list of casino site with high traffic..`);
        } else {
          window.alert('No much traffic, Continue...');
        }
    }
  
  if(event.key === 'd'){
    console.log(urlTraffic)
  }
});