export default function YouTube({ art }) {
  return (
    <div className=" md:max-h-[60vh]  w-full h-full aspect-square">
      <figure className=" w-full md:max-h-[60vh] h-full ">
        <iframe
          className="w-full h-full md:max-h-[60vh] rounded-2xl object-fit shadow-xl/30 shadow-[#899481] slide-in-bck-center"
          src={`https://www.youtube.com/embed/${art.videoId}?modestbranding=1;showinfo=0;rel=0`}
          title={art.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </figure>
    </div>
  );
}
