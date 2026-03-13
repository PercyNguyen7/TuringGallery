export async function handler(event) {
  const { subReddit, sort, limit, after } = event.queryStringParameters;

  const url = `https://api.reddit.com/r/${subReddit}/${sort}.json?limit=${limit}&after=${after}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "turing-gallery/1.0"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("Reddit returned:", text);

      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Reddit API error",
          status: response.status
        })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}