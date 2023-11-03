import axios from "axios";
import { useEffect, useState } from "react";
import icon from "../images/icon.png";
const Input = (props) => {
  const [input, setInput] = useState("");

  const [inputIsEmpty, setInputIEmpty] = useState(false);
  const [wordNotExist, setWordNotExist] = useState(null);
  const [data, setData] = useState([]);
  console.log("data", data);

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const fetchData = async () => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`;

      const response = await axios.get(url);
      setData(response.data);
      setInput("");
      setWordNotExist(false);
    } catch (error) {
      setWordNotExist(true);
      setData([]);
    }
  };

  const submitHandler = () => {
    fetchData();

    if (input.trim() === "") {
      setInputIEmpty(true);
    }
    if (input.trim() !== "") {
      setInputIEmpty(false);
    }
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      fetchData();

      if (input.trim() === "") {
        setInputIEmpty(true);
      }
      if (input.trim() !== "") {
        setInputIEmpty(false);
      }
    }
  };

  const wordData = data.map((w) => w.word);
  const wordShow = wordData.find((word) =>
    word.toLowerCase().includes(input.toLocaleLowerCase())
  );

  const audioUrls = data.map((p) =>
    p.phonetics
      .map((ph) => ph.audio)
      .flat()
      .filter((audioUrl) => audioUrl)
  );

  const handlePlayAudio = (index) => {
    if (0 >= 0 && 0 < audioUrls.length) {
      const audioUrl = audioUrls[index][0];
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        console.error("No audio URL found for the selected word.");
      }
    }
  };

  return (
    <div>
      <div className="mt-[24px] ">
        <div
          className={`${
            props.bgChange ? "bg-[#F4F4F4]" : "bg-[#1F1F1F]"
          } flex items-center  rounded-xl  justify-between w-full h-12 md:h-[64px] md:mt-12 `}
        >
          <input
            onChange={inputChangeHandler}
            onKeyDown={keyDownHandler}
            value={input}
            type="text "
            className={`md:text-[20px] ${
              props.bgChange ? "text-black" : "text-white"
            } w-full outline-none  placeholder-gray bg-transparent mr-3 ml-3`}
            placeholder=" Find some word "
          />

          <svg
            onClick={submitHandler}
            className="mr-6 "
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              fill="none"
              stroke="#A445ED"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            />
          </svg>
        </div>
        {inputIsEmpty && (
          <div className=" text-red-500">Whoops, can't be empty...</div>
        )}
        {wordNotExist && !inputIsEmpty && (
          <div className="flex flex-col items-center mt-32">
            <img className="w-16 h-16 mb-10" src={icon} />
            <div className="text-[#ffffff]  font-Inter font-bold text-base mb-6 leading-6">
              No Definitions Found
            </div>
            <div className="text-[#757575] font-Inter font-normal text-lg leading-6 text-center">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at later time or head to
              the web instead.
            </div>
          </div>
        )}
      </div>

      {/**result */}
      <div>
        {/**play container */}
        <div className="flex justify-between items-center mt-7 md:mt-12">
          <div className="flex flex-col gap-2">
            <h1
              className={`${
                props.bgChange ? "text-black" : "text-white"
              } text-[32px] font-bold md:text-[64px]`}
            >
              {wordShow}
            </h1>
            <h1>
              {data.map((pho) => (
                <div className="md:text-[24px] text-[#A445ED] font-regular font-[18px]">
                  {pho.phonetic}
                </div>
              ))}
            </h1>
          </div>

          <div className=" hover:text-red-400">
            {data.length > 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 75 75"
                onClick={() =>
                  handlePlayAudio(wordData.indexOf(input.toLowerCase()))
                }
                className="cursor-pointer md:w-[75px] md:h-[75px]"
              >
                <g fill="#A445ED" fill-rule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
            )}
          </div>
        </div>

        {/**meaning container */}
        <div className="mt-8">
          <div className="text-white">
            {data.map((meaning) =>
              meaning.meanings.map((meanings) => (
                <>
                  {/**partOfSpeech */}
                  <div className="flex flex-row items-center gap-[25px] mt-8 md:mt-11 md:mb-11">
                    <div
                      className={`${
                        props.bgChange ? "text-black" : "text-white"
                      } text-[18px] font-bold md:text-[24px]`}
                    >
                      {meanings.partOfSpeech}
                    </div>
                    <div className="h-[0.5px] w-full bg-[#3A3A3A]"></div>
                  </div>

                  <h1 className="text-[#757575] text-[16px] mt-[35px] mb-[17px] font-normal ">
                    Meaning
                  </h1>

                  {meanings.definitions.map((def, index) => (
                    <div
                      className={`${
                        props.bgChange ? "text-black" : "text-white"
                      } `}
                    >
                      <li
                        key={index}
                        className="font-normal text-[15px] md:text-[18px] mb-5 "
                      >
                        {def.definition}
                        {def.example && def.example.trim() !== "" && (
                          <div
                            style={{ color: "#757575" }}
                            className="text-[15px] ml-6 mt-4"
                          >
                            {'"' + def.example + '"'}
                          </div>
                        )}
                      </li>
                    </div>
                  ))}

                  {/**synonym */}
                  <div className="flex gap-6 mt-6 md:mt-10">
                    {meanings.synonyms.length > 0 && (
                      <h1 className="text-[#757575] text-[16px]">Synonym</h1>
                    )}
                    <div className="text-[#A445ED] flex flex-row-reverse font-bold">
                      {meanings.synonyms}
                    </div>
                  </div>
                </>
              ))
            )}

            {/**source URL */}

            {data.length > 0 && (
              <div className="h-[0.5px] w-full bg-[#3A3A3A]"></div>
            )}
            {data.length > 0 && (
              <div>
                <div className="text-white">
                  <h1
                    className="text-[#757575] mt-8 font-normal"
                    style={{ textDecoration: "underline" }}
                  >
                    Source
                  </h1>
                  <div className="flex items-center gap-2">
                    {data.map((source) => source.sourceUrls)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                    >
                      <path
                        fill="none"
                        stroke="#838383"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
