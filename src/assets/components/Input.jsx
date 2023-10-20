import axios from "axios";
import { useEffect, useState } from "react";

const Input = () => {
  const [input, setInput] = useState("");
  const [entireInput, setEntireInput] = useState("");

  const [data, setData] = useState([]);
  // const fetch = data.map((meaning) =>
  //   meaning.meanings.map((data) => data.definitions)
  // );

  // console.log(fetch);

  const speech = data.map((sp) => sp.meanings.map((sp) => sp.partOfSpeech));

  const test = speech.map((sp, index) => sp);
  console.log(test);
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
      fetchData(entireInput);
    }
  }, [entireInput]);

  return (
    <div>
      <div className="mt-[24px] ">
        <div className="flex items-center  rounded-xl  justify-between w-full h-12 bg-[#1F1F1F]">
          <input
            onChange={inputChangeHandler}
            onKeyDown={keyDownHandler}
            value={input}
            type="text "
            className="text-white w-full outline-none  placeholder-white bg-transparent mr-3 ml-3"
            placeholder=" keyboard "
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
        <div className="flex justify-between mt-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-lg text-[32px]">{entireInput}</h1>
            <h1 className="text-[#A445ED]">/ˈkiːbɔːd/</h1>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="75"
            height="75"
            viewBox="0 0 75 75"
          >
            <g fill="#A445ED" fill-rule="evenodd">
              <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
              <path d="M29 27v21l21-10.5z" />
            </g>
          </svg>
        </div>

        {/**noun container */}

        {test.map((sp, index) => (
          <div className="flex flex-row items-center gap-[25px] mt-8">
            <h1 key={index} className="text-white">
              {sp}
            </h1>
            <div className="h-[0.5px] w-full bg-white"></div>
          </div>
        ))}

        {/**meaning container */}
        <div className="mt-8">
          <h1 className="text-[#757575] text-[16px]">Meaning</h1>
          <div className="text-white">
            {data.map((meaning) =>
              meaning.meanings.map((data) =>
                data.definitions.map((def, index) => (
                  <div>
                    <li key={index} className="text-white">
                      {def.definition}
                    </li>
                  </div>
                ))
              )
            )}

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
