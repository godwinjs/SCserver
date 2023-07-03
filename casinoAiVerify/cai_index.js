const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
// const fetch = require('fetch')

async function getChatResponse(prompt) {
  const requestBody = {
    prompt: prompt,
    max_tokens: 50,
    temperature: 0.2,
    n: 1, 
    stop: '\n',
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const chatResponse = data; //.choices[0].text.trim()
  return chatResponse;
}

//
const prompt = 'respond with true or false if this site elroyalecasino.com is a casino site?';
getChatResponse(prompt)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
