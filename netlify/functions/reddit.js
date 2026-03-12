export async function handler(event, context) {
  const subReddit = event.queryStringParameters.subReddit;
  const sort = event.queryStringParameters.sort;
  const limit = event.queryStringParameters.limit;
  const after = event.queryStringParameters.after;
  const url = `https://www.reddit.com/r/${subReddit}/${sort}/.json?limit=${limit}&after=${after}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "my-app",
      },
    });

    const data = await response.json();

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
