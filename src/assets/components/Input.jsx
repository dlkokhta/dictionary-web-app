import axios from "axios";
import { useEffect, useState } from "react";

const Input = () => {
  const [input, setInput] = useState("");
  const [entireInput, setEntireInput] = useState("");

  const [data, setData] = useState([]);

  console.log("data", data);
  // console.log(entireInput.indexOf());
  const audioUrl = data
    .map((p) => p.phonetics.map((ph) => ph.audio))
    .flat()
    .filter((audioUrl) => audioUrl);

  const specificAudioUrl =
    "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3";

  const index = audioUrl.indexOf(specificAudioUrl);

  console.log("audioUrls", audioUrl.indexOf());

  // console.log(
  //   "word",
  //   data.map((w) => w.word.indexOf())
  // );

  // console.log(data.map((d) => d.partOfSpeech.map((p) => p.text)));

  // const fetch = data.map((meaning) =>
  //   meaning.meanings.map((data) => data.definitions)
  // );

  // console.log(fetch);

  // const speech = data.map((sp) => sp.meanings.map((sp) => sp.partOfSpeech));

  // const test = speech.map((sp, index) => sp);
  // console.log(test);
  // const test = data.map((meaning) => meaning.meanings.map((data) => data));

  // console.log(test);

  // console.log(data[0].meanings[1]);

  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = () => {
    setEntireInput(input);
    setInput("");
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      setEntireInput(input);
      setInput("");
    }
  };

  const fetchData = async () => {
    try {
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${entireInput}`;

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (entireInput.length) {
      fetchData();
    }
  }, [entireInput]);

  const wordData = data.map((w) => w.word);

  const audioUrls = data.map((p) =>
    p.phonetics
      .map((ph) => ph.audio)
      .flat()
      .filter((audioUrl) => audioUrl)
  );

  // {
  //   /**ეს მუშაობს */
  // }
  const handlePlayAudio = (index) => {
    if (0 >= 0 && 0 < audioUrls.length) {
      const audioUrl = audioUrls[index][0]; // Use the first audio source
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
        <div className="flex items-center  rounded-xl  justify-between w-full h-12 bg-[#1F1F1F]">
          <input
            onChange={inputChangeHandler}
            onKeyDown={keyDownHandler}
            value={input}
            type="text "
            className=" text-white w-full outline-none  placeholder-gray bg-transparent mr-3 ml-3"
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            />
          </svg>
        </div>
      </div>

      {/**result */}
      <div>
        {/**play container */}
        <div className="flex justify-between items-center mt-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-[32px] font-bold">{entireInput}</h1>
            <h1>
              {data.map((pho) => (
                <div className="text-[#A445ED] font-regular font-[18px]">
                  {pho.phonetic}
                </div>
              ))}
            </h1>
          </div>

          {/* {data.map((p) =>
            p.phonetics.map((ph, index) => (
              <div key={index}>
                <h1>ph.word</h1>
              </div>
            ))
          )} */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 75 75"
            onClick={() =>
              handlePlayAudio(wordData.indexOf(entireInput.toLowerCase()))
            }
          >
            <g fill="#A445ED" fill-rule="evenodd">
              <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
              <path d="M29 27v21l21-10.5z" />
            </g>
          </svg>
        </div>

        {/**noun container */}

        {/* {test.map((sp, index) => (
          <div className="flex flex-row items-center gap-[25px] mt-8">
            <h1 key={index} className="text-white">
              {sp}
            </h1>
            <div className="h-[0.5px] w-full bg-white"></div>
          </div>
        ))} */}

        {/**meaning container */}
        <div className="mt-8">
          <div className="text-white">
            {data.map((meaning) =>
              meaning.meanings.map((meanings) => (
                <>
                  {/**partOfSpeech */}
                  <div className="flex flex-row items-center gap-[25px] mt-8">
                    <div className="font-bold">{meanings.partOfSpeech}</div>
                    <div className="h-[0.5px] w-full bg-[#3A3A3A]"></div>
                  </div>

                  <h1 className="text-[#757575] text-[16px] mt-[35px] mb-[17px] font-normal">
                    Meaning
                  </h1>

                  {meanings.definitions.map((def, index) => (
                    <div>
                      <li key={index} className="font-normal text-[15px]">
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
                  <div className="flex gap-6 mt-6">
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

            <div className="h-[0.5px] w-full bg-[#3A3A3A]"></div>
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* {data.map((meaning) =>
              meaning.meanings.map((data) =>
                data.definitions.map((def) => (
                  <div>
                    <li
                      className="text-white list-disc list-inside pl-5"
                      style={{ "--tw-list-color": "red" }}
                    >
                      {def.definition}
                    </li>
                  </div>
                ))
              )
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
