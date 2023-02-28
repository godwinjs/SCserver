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