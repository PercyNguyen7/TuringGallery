import React, { useState } from "react";

export default function Image({ art }) {
  const [selected, setSelected] = useState(false);
  const [playing, setPlaying] = useState();
  // const [selectedCount, setSelectedCount ] = useState(0);
  function handleClick() {
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

  return (
    <div onClick={handleClick} className={"el-wrapper slide-in-bck-center"}>
      <figure className=" h-full sm:max-h-100 lg:max-h-120  ">
        <img
          className="object-contain w-max h-full rounded-2xl mx-auto shadow-xl/30 shadow-[#899481] "
          src={art.src}
          alt=""
        />
      </figure>
    </div>
  );
}
