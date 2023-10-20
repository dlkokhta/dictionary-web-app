import { useState } from "react";
const Header = (props) => {
  const [changeTheme, setChangeTheme] = useState(false);

  const themeChangehandler = () => {
    setChangeTheme(!changeTheme);
    props.onChangeBg(!changeTheme);
  };
  return (
    <>
      {/*main container*/}
      <div className="flex flex-row justify-between ">
        {/*logo svg */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="38"
            viewBox="0 0 34 38"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="#838383"
              stroke-linecap="round"
              stroke-width="1.5"
            >
              <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
              <path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8" />
              <path d="M11 9h12" />
            </g>
          </svg>
        </div>
        <div className="flex gap-4">
          {/*arrow-down svg */}
          <div className="flex items-center gap-4">
            <h1>Mono</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              viewBox="0 0 14 8"
            >
              <path
                fill="none"
                stroke="#A445ED"
                stroke-width="1.5"
                d="m1 1 6 6 6-6"
              />
            </svg>
          </div>

          <div className="w-[1px] bg-[#E9E9E9]"></div>
          {/*moon svg */}
          <div className="flex items-center gap-3 ">
            {changeTheme ? (
              <div
                onClick={themeChangehandler}
                className="pl-1 pr-1 flex items-center  w-[40px] h-[20px] bg-[#757575] rounded-full"
              >
                <div className=" w-[14px] h-[14px]  bg-white rounded-full"></div>
              </div>
            ) : (
              <div
                onClick={themeChangehandler}
                className="pl-1 pr-1 flex items-center justify-end  w-[40px] h-[20px] bg-[#A445ED] rounded-full"
              >
                <div className=" w-[14px] h-[14px]  bg-white rounded-full"></div>
              </div>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                fill="none"
                stroke="#838383"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
