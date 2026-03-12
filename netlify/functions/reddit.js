export async function handler(event, context) {
  const subReddit = event.queryStringParameters.subReddit;
  const sort = event.queryStringParameters.sort;
  const limit = event.queryStringParameters.limit;
  const after = event.queryStringParameters.after;
  // const url = `https://www.reddit.com/r/${subReddit}/${sort}.json?limit=${limit}&after=${after}`;
const url = "https://www.reddit.com/r/javascript.json";
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "turing-gallery/1.0",
      },
    });

    const data = await response.json();
    console.log(data);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
