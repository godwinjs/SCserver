//mitilda 

// CHEERIO __START__

// google jQuery
const dom = `
    <ul id="fruits">
    <li class="apple">Apple</li>
    <li class="orange">Orange</li>
    <li class="pear">Pear</li>
    </ul>
`
const $ = cheerio.load(dom)
// plugins
$.prototype.logHtml = function () {
  console.log(this.html());
};
$.prototype.logText = function () {
  console.log(this.text());
};

// $('body').setAttr('id', 'main')
$('.apple','#fruits').logText()
$('ul .pear').logText()
$('li[class=orange]').logText()
// console.log($('[xml//:id="main"]'))

// CHEERIO __END__

// AXIOS __START__
// .then(success callback), .catch(error handling), .finally(always executed callback)

// normal axios request
axios.get('/api/v1/user', { params: {
  ID: 1244,
}}).then((res) => {
  // run success callback
}).catch((err) => {
  // catch all errors
}).finally(() => {
  // always execute this function
})

// async axios request
async function getUser() {
  try{
    const res = await axios.get('/api/v1/user?ID=1244')
  } catch (error){
    console.error(error)
  }
}

// Post request
axios.post('/api/v1/', {
  firstname: 'John',
  lastname: 'Smith'
}).then(() => {
  // success caallbacks
}).catch((err) => {
  // request error
}).finally(() => {
  // always execute code callback
})

// Perform multiple requests
const getUsername = () => {
  return axios.get('/api/users')
}
const getUserPermisions = () => {
  return axios.get('/api/users/permissions')
}

Promise.all([getUsername, getUserPermisions]).then((results) => {
  const username = results[0];
  const permissions = results[1];
})
// Axios API
// Post request
axios({
  method: 'post',
  url: 'https://dj.com/api/users/',
  data: {
    username: 'username',
    password: 'password'
  }
}).then(() => {

}).catch(() =>  {

}).finally(() => {
  
})
// get remote image request
axios({
  method: 'get',
  url: 'https://images.googleusercontent',
  responseType: 'stream'
}).then(() => {
  // success callback
}).catch(err => {
  // catch request error
}).finally(() => {
  // always run code callback
});


// AXIOS __END__



// APLLICATION PLANS

// for url array batch processing
const links = urls.map((url) => {
  return sendCrawlRequest(url)
})
const sendCrawlRequest = (url) => {
  return axios.get(url)
}
Promise.all(links).then((link) => {
  // link[0].property, link[1].property
})


