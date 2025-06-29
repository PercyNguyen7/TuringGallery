import { useState, useEffect, useRef } from "react";

import React, { Component } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";
import Image from "./components/Image";
import Video from "./components/Video";
import YouTube from "./components/YouTube";
import DropdownItem from "./components/DropdownItem";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import GuessButton from "./components/GuessButton";
const maxFetch = 8;

function App() {
  const aiCategory = "ai";
  const humanCategory = "human";
  const [currentSorts, setCurrentSorts] = useState({
    ai: "new",
    human: "new",
  });
  const [aboutOpen, setAboutOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [contentType, setContentType] = useState("image");
  const curAiSubreddit = contentType == "image" ? "aiArt" : "aivideos";
  const curHumanSubreddit = contentType == "image" ? "art" : "animations";
  const [arts, setArts] = useState(null);
  const [afters, setAfters] = useState({
    ai: { aiArt: "", aivideos: "" },
    human: { art: "", animations: "" },
  });
  const AI_URL = `https://www.reddit.com/r/${curAiSubreddit}/${currentSorts.ai}/.json?limit=${maxFetch}&after=${afters.ai[curAiSubreddit]}`;
  const HUMAN_URL = `https://www.reddit.com/r/${curHumanSubreddit}/${currentSorts.human}/.json?limit=${maxFetch}&after=${afters.human[curHumanSubreddit]}`;
  const artArray = !arts ? [] : [...arts.ai, ...arts.human];
  // console.log(artArray);
  const currArt = artArray.length > 0 ? artArray[0] : null;
  // console.log(currArt);
  const [gallery, setGallery] = useState([]);
  // console.log(afters)
  // console.log(AI_URL);
  // console.log(HUMAN_URL);
  // ************** QQQQ
  useEffect(() => {
    async function fetchAndRenderOne() {
      const type = Math.round(Math.random()) == 0 ? humanCategory : aiCategory;
      const url = type === humanCategory ? HUMAN_URL : AI_URL;
      setLoading(true);
      const data = await fetchRes(url);
      if (data) {
        updateData(type, data);
      }
      setLoading(false);
    }
    fetchAndRenderOne();
  }, [currentSorts, round, contentType]);

  function resetAfters(category) {
    if (category === "ai") {
      setAfters((prev) => ({
        ...prev,
        human: {
          ...prev.human,
          [curHumanSubreddit]: "",
        },
      }));
    } else if (category === "human") {
      setAfters((prev) => ({
        ...prev,
        ai: {
          ...prev.ai,
          [curAiSubreddit]: "",
        },
      }));
    }
  }

  // fetch and return the Reddit data according to the url
  async function fetchRes(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Check out the fetched data");
      console.log(data.data);
      return data;
    } catch (e) {
      console.error("Fetch failed:", e);
      throw e; // propagate the error
    }
  }
  function updateData(type, data) {
    if (type === humanCategory) {
      // console.log(type + " is being updated");
      setAfters((prev) => ({
        ...prev,
        human: {
          ...prev.human,
          [curHumanSubreddit]: data.data.after == null ? "" : data.data.after,
        },
      }));
      setArts({
        ai: [],
        human: getArts(humanCategory, data.data.children, 1),
      });
      // console.log(getArts(humanCategory, data.data.children, 1));
    } else if (type === aiCategory) {
      // console.log(type + " is being updated");
      setAfters((prev) => ({
        ...prev,
        ai: {
          ...prev.ai,
          [curAiSubreddit]: data.data.after == null ? "" : data.data.after,
        },
      }));
      setArts({
        ai: getArts(aiCategory, data.data.children, 1),
        human: [],
      });
      // console.log(getArts(humanCategory, data.data.children, 1));
    }
  }

  function getArts(postCategory, allPosts, artNum) {
    function extractYoutubeId(url, type) {
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
    const sfw = true;
    let count = 0;
    const tempArr = [];
    for (let n = 0; n < maxFetch; n++) {
      let src;
      // if data does not exist then we reset afters
      if (!allPosts[n].data) {
        resetAfters(postCategory);
        return;
      }
      const currPost = allPosts[n].data;
      if (count === artNum) {
        break;
      }
      // For Text content
      // if (currPost.is_self === true) {
      // }
      if (currPost.post_hint === "image") {
        if (
          (sfw &&
            (currPost.url_overridden_by_dest == "nsfw" ||
              currPost.thumbnail == "nsfw")) ||
          contentType === "video"
        ) {
          continue;
        }
        // console.log("art index: " + n);
        if (currPost.url_overridden_by_dest != undefined) {
          src = currPost.url_overridden_by_dest;
        } else if (currPost.thumbnail != undefined) {
          src = currPost.thumbnail;
        }
        tempArr.push({
          category: postCategory,
          subreddit: currPost.subreddit,
          type: currPost.post_hint,
          contentType: "image",
          src: src,
          id: currPost.id,
          title: currPost.title,
          text: currPost.selftext ? currPost.selftext : "",
          author: currPost.author,
          thumbnail: currPost.thumbnail,
          url: currPost.url,
          date: new Date(currPost.created_utc * 1000),
          order: round,
          permalink: currPost.permalink,
        });
        count++;
      } else if (
        currPost.post_hint === "rich:video" ||
        currPost.domain == "youtube.com" ||
        currPost.domain == "youtu.be"
      ) {
        if (
          (sfw &&
            (currPost.url_overridden_by_dest == "nsfw" ||
              currPost.thumbnail == "nsfw")) ||
          contentType === "image"
        ) {
          continue;
        }
        // console.log("art index: " + n);
        tempArr.push({
          category: postCategory,
          domain: currPost.domain,
          subreddit: currPost.subreddit,
          type: "rich:video",
          contentType: "video",
          videoId: extractYoutubeId(currPost.url, currPost.domain),
          id: currPost.id,
          title: currPost.title,
          text: currPost.selftext ? currPost.selftext : "",
          author: currPost.author,
          thumbnail: currPost.thumbnail,
          url: currPost.url,
          date: new Date(currPost.created_utc * 1000),
          order: round,
          permalink: currPost.permalink,
        });
        count++;
      } else if (
        currPost.post_hint === "hosted:video" ||
        (currPost.is_video == true &&
          currPost.secure_media.reddit_video.fallback_url)
      ) {
        if (
          (sfw &&
            (currPost.url_overridden_by_dest == "nsfw" ||
              currPost.thumbnail == "nsfw")) ||
          contentType === "image"
        ) {
          continue;
        }
        // console.log("art index: " + n);

        src = currPost.secure_media.reddit_video.fallback_url;
        tempArr.push({
          category: postCategory,
          subreddit: currPost.subreddit,
          type: "hosted:video",
          contentType: "video",
          src: src,
          id: currPost.id,
          title: currPost.title,
          author: currPost.author,
          thumbnail: currPost.thumbnail,
          url: currPost.url,
          audioSrc: currPost.url + "/DASH_AUDIO_64.mp4",
          date: new Date(currPost.created_utc * 1000),
          order: round,
          permalink: currPost.permalink,
        });
        count++;
      }
    }
    return tempArr;
  }
  function handleSelectDropdownItem(type, value) {
    if (type == "ai") {
      setCurrentSorts((currentSorts) => ({ ...currentSorts, ai: value }));
    } else if (type == "human") {
      setCurrentSorts((currentSorts) => ({ ...currentSorts, human: value }));
    }
  }
  function handleGuessButtonClick(choice) {
    if (currArt.category === choice) {
      setScore((score) => ++score);
      currArt.correct = true;
    } else {
      currArt.correct = false;
    }
    setGallery((prev) => [currArt, ...prev]);
    setRound((round) => ++round);
  }
  return (
    <>
      <div className="bg-[#EFE9E1] flex flex-col  items-center w-full min-h-screen">
        <div className=" h-min p-3 sm:max-w-200 w-full ">
          <main className=" h-min  mb-20">
            <section className="flex flex-row w-full items-between justify-between">
              <div className="">
                <Dropdown type={"ai"} currentSort={currentSorts.ai}>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("ai", "new");
                    }}
                    isSelected={currentSorts.ai === "new"}
                  >
                    New
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("ai", "rising");
                    }}
                    isSelected={currentSorts.ai === "rising"}
                  >
                    Rising
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("ai", "hot");
                    }}
                    isSelected={currentSorts.ai === "hot"}
                  >
                    Hot
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("ai", "top");
                    }}
                    isSelected={currentSorts.ai === "top"}
                  >
                    Top
                  </DropdownItem>
                </Dropdown>
                <Dropdown type={"human"} currentSort={currentSorts.human}>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("human", "new");
                    }}
                    isSelected={currentSorts.human === "new"}
                  >
                    New
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("human", "rising");
                    }}
                    isSelected={currentSorts.human === "rising"}
                  >
                    Rising
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("human", "hot");
                    }}
                    isSelected={currentSorts.human === "hot"}
                  >
                    Hot
                  </DropdownItem>
                  <DropdownItem
                    onSelect={() => {
                      handleSelectDropdownItem("human", "top");
                    }}
                    isSelected={currentSorts.human === "top"}
                  >
                    Top
                  </DropdownItem>
                </Dropdown>
              </div>
              <div>
                <Dropdown currentSort={contentType} type="content">
                  <DropdownItem
                    onSelect={() => {
                      setContentType("image");
                      // resetAfters();
                    }}
                    isSelected={contentType === "image"}
                  >
                    Image
                  </DropdownItem>

                  <DropdownItem
                    onSelect={() => {
                      setContentType("video");
                      // resetAfters();
                    }}
                    isSelected={contentType === "video"}
                  >
                    Video
                  </DropdownItem>
                </Dropdown>
              </div>
            </section>

            <div className="text-center slide-in-blurred-top  ">
              <h1 className="inter-medium text-[#5C4E41] text-3xl sm:text-5xl xl:text-6xl mb-2 sm:m-4 uppercase">
                Turing Gallery
              </h1>
              <h4 className="inter-light text-[#5C4E41] text:lg sm:text-xl xl:text-2xl mb-2">
                Can you spot if this artwork was made by human or machine?
              </h4>

              {round == 0 && (
                <p className="inter-light text-[#5C4E41]  mb-2"></p>
              )}
              <button
                className="w-max px-7 py-2 mb-3 bg-[#899481] hover:bg-[#9eac95] focus:bg-[#9eac95] text-white mx-auto rounded-full shadow-xl/45 shadow-[#899481] cursor-pointer inter-medium "
                onClick={() => setAboutOpen((about) => !about)}
              >
                {aboutOpen ? "Enough a" : "A"}bout the Gallery
              </button>
            </div>
            <div className="flex justify-center items-center bg-[#F6F6F6]-50 slide-in-blurred-top">
              <div className="arts-wrapper my-2 w-full flex justify-center ">
                {aboutOpen ? (
                  <About></About>
                ) : loading ? (
                  <Loading> </Loading>
                ) : (
                  artArray.map((art) =>
                    art.type == "image" ? (
                      <Image art={art} key={art.id}></Image>
                    ) : art.type === "rich:video" ? (
                      <YouTube art={art} key={art.id}></YouTube>
                    ) : (
                      <Video art={art} key={art.id}></Video>
                    )
                  )
                )}
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 my-2 slide-in-blurred-top">
              <GuessButton
                currArt={currArt}
                choice={humanCategory}
                onClick={(choice) => handleGuessButtonClick(choice)}
                disabled={aboutOpen}
              >
                <img
                  className="w-full"
                  src="/assets/icons/human2.svg"
                  alt="AI icon"
                />
              </GuessButton>
              <h4 className="inter-light text-[#5C4E41] text:lg sm:text-xl xl:text-2xl my-2 p-2 rounded-xl ">
                {score}/{round}
              </h4>
              <GuessButton
                currArt={currArt}
                choice={aiCategory}
                onClick={(choice) => handleGuessButtonClick(choice)}
                disabled={aboutOpen}
              >
                <img
                  className="w-full"
                  src="/assets/icons/ai2.svg"
                  alt="AI icon"
                />
              </GuessButton>
            </div>
          </main>
          <Gallery gallery={gallery}></Gallery>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;

