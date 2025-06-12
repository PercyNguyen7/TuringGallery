import React, { useState, useRef } from "react";

export default function Video({ art }) {
  const [selected, setSelected] = useState(false);
  const [playing, setPlaying] = useState(false);
  // const [selectedCount, setSelectedCount ] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  function toggleAudio() {
    if (audioRef.current) {
      if (!playing) audioRef.current.play();
      else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlaying((playing) => !playing);
    }

    // if (selectedCount <5){
    //     if (selected == false){
    //         setSelected(true);
    //     } else{
    //         setSelected(false);
    //     }
    //     // setSelectedCount(selectedCount+1);
    // } else{
    // }
  }
  function playAudio() {
    audioRef.current.currentTime = videoRef.current.currentTime;

    audioRef.current.play();
    setPlaying(true);
  }
  function stopAudio() {
    audioRef.current.pause();
    setPlaying(false);
  }

  return (
    <div className={"shadow-drop-2-center " + (selected ? " selected" : "")}>
      <>
        <audio ref={audioRef} id="myAudio" className="h-4 w-full">
          <source src={art.audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <figure className="md:max-h-[60vh] ">
          <video
            ref={videoRef}
            className="md:max-h-[60vh] rounded-2xl object-fit  shadow-xl/30 shadow-[#899481] slide-in-bck-center"
            src={art.src}
            controls
            onRateChange={() => {
              audioRef.current.playbackRate = videoRef.current.playbackRate;
            }}
            onPlay={playAudio}
            onPause={stopAudio}
          ></video>
        </figure>
      </>
    </div>
  );
}
