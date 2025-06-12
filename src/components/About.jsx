export default function About() {
  return (
    <div className="p-4 slide-in-bck-center bg-white rounded-2xl">
      <div className=" h-full sm:max-h-100 lg:max-h-120 text-center ">
        <h2 className="inter-medium text-[#5C4E41] text-2xl sm:text-2xl xl:text-3xl mb-2 sm:m-4 uppercase">
          Purpose
        </h2>
        <p className="inter-light text-[#5C4E41] text:lg sm:text-xl xl:text-2xl mb-2">
          The Turing Gallery arms its players with a critical mind and a
          skeptical eye against artificially generated content.
        </p>
        <p className="inter-light text-[#5C4E41] text:lg sm:text-xl xl:text-2xl mb-2">
          Amidst the era of (mis)information, the inability to distinguish the
          real from the artificial may pervert one's truth and reality.
        </p>
        <p className="inter-light text-[#5C4E41] text:lg  mb-2">
          Credit: All artworks have been drawn from various subreddits. You may
          find the source for each artwork under the results section.
        </p>
      </div>
    </div>
  );
}
