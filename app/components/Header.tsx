import clsx from "clsx";
import React, { Dispatch, SetStateAction } from "react";
// @ts-ignore
import h2p from "html2pdf.js"

function Header({ fullView, setFullView }: { fullView: boolean, setFullView: Dispatch<SetStateAction<boolean>> }) {
  return (
    <header
      className={clsx(
        "w-full z-50 text-white py-5 px-[10px] flex justify-between items-center font-primary font-semibold text-lg bg-[#0077cc] sticky top-0",
        fullView ? "" : "rounded-t-[15px]"
      )}
    >
      <div className="chat-logo">
        <img src="/logo.png" alt="logo" />
        Uni-Bot
      </div>

      <div className="flex">
        <button id="download-btn" className="btn btn-onlyicon" onClick={() => {
          const element = document.getElementById("answer-area") as HTMLElement;
          if (!element) return;
          const options = {
            margin: 0.5,
            filename: 'chat.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          h2p().set(options).from(element).save();
         }}>
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
