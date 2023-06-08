const apiKey = 'YOUR_API_KEY'; // Replace with your Google Search API key
const searchEngineId = 'YOUR_SEARCH_ENGINE_ID'; // Replace with your Search Engine ID
const query = 'your search query'; // Replace with your desired search query

const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Process the search results here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });