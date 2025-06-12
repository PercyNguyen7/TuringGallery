// exports.handler = async (event, context) => {
//   const {
//     subreddit,
//     sort = "new",
//     limit = 10,
//     after = "",
//   } = event.queryStringParameters || {};

//   if (!subreddit) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ error: "Subreddit parameter required" }),
//     };
//   }

//   const redditUrl = `https://api.reddit.com/r/${subreddit}/${sort}/.json?limit=${limit}&after=${after}`;

//   try {
//     const response = await fetch(redditUrl, {
//       headers: {
//         "User-Agent": "TuringsGallery/1.0",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Reddit API error: ${response.status}`);
//     }

//     const data = await response.json();

//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// };
