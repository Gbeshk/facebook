import React from "react";

function ShareButton() {
  return (
    <>
      <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
        <div>
          <i
            className="x1b0d499 x1d69dk1 inline-block w-5 h-5 bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")',
              backgroundPosition: "0px -924px",
            }}
          />
        </div>
        <span className="font-semibold">Share</span>
      </button>
    </>
  );
}

export default ShareButton;
