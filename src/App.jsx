import "./App.css";
import "./index.css";
import Header from "./assets/components/Header";
import { useState } from "react";
import Input from "./assets/components/Input";

function App() {
  const [bgChange, setBgChange] = useState(false);
  const [mono, setMono] = useState(true);
  const [serif, setSerif] = useState(true);
  const [sansSerif, setSansSerif] = useState(true);

  const bgChnageHandler = (event) => {
    setBgChange(event);
  };

  const handleMonoClick = () => {
    setMono(true);
    setSerif(false);
    setSansSerif(false);
    console.log("mono");
  };

  const handleSerifClick = () => {
    setMono(false);
    setSerif(true);
    setSansSerif(false);
    console.log("serif");
  };

  const hansldeSansSerif = () => {
    setMono(false);
    setSerif(false);
    setSansSerif(true);
    console.log("sansSerif");
  };
  return (
    <div
      className={
        bgChange
          ? "bg-white duration-500"
          : "bg-black min-h-screen duration-500"
      }
      style={{
        fontFamily: mono
          ? "Inconsolata"
          : serif
          ? "sans-serif"
          : sansSerif
          ? "initial"
          : "",
      }}
    >
      <div className="xl:pl-[352px] xl:pr-[352px] md:pt-[58px] md:pr-[40px] md:pb-[118px] md:pl-[40px]  flex flex-col pt-[24px] pr-[24px] pb-[63px] pl-[24px]">
        <Header
          onChangeBg={bgChnageHandler}
          onMonoClick={handleMonoClick}
          onSerifClick={handleSerifClick}
          onSansSerifClick={hansldeSansSerif}
          mono={mono}
          serif={serif}
          sansSerif={sansSerif}
        />

        <Input className="w-[100%]" bgChange={bgChange} />
      </div>
    </div>
  );
}

export default App;
