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
var ny = [
  `
The New York Times - 
New York Daily News - 
New York Post - 
Newsday - 
The Wall Street Journal - 
CBS New York - 
NBC New York - 
ABC7 New York - 
NY1 - 
AM New York - 
The Village Voice - 
The Buffalo News - 
Rochester Democrat and Chronicle - 
Syracuse.com - 
Albany Times Union - 
The Journal News - 
The Buffalo Chronicle - 
The Brooklyn Paper - 
The Gothamist - 
Long Island Newsday - 
The New Yorker - 
The Albany Times Union - 
The Adirondack Daily Enterprise - 
The Buffalo Business First - 
The Ithaca Journal - 
The Daily Gazette - 
The Niagara Gazette - 
The Journal-News - 
The Observer-Dispatch - 
The Poughkeepsie Journal - 
The Saratogian - 
The Troy Record - 
The Watertown Daily Times - 
The Wellsville Daily Reporter - 
The Post-Star - 
The Record - 
The Legislative Gazette - 
The Riverdale Press - 
The Queens Chronicle - 
The Queens Gazette - 
The Queens Times - 
The Queens Tribune - 
The Queens Daily Eagle - 
The Brooklyn Eagle - 
The Greenpoint Star - 
The Home Reporter and Sunset News - 
The Brooklyn Daily Eagle - 
The Staten Island Advance - 
The Long Island Press - 
The Times-Herald Record - 
The Riverhead News-Review - 
The Shelter Island Reporter - 
The Suffolk Times - 
The East Hampton Star - 
The Southampton Press - 
The North Fork Patch - 
The Hamptons.com - 
The Rockville Centre Herald - 
The Farmingdale Observer - 
The Baldwin Herald - 
The Seaford Herald Citizen - 
The Malverne/West Hempstead Herald - 
The Valley Stream Herald - 
The Wantagh Herald Citizen - 
The Bellmore Herald Citizen - 
The Merrick Herald Citizen - 
The Oceanside/Island Park Herald - 
The Freeport Herald Leader - 
The Long Beach Herald - 
The Five Towns Jewish Times - 
The Jewish Press - 
The New York Amsterdam News - 
The Epoch Times - 
The Queens Ledger - 
The Western Queens Gazette - 
The TimesLedger - 
The Queens Gazette - 
The Queens Chronicle - 
The Queens Tribune - 
The Queens Daily Eagle - 
The Riverdale Press - 
The Manhattan Times - 
The Brooklyn Downtown Star - 
The Queens Courier - 
The Long Island Herald - 
The Queens Times - 
The Queens Examiner - 
The Queens Free Press - 
The Queens Tribune - 
The Queens Daily Eagle - 
The Gotham Gazette - 
The Manhattan Courier - 
The Brooklyn News 12 - 
The Bronx News 12 - 
The Staten Island News 12 - 
The Queens Ledger - 
The Western Queens Gazette - 
The TimesLedger - 
The Forest Hills Times - 
The Astoria Times - 
  `,
  `
  https://www.nytimes.com/
https://www.nydailynews.com/
https://nypost.com/
https://www.newsday.com/
https://www.wsj.com/
https://newyork.cbslocal.com
https://www.nbcnewyork.com
https://abc7ny.com/
https://www.ny1.com
https://www.amny.com/
https://www.villagevoice.com/
https://buffalonews.com/
https://www.democratandchronicle.com/
https://www.syracuse.com/
https://www.timesunion.com/
https://www.lohud.com/
https://buffalochronicle.com/
https://www.brooklynpaper.com/
https://gothamist.com/
https://www.newsday.com/
https://www.newyorker.com/
https://www.timesunion.com/
https://www.adirondackdailyenterprise.com/
https://www.bizjournals.com/buffalo/
https://www.ithacajournal.com/
https://dailygazette.com/
https://www.niagara-gazette.com/
https://www.lohud.com/
https://www.uticaod.com/
https://www.poughkeepsiejournal.com/
https://www.saratogian.com/
https://www.troyrecord.com/
https://www.watertowndailytimes.com/
https://www.wellsvilledaily.com/
https://poststar.com/
https://www.northjersey.com/
https://legislativegazette.com/
https://riverdalepress.com/
https://qchron.com/
https://www.qgazette.com/
https://queenstimes.com/
https://queenstribune.com/
https://queenseagle.com/
https://brooklyneagle.com/
https://www.greenpointstar.com/
https://www.homereporternews.com/
https://brooklyneagle.com/
https://www.silive.com/
https://www.longislandpress.com/
https://www.recordonline.com/
https://riverheadnewsreview.timesreview.com/
https://shelterislandreporter.timesreview.com/
https://suffolktimes.timesreview.com/
https://www.easthamptonstar.com/
https://www.27east.com/
https://patch.com/new-york/northfork
https://www.hamptons.com/
https://www.liherald.com/rockvillecentre/
https://www.liherald.com/farmingdale/
https://www.liherald.com/baldwin/
https://www.liherald.com/seaford/
https://www.liherald.com/malverne/
https://www.liherald.com/valleystream/
https://www.liherald.com/wantagh/
https://www.liherald.com/bellmore/
https://www.liherald.com/merrick/
https://www.liherald.com/oceanside/
https://www.liherald.com/freeport/
https://www.liherald.com/longbeach/
https://www.5tjt.com/
https://www.jewishpress.com/
https://amsterdamnews.com/
https://www.theepochtimes.com/
https://www.qchron.com/queensledger/
https://www.qchron.com/westernqueens/
https://www.timesledger.com/
https://www.qgazette.com/
https://qchron.com/
https://queenstribune.com/
https://queenseagle.com/
https://riverdalepress.com/
https://www.manhattantimesnews.com/
https://www.downtownbrooklyn.com/
https://qns.com/
https://www.liherald.com/
https://queenstimes.com/
https://qns.com/examiner/
https://qns.com/freepress/
https://queenseagle.com/
https://www.gothamgazette.com/
https://www.manhattancourier.com/
https://brooklyn.news12.com/
https://bronx.news12.com/
https://statenisland.news12.com/
https://www.qchron.com/queensledger/
https://www.qchron.com/westernqueens/
https://www.timesledger.com/
https://foresthillstimes.com/
https://astoriatimes.com/
https://queenstribune.com/
  `
]
var maryland = [
  `
  The Baltimore Sun - 
The Capital Gazette - 
The Washington Post - 
The MarylandReporter.com - 
The Baltimore Business Journal -
The Baltimore Afro-American - 
The Annapolis Patch - 
The Bethesda Magazine - 
The Carroll County Times - 
The Cecil Whig - 
The Cumberland Times-News - 
The Dorchester Banner - 
The Easton Star Democrat - 
The Elkton Cecil Whig - 
The Frederick News-Post - 
The Gaithersburg Patch - 
The Hagerstown Herald-Mail - 
The Harford Business Ledger - 
The Howard County Times - 
The Maryland Independent - 
The Montgomery County Sentinel - 
The Ocean City Today - 
The Salisbury Daily Times - 
The St. Mary's Enterprise - 
The Towson Patch - 
The Westminster Carroll County Times - 
The Wicomico News - 
The Bowie Blade-News - 
The Calvert Recorder - 
The Catonsville Patch - 
The Columbia Patch - 
The Dundalk Patch - 
The Ellicott City Patch - 
The Essex Patch - 
The Glen Burnie Patch - 
The North Baltimore Patch - 
The Owings Mills Patch - 
The Pikesville Patch - 
The Rockville Patch - 
The Severna Park Patch - 
The South Baltimore Patch - 
The Towson Patch - 
The Westminster Patch - 
The White Marsh Patch - 
The Aberdeen Patch - 
The Annapolis Patch - 
The Bel Air Patch - 
The Bowie Patch - 
The Columbia Patch - 
The Elkridge Patch - 
The Ellicott City Patch - 
The Glen Burnie Patch - 
The La Plata Patch - 
The Largo Patch - 
The Odenton Patch - 
The Pikesville Patch - 
The Reisterstown Patch - 
The Severna Park Patch - 
The Towson Patch - 
The Upper Marlboro Patch - 
The Westminster Patch - 
The Wheaton Patch - 
The Perry Hall Patch - 
The Dundalk Patch - 
The Pasadena Patch - 
The Catonsville Patch - 
The Potomac Patch - 
The Bethesda-Chevy Chase Patch - 
The North Potomac Patch - 
The Germantown Patch - 
The Olney Patch - 
The Gaithersburg Patch - 
The Silver Spring Patch - 
The Columbia Patch - 
The Ellicott City Patch - 
The Odenton Patch - 
The Pasadena Patch - 
The Severna Park Patch - 
The Towson Patch - 
The Westminster Patch - 
The Annapolis Patch - 
The Bel Air Patch - 
The Bowie Patch - 
The Columbia Patch - 
The Dundalk Patch - 
The Ellicott City Patch - 
The Glen Burnie Patch - 
The La Plata Patch - 
The Owings Mills Patch - 
The Pasadena Patch - 
The Severna Park Patch - 
The Towson Patch - 
The Westminster Patch - 
The Wheaton Patch - 
The Perry Hall Patch - 
The Ocean City Today - 
The Salisbury Daily Times - 
The Maryland Matters - 
The Maryland Daily Record - 
The Wicomico News - 
  `,
  `
  https://www.baltimoresun.com/
https://www.capitalgazette.com/
https://www.washingtonpost.com/
https://www.marylandreporter.com/
 https://www.bizjournals.com/baltimore/
https://www.afro.com/
https://patch.com/maryland/annapolis
https://bethesdamagazine.com/
https://www.carrollcountytimes.com/
https://www.cecildaily.com/
https://www.times-news.com/
https://www.dorchesterbanner.com/
https://www.stardem.com/
https://www.cecildaily.com/cecil_whig/
https://www.fredericknewspost.com/
https://patch.com/maryland/gaithersburg
https://www.heraldmailmedia.com/
https://www.harfordbusiness.com/
https://www.baltimoresun.com/maryland/howard/
https://www.somdnews.com/independent/
https://www.mocovoice.com/
https://www.oceancitytoday.com/
https://www.delmarvanow.com/
https://www.somdnews.com/enterprise/
https://patch.com/maryland/towson
https://www.carrollcountytimes.com/westminster/
https://www.wicomiconews.net/
https://www.capitalgazette.com/bowie_bladenews/
https://www.somdnews.com/recorder/
https://patch.com/maryland/catonsville
https://patch.com/maryland/columbia
https://patch.com/maryland/dundalk
https://patch.com/maryland/ellicottcity
https://patch.com/maryland/essex
https://patch.com/maryland/glenburnie
https://patch.com/maryland/northbaltimore
https://patch.com/maryland/owingsmills
https://patch.com/maryland/pikesville
https://patch.com/maryland/rockville
https://patch.com/maryland/severnapark
https://patch.com/maryland/southbaltimore
https://patch.com/maryland/towson
https://patch.com/maryland/westminster
https://patch.com/maryland/whitemarsh
https://patch.com/maryland/aberdeen
https://patch.com/maryland/annapolis
https://patch.com/maryland/bowie
https://patch.com/maryland/columbia
https://patch.com/maryland/elkridge
https://patch.com/maryland/ellicottcity
https://patch.com/maryland/glenburnie
https://patch.com/maryland/laplata
https://patch.com/maryland/largo
https://patch.com/maryland/odenton
https://patch.com/maryland/pikesville
https://patch.com/maryland/reisterstown
https://patch.com/maryland/severnapark
https://patch.com/maryland/towson
https://patch.com/maryland/uppermarlboro
https://patch.com/maryland/westminster
https://patch.com/maryland/wheaton
https://patch.com/maryland/perryhall
https://patch.com/maryland/dundalk
https://patch.com/maryland/pasadena
https://patch.com/maryland/catonsville
https://patch.com/maryland/potomac
https://patch.com/maryland/bethesda
https://patch.com/maryland/northpotomac
https://patch.com/maryland/germantown
https://patch.com/maryland/olney
https://patch.com/maryland/gaithersburg
https://patch.com/maryland/silverspring
https://patch.com/maryland/columbia
https://patch.com/maryland/ellicottcity
https://patch.com/maryland/odenton
https://patch.com/maryland/pasadena
https://patch.com/maryland/severnapark
https://patch.com/maryland/towson
https://patch.com/maryland/westminster
https://patch.com/maryland/annapolis
https://patch.com/maryland/belair
https://patch.com/maryland/bowie
https://patch.com/maryland/columbia
https://patch.com/maryland/dundalk
https://patch.com/maryland/ellicottcity
https://patch.com/maryland/glenburnie
https://patch.com/maryland/laplata
https://patch.com/maryland/owingsmills
https://patch.com/maryland/pasadena
https://patch.com/maryland/severnapark
https://patch.com/maryland/towson
https://patch.com/maryland/westminster
https://patch.com/maryland/wheaton
https://patch.com/maryland/perryhall
https://www.oceancitytoday.com/
https://www.delmarvanow.com/
https://www.marylandmatters.org/
https://thedailyrecord.com/
https://www.wicomiconews.net/
https://patch.com/maryland/belair
  `
]
var Kentucky = [
  `The Courier-Journal (Louisville) - 
  Lexington Herald-Leader - 
  WKYT (Lexington) - 
  WAVE 3 News (Louisville) - 
  WHAS 11 (Louisville) - 
  WLKY (Louisville) - 
  Kentucky Today - 
  The Paducah Sun - 
  The Bowling Green Daily News - 
  The Owensboro Times - 
  The Northern Kentucky Tribune - 
  The Frankfort State Journal - 
  The Elizabethtown News-Enterprise - 
  The Richmond Register - 
  The Ashland Daily Independent - 
  The Danville Advocate-Messenger - 
  The Murray Ledger & Times - 
  The Somerset Commonwealth Journal - 
  The Kentucky New Era - 
  The Glasgow Daily Times - 
  The Madisonville Messenger - 
  The Winchester Sun - 
  The Georgetown News-Graphic - 
  The Corbin Times-Tribune - 
  The Harlan Daily Enterprise - 
  The Maysville Ledger Independent - 
  The Henderson Gleaner - 
  The Berea Citizen - 
  The Bourbon County Citizen - 
  The Floyd County Times - 
  The Casey County News - 
  The Jessamine Journal - 
  The Gallatin County News - 
  The Oldham Era - 
  The Grayson County News-Gazette - 
  The Spencer Magnet - 
  The Hopkinsville Kentucky New Era - 
  The Henderson Kentucky Advocate - 
  The Shelbyville Sentinel News - 
  The Marion County Enterprise - 
  The Lebanon Enterprise - 
  The Scottsville Citizen-Times - 
  The Grant County News - 
  The Mount Sterling Advocate - 
  The Cynthiana Democrat - 
  The Morehead News - 
  The Kentucky Kernel (University of Kentucky) - 
  The Eastern Progress (Eastern Kentucky University) - 
  The Murray State News (Murray State University) - 
  The Kentucky Standard (Bardstown) - 
  `,
  `
https://www.courier-journal.com/
https://www.kentucky.com/
https://www.wkyt.com/
https://www.wave3.com/
https://www.whas11.com/
https://www.wlky.com/
https://www.kentuckytoday.com/
https://www.paducahsun.com/
https://www.bgdailynews.com/
https://www.owensborotimes.com/
https://www.nkytribune.com/
https://www.state-journal.com/
https://www.thenewsenterprise.com/
https://www.richmondregister.com/
https://www.dailyindependent.com/
https://www.amnews.com/
https://www.murrayledger.com/
https://www.somerset-kentucky.com/
https://www.kentuckynewera.com/
https://www.glasgowdailytimes.com/
https://www.the-messenger.com/
https://www.winchestersun.com/
https://www.news-graphic.com/
https://www.thetimestribune.com/
https://www.harlandaily.com/
https://maysville-online.com/
https://www.thegleaner.com/
https://bereaonline.com/
https://www.bourboncountycitizen.com/
https://floydcountytimes.com/
https://www.caseynews.net/
https://www.jessaminejournal.com/
https://www.gallatincountynews.com/
https://www.oldhamera.com/
https://www.gcnewsgazette.com/
https://www.spencermagnet.com/
https://www.kentuckynewera.com/
https://www.thegleaner.com/
https://www.sentinelnews.com/
https://www.lebanonenterprise.com/
https://www.lebanonenterprise.com/
https://www.citizen-times.com/
https://www.grantky.com/
https://www.themtsterlingadvocate.com/
https://www.cynthianademocrat.com/
https://www.themoreheadnews.com/
https://www.kykernel.com/
https://www.easternprogress.com/
https://www.thenews.org/
https://www.kystandard.com/
  `
]

