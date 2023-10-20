import "./App.css";
import "./index.css";
import Header from "./assets/components/Header";
import { useState } from "react";
import Input from "./assets/components/Input";

function App() {
  const [bgChange, setBgChange] = useState(false);

  const bgChnageHandler = (event) => {
    setBgChange(event);
    // console.log("event", event);
  };
  return (
    <div className={bgChange ? "bg-white" : "bg-black"}>
      <div className=" border border-red-500 flex flex-col pt-[24px] pr-[24px] pb-[63px] pl-[24px]">
        <Header onChangeBg={bgChnageHandler} />

        <Input className="w-[100%]" />
      </div>
    </div>
  );
}

export default App;
