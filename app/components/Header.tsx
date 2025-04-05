import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";

// width: 100%;
// color: var(--white-color);
// padding-block: 20px;
// padding-inline: 10px;
// display: flex;
// justify-content: space-between;
// align-items: center;
// font-family: var(--font-primary);
// font-weight: 500;
// font-size: 18px;
// background-color: var(--primary-color);
// position: sticky;
// border-radius: 15px 15px 0px 0px;

function Header({ fullView, setFullView }: { fullView: boolean, setFullView: Dispatch<SetStateAction<boolean>> }) {
  return (
    <header
      className={clsx(
        "w-full text-white py-5 px-[10px] flex justify-between items-center font-primary font-semibold text-lg bg-[#0077cc] sticky top-0",
        fullView ? "z-30" : "rounded-t-[15px]"
      )}
    >
      <div className="chat-logo">
        <img src="/logo.png" alt="logo" />
        Uni-Bot
      </div>

      <div className="flex">
        <button id="download-btn" className="btn btn-onlyicon">
          <img
            src="/download-white.svg"
            alt="_"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
        {fullView ? (
          <button className="btn btn-onlyicon" onClick={() => {
            setFullView(false);
          }} >
            <img
            src="/minimize.svg"
            alt="_"
            style={{ width: "25px", height: "25px" }}
          />
          </button>
        ) : (
          <button className="btn btn-onlyicon" onClick={() => {
            setFullView(true);
          }} >
            <img
            src="/maximize.svg"
            alt="|_|"
            style={{ width: "25px", height: "25px" }}
          />
          </button>          
        )}
      </div>
    </header>
  );
}

export default Header;