// async function fetchResults(ai_url, human_url) {
//   try {
//     const responses = await Promise.all([fetch(ai_url), fetch(human_url)]);

//     if (responses.every((res) => res.ok)) {
//       const [ai, human] = await Promise.all(responses.map((r) => r.json()));
//       console.log(ai.data.children);
//       console.log(human.data.children);
//       // console.log(human.data.after);
//       // console.log(ai.data.after);
//       return { ai, human };
//       // console.log(afters);
//     } else {
//       throw new Error("One or more responses are not OK");
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }
// function updateDataults(ai, human) {
//   setAfters({
//     ...afters,
//     ai: ai.data.after,
//     human: human.data.after,
//   });

//   const tempArts = {
//     human: getArts(humanCategory, human.data.children, 0),
//     ai: getArts(aiCategory, ai.data.children, 1),
//   };
//   setArts(tempArts);
// }

// function updateURL() {
//   AI_URL = `https://www.reddit.com/r/aiArt/${currentSorts.aiSort}/.json?limit=10&after=${afters.ai}`;
//   HUMAN_URL = `https://www.reddit.com/r/DigitalArt/${currentSorts.humanSort}/.json?limit=10&after=${afters.human}`;
// }

// async function fetchResults(AI_URL, HUMAN_URL) {
//   Promise.all([fetch(AI_URL), fetch(HUMAN_URL)])
//     .then((res) => {
//       if (Promise.all(res.map((item) => item.ok))) {
//         // console.log(res[0].ok + " and " + res[1].ok);
//         return Promise.all(res.map((r) => r.json()));
//       }
//       throw new Error("Something went wrong in first then");
//     })
//     .then(([ai, human]) => {
//       console.log(ai.data.children);
//       console.log(human.data.children);
//       console.log(human.data.after);
//       console.log(ai.data.after);
//       updateDataults(ai, human);
//       console.log(afters);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// }

// TEST fetch
// async function fetchThis() {
//   try {
//     // Make the API request
//     const res = await fetch(
//       "https://www.reddit.com/search/.json?q=fun&type=communities&iId=71209918-c040-4756-ad67-b5a644785fc1"
//     );

//     // Check if the request was successful (status code 200)
//     if (!res.ok) {
//       throw new Error("Network response was not ok");
//     }

//     // Parse the JSON response
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     console.log("Error:", e);
//   }
// }

// async function testFetch() {
//   const data = await fetchThis();
//   if (data) {
//     // Log the JSON data (usually you'll want to process it further)
//     console.log(data);
//   }
// }

// testFetch();
