export default function GuessButton({ children, onClick, choice, disabled }) {
  return (
    <div
      className={
        "rounded-full aspect-square flex justify-center items-center transition-all " +
        (disabled
          ? "opacity-30 pointer-none grayscale-0"
          : "cursor-pointer w-25")
      }
      onClick={() => (!disabled ? onClick(choice) : null)}
    >
      <figure
        className={
          "w-full  shadow-xl/30 shadow-[#899481] rounded-full " +
          (disabled ? " " : "hover:w-9/10")
        }
      >
        {children}
      </figure>
    </div>
  );
}