var california = [
  `Los Angeles Times - 
  San Francisco Chronicle - 
  The Mercury News - 
  The Sacramento Bee - 
  San Diego Union-Tribune - 
  KTLA 5 (Los Angeles) - 
  ABC7 (Los Angeles) - 
  NBC Bay Area (San Francisco) - 
  KPIX 5 (San Francisco) - 
  KPBS (San Diego) - 
  Ventura County Star - 
  The Press-Enterprise (Riverside) - 
  San Jose Spotlight - 
  Santa Cruz Sentinel - 
  Long Beach Post - 
  The Orange County Register - 
  The Fresno Bee - 
  The Desert Sun (Palm Springs) - 
  East Bay Times (East Bay) - 
  LAist - 
  SFist - 
  Sacramento News & Review - 
  San Diego Reader - 
  LA Daily News - 
  LA Downtown News - 
  The Monterey County Herald - 
  The Bakersfield Californian - 
  The Redding Record Searchlight - 
  Palo Alto Online - 
  Berkeley News - 
  San Francisco Examiner - 
  Chico Enterprise-Record - 
  The Modesto Bee - 
  The San Luis Obispo Tribune - 
  LA West Media - 
  The Malibu Times - 
  The Salinas Californian - 
  Pasadena Now - 
  The Santa Barbara Independent - 
  The Long Beach Press-Telegram - 
  Marin Independent Journal - 
  Inland Valley Daily Bulletin - 
  KQED (San Francisco) - 
  ABC10 (Sacramento) - 
  KRON4 (San Francisco) - 
  `,
  `
  https://www.latimes.com/
https://www.sfchronicle.com/
https://www.mercurynews.com/
https://www.sacbee.com/
https://www.sandiegouniontribune.com/
https://ktla.com/
https://abc7.com/
https://www.nbcbayarea.com/
https://sanfrancisco.cbslocal.com/
https://www.kpbs.org/
https://www.vcstar.com/
https://www.pe.com/
https://sanjosespotlight.com/
https://www.santacruzsentinel.com/
https://lbpost.com/
https://www.ocregister.com/
https://www.fresnobee.com/
https://www.desertsun.com/
https://www.eastbaytimes.com/
https://laist.com/
https://sfist.com/
https://www.newsreview.com/sacramento/
https://www.sandiegoreader.com/
https://www.dailynews.com/
https://www.ladowntownnews.com/
https://www.montereyherald.com/
https://www.bakersfield.com/
https://www.redding.com/
https://www.paloaltoonline.com/
https://news.berkeley.edu/
https://www.sfexaminer.com/
https://www.chicoer.com/
https://www.modbee.com/
https://www.sanluisobispo.com/
https://lawestmedia.com/
https://www.malibutimes.com/
https://www.thecalifornian.com/
https://www.pasadenanow.com/
https://www.independent.com/
https://www.presstelegram.com/
https://www.marinij.com/
https://www.dailybulletin.com/
https://www.kqed.org/
https://www.abc10.com/
https://www.kron4.com/
  `
]