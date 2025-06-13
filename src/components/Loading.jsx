export default function Loading() {
  const falloutSrc = "./assets/img/standby/dark/fallout_standby.gif";
  const afraidSrc = "./assets/img/standby/dark/afraid_standby.gif";
  const runningSrc = "./assets/img/standby/dark/running_standby.gif";
  const staticSrc = "./assets/img/standby/dark/static_standby.gif";
  const wormholeSrc = "./assets/img/standby/dark/wormhole_standby.gif";
  const eyeSrc = "./assets/img/standby/dark/eye_standby.gif";

  const whaleSrc = "./assets/img/standby/light/whale_standby.gif";
  const fingerSrc = "./assets/img/standby/light/finger_standby.gif";
  const whiteSrc = "./assets/img/standby/light/white_standby.gif";
  const worldSrc = "./assets/img/standby/light/world_standby.gif";

  const lightStandbys = [whaleSrc, fingerSrc, whiteSrc, worldSrc];
  const darkStandbys = [
    falloutSrc,
    afraidSrc,
    staticSrc,
    wormholeSrc,
    runningSrc,
  ];
  function chooseStandbySrc() {
    const specialStandbyChance = 0.01;

    const randomNum = Math.random();
    if (randomNum >= specialStandbyChance) {
      const randomIndex = Math.floor(Math.random() * lightStandbys.length);
      return lightStandbys[randomIndex];
    } else {
      return eyeSrc;
    }
  }

  return (
    <div className="">
      <figure className="h-full md:max-h-[60vh] slide-in-bck-center ">
        <img
          className="object-contain w-max h-full rounded-2xl mx-auto shadow-xl/30 shadow-[#899481]"
          src={chooseStandbySrc()}
          alt=""
        />
      </figure>
    </div>
  );
}