var data = [
  `
The Columbus Dispatch - 
Cleveland.com - 
The Cincinnati Enquirer - 
Dayton Daily News - 
Akron Beacon Journal - 
The Blade - 
The Plain Dealer - 
WDTN-TV - 
The Columbus Free Press - 
WKSU - 
The Cincinnati Business Courier - 
The Toledo Business Journal - 
The Cincinnati CityBeat - 
Columbus CEO - 
The Dayton Business Journal - 
Dayton.com - 
The Cincinnati City Council - 
The Cleveland Scene - 
The Toledo City Paper - 
The Cleveland Jewish News - 
The Cincinnati City Council - 
The Akron City Council - 
The Toledo City Council - 
The Cleveland Business News - 
The Cincinnati Herald - 
The Dayton City Paper - 
The Canton Repository - 
The Youngstown Vindicator - 
The Springfield News-Sun - 
The Lima News - 
The Marietta Times - 
The Mansfield News Journal - 
The News-Herald - 
The Journal-News - 
The Warren Tribune Chronicle - 
The Findlay Courier - 
The Morning Journal - 
The Zanesville Times Recorder - 
The Athens Messenger - 
The Delaware Gazette - 
The Chillicothe Gazette - 
The Alliance Review - 
The Sandusky Register - 
The Lancaster Eagle-Gazette - 
The Wooster Daily Record - 
The Defiance Crescent-News - 
The Ashland Times-Gazette - 
The Norwalk Reflector - 
The Galion Inquirer - 
The Salem News - 
The Steubenville Herald-Star - 
The Ironton Tribune - 
The Portsmouth Daily Times - 
The Tiffin Advertiser-Tribune - 
The Van Wert Times Bulletin - 
The Circleville Herald - 
The Piqua Daily Call - 
The Sidney Daily News - 
The Xenia Daily Gazette - 
The Bellefontaine Examiner - 
The Willard Times-Junction - 
The Bryan Times - 
The Mount Vernon News - 
The Newark Advocate - 
The Fostoria Review Times - 
The Kent Record-Courier - 
The Marysville Journal-Tribune - 
The Wilmington News Journal - 
The Wapakoneta Daily News - 
The Paulding Progress - 
The Willoughby News-Herald - 
The Norwalk Reflector - 
The Lima News - 
The Marion Star - 
The News-Messenger - 
The Xenia Gazette - 
The Cuyahoga Falls News-Press - 
The Greenfield Times-Gazette - 
The West Side Leader - 
The Bellefontaine Examiner - 
The Willard Times-Junction - 
The Van Wert Times Bulletin - 
The Circleville Herald - 
The Piqua Daily Call - 
The Sidney Daily News - 
The Xenia Daily Gazette - 
The Bryan Times - 
The Mount Vernon News - 
The Newark Advocate - 
The Fostoria Review Times - 
The Kent Record-Courier - 
The Marysville Journal-Tribune - 
The Wilmington News Journal - 
The Wapakoneta Daily News - 
The Paulding Progress - 
The Willoughby News-Herald - 
The Jackson County Times-Journal - 
The New Philadelphia Times-Reporter - 
The Columbus Dispatch - 
Cleveland.com - 
The Cincinnati Enquirer - 
Dayton Daily News - 
Akron Beacon Journal - 
The Blade - 
The Plain Dealer - 
WDTN-TV - 
The Columbus Free Press - 
WKSU - 
The Cincinnati Business Courier - 
The Toledo Business Journal - 
The Cincinnati CityBeat - 
Columbus CEO - 
The Dayton Business Journal - 
Dayton.com - 
The Cincinnati City Council - 
The Cleveland Scene - 
The Toledo City Paper - 
The Cleveland Jewish News - 
The Cincinnati City Council - 
The Akron City Council - 
The Toledo City Council - 
The Cleveland Business News - 
The Cincinnati Herald - 
  `,
  `
  https://www.dispatch.com/
https://www.cleveland.com/
https://www.cincinnati.com/
https://www.daytondailynews.com/
https://www.beaconjournal.com/
https://www.toledoblade.com/
https://www.cleveland.com/plaindealer/
https://www.wdtn.com/
https://columbusfreepress.com/
https://www.wksu.org/
https://www.bizjournals.com/cincinnati/
https://www.toledobiz.com/
https://www.citybeat.com/
https://www.columbusceo.com/
https://www.bizjournals.com/dayton/
https://www.dayton.com/
https://www.cincinnati-oh.gov/council/
https://www.clevescene.com/
https://toledocitypaper.com/
https://www.clevelandjewishnews.com/
https://www.cincinnati-oh.gov/council/
https://www.akroncitycouncil.org/
https://toledo.legistar.com/
https://www.crainscleveland.com/
https://thecincinnatiherald.com/
https://www.daytoncitypaper.com/
https://www.cantonrep.com/
https://www.vindy.com/
https://www.springfieldnewssun.com/
https://www.limaohio.com/
https://www.mariettatimes.com/
https://www.mansfieldnewsjournal.com/
https://www.news-herald.com/
https://www.journal-news.com/
https://www.tribtoday.com/
https://thecourier.com/
https://www.morningjournal.com/
https://www.zanesvilletimesrecorder.com/
https://www.athensmessenger.com/
https://www.delgazette.com/
https://www.chillicothegazette.com/
https://www.the-review.com/
https://www.sanduskyregister.com/
https://www.lancastereaglegazette.com/
https://www.the-daily-record.com/
https://www.crescent-news.com/
https://www.times-gazette.com/
https://www.norwalkreflector.com/
https://www.galioninquirer.com/
https://www.salemnews.net/
https://www.heraldstaronline.com/
https://www.irontontribune.com/
https://www.portsmouth-dailytimes.com/
https://www.advertiser-tribune.com/
https://timesbulletin.com/
https://www.circlevilleherald.com/
https://www.dailycall.com/
https://www.sidneydailynews.com/
https://www.xeniagazette.com/
https://www.examiner.org/
https://www.timesjunction.com/
https://www.bryantimes.com/
https://mountvernonnews.com/
https://www.newarkadvocate.com/
https://reviewtimes.com/
https://www.record-courier.com/
https://www.marysvillejt.com/
https://www.wnewsj.com/
https://www.wapakdailynews.com/
https://progressnewspaper.org/
https://www.news-herald.com/
https://www.norwalkreflector.com/
https://www.limaohio.com/
https://www.marionstar.com/
https://www.thenews-messenger.com/
https://www.xeniagazette.com/
https://www.fallsnewspress.com/
https://www.timesgazette.com/
https://www.akron.com/
https://www.examiner.org/
https://www.timesjunction.com/
https://timesbulletin.com/
https://www.circlevilleherald.com/
https://www.dailycall.com/
https://www.sidneydailynews.com/
https://www.xeniagazette.com/
https://www.bryantimes.com/
https://mountvernonnews.com/
https://www.newarkadvocate.com/
https://reviewtimes.com/
https://www.record-courier.com/
https://www.marysvillejt.com/
https://www.wnewsj.com/
https://www.wapakdailynews.com/
https://progressnewspaper.org/
https://www.news-herald.com/
https://thetelegramnews.com/
https://www.timesreporter.com/
https://www.dispatch.com/
https://www.cleveland.com/
https://www.cincinnati.com/
https://www.daytondailynews.com/
https://www.beaconjournal.com/
https://www.toledoblade.com/
https://www.cleveland.com/plaindealer/
https://www.wdtn.com/
https://columbusfreepress.com/
https://www.wksu.org/
https://www.bizjournals.com/cincinnati/
https://www.toledobiz.com/
https://www.citybeat.com/
https://www.columbusceo.com/
https://www.bizjournals.com/dayton/
https://www.dayton.com/
https://www.cincinnati-oh.gov/council/
https://www.clevescene.com/
https://toledocitypaper.com/
https://www.clevelandjewishnews.com/
https://www.cincinnati-oh.gov/council/
https://www.akroncitycouncil.org/
https://toledo.legistar.com/
https://www.crainscleveland.com/
https://thecincinnatiherald.com/
  `
]