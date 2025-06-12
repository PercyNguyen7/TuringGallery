import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

export default function Gallery({ gallery }) {
  function handleSelectDropdownItem(newSort) {
    setCurrentSort(newSort);
  }
  function sortByType() {
    switch (currentSort) {
      case "recent":
        return sortByRecent();
      case "mistakes":
        return sortByMistakes();
      case "content":
        return sortByContent();
      case "created-time":
        return sortByCreatedTime();
    }
  }
  function sortByCreatedTime() {
    return gallery.slice().sort((a, b) => b.date - a.date);
  }
  function sortByRecent() {
    return gallery.slice().sort((a, b) => b.order - a.order);
  }
  function sortByMistakes() {
    const incorrectArr = gallery
      .slice()
      .filter((art) => art.correct == false)
      .sort((a, b) => b.order - a.order);
    const correctArr = gallery
      .slice()
      .filter((art) => art.correct == true)
      .sort((a, b) => b.order - a.order);
    return [...incorrectArr, ...correctArr];
  }
  function sortByContent() {
    const imgArr = gallery
      .slice()
      .filter((art) => art.contentType == "image")
      .sort((a, b) => b.order - a.order);
    const videoArr = gallery
      .slice()
      .filter((art) => art.contentType == "video")
      .sort((a, b) => b.order - a.order);
    return [...imgArr, ...videoArr];
  }
  // content, postTime, recent, correct
  const [currentSort, setCurrentSort] = useState("recent");

  const sortedGallery = sortByType();
  return (
    <div className="p-4 w-full bg-[#F6F6F6] rounded-2xl my-10  h-min">
      <div className=" flex flex-row w-full justify-between items-center sticky">
        <h3 className="inter-medium text-[#5C4E41] text:lg sm:text-2xl xl:text-4xl my-2 ">
          RESULTS
        </h3>

        <Dropdown type={"result"} currentSort={currentSort}>
          <DropdownItem
            onSelect={() => handleSelectDropdownItem("recent")}
            isSelected={currentSort === "recent"}
          >
            Recent
          </DropdownItem>

          <DropdownItem
            onSelect={() => handleSelectDropdownItem("mistakes")}
            isSelected={currentSort === "mistakes"}
          >
            Mistakes
          </DropdownItem>

          <DropdownItem
            onSelect={() => handleSelectDropdownItem("content")}
            isSelected={currentSort === "content"}
          >
            Content
          </DropdownItem>

          <DropdownItem
            onSelect={() => handleSelectDropdownItem("created-time")}
            isSelected={currentSort === "created-time"}
          >
            Time Created
          </DropdownItem>
        </Dropdown>
      </div>
      {gallery.length == 0 && (
        <span className="inter-medium border-[#5C4E41] ">
          {" "}
          A collection of artwork information up until the most recent round.
        </span>
      )}
      <div className="py-4 flex flex-col overflow-y-scroll max-h-200 [&>div:not(:last-child)]:border-b-1">
        {sortedGallery.map((post) => (
          <Post post={post} key={post.id}></Post>
        ))}
      </div>
    </div>
  );
}

function Post({ post }) {
  const errorUrl =
    "https://images.unsplash.com/photo-1532003885409-ed84d334f6cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="flex flex-col sm:flex-row border-[#5C4E41] py-4 gap-4 ">
      <figure className="aspect-square min-w-50 w-50 ">
        <img
          className="object-cover w-full h-full aspect-square rounded-xl"
          src={
            post.contentType === "image"
              ? post.src
              : !post.thumbnail ||
                  post.thumbnail.indexOf("external-preview") > 0
                ? errorUrl
                : post.thumbnail
          }
          alt=""
        ></img>
      </figure>
      <div>
        <div className="tags flex flex-row flex-wrap ">
          <div className="inter-light rounded-full border-1 border-[#5C4E41] px-2 mr-2 text-sm">
            {post.category == "ai" ? "AI ART" : "HUMAN ART"}
          </div>
          <div className="inter-light rounded-full border-1 border-[#5C4E41] px-2 mr-2 text-sm">
            {post.correct ? "CORRECT" : "INCORRECT"}
          </div>
        </div>

        <div className="tags flex flex-row flex-wrap my-2">
          <span className="text-[#5C4E41] mr-2">u/{post.author} |</span>
          <span className="text-[#5C4E41] mr-2">r/{post.subreddit} |</span>
          <span className="text-[#5C4E41] mr-2">
            {timeSince(post.date)} ago
          </span>
        </div>
        <h4 className="inter-medium text-[#5C4E41] text:lg sm:text-xl xl:text-2xl my-2">
          {post.title}
        </h4>
        <p className="inter-medium text-[#5C4E41] mb-3">
          {post.text ? shortenParagraph(post.text, 30) : "No description"}
        </p>

        <a
          className="bg-[#899481] text-[#F6F6F6] rounded-full px-3 pt-1 pb-2 text-lg"
          href={`https://www.reddit.com/${post.permalink}`}
          target="_blank"
        >
          Source
        </a>
      </div>
    </div>
  );
}
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
function shortenParagraph(str, maxWords) {
  return str.split(" ").slice(0, maxWords).join(" ") + "...";
}
