export function extractYoutubeId(url, type) {
  let startIndex = url.indexOf("watch?v=");
  if (startIndex === -1) {
    if (type === "youtu.be") {
      startIndex = 17;
    } else if (type === "youtube.com" && url.indexOf("/shorts/")) {
      startIndex = url.indexOf("youtube.com/shorts/");
      startIndex += 19;
    }
  } else {
    startIndex += 8;
  }
  if (type === "youtu.be") {
    return url.substring(startIndex, url.length);
  } else if (type === "youtube.com") {
    const andIndex = url.indexOf("&");
    return andIndex == -1
      ? url.substring(startIndex, url.length)
      : url.substring(startIndex, andIndex);
  }
  return null;
}
