import React from "react";
interface ProfileNavProps {
  chosen: number;
  setChosen: React.Dispatch<React.SetStateAction<number>>;
}
function ProfileNav({ chosen, setChosen }: ProfileNavProps) {
  return (
    <>
      <div className="w-full flex max-w-[1250px] mx-auto gap-4 px-4">
        <div
          className={`w-[25%] bg-white h-[43px] flex items-center justify-center cursor-pointer ${
            chosen === 0
              ? "border-b-2 border-[#1877F2] text-[#1877F2] rounded-t-lg"
              : "text-[#65686C] hover:bg-gray-100 rounded-lg"
          }`}
          onClick={() => setChosen(0)}
        >
          <h2 className="text-lg font-bold">Posts</h2>
        </div>

        <div
          className={`w-[25%] bg-white h-[43px] flex items-center justify-center cursor-pointer ${
            chosen === 1
              ? "border-b-2 border-[#1877F2] text-[#1877F2] rounded-t-lg"
              : "text-[#65686C] hover:bg-gray-100 rounded-lg"
          }`}
          onClick={() => setChosen(1)}
        >
          <h2 className="text-lg font-bold">Saved</h2>
        </div>

        <div
          className={`w-[25%] bg-white h-[43px] flex items-center justify-center cursor-pointer ${
            chosen === 2
              ? "border-b-2 border-[#1877F2] text-[#1877F2] rounded-t-lg"
              : "text-[#65686C] hover:bg-gray-100 rounded-lg"
          }`}
          onClick={() => setChosen(2)}
        >
          <h2 className="text-lg font-bold">Friends</h2>
        </div>

        <div
          className={`w-[25%] bg-white h-[43px] flex items-center justify-center cursor-pointer ${
            chosen === 3
              ? "border-b-2 border-[#1877F2] text-[#1877F2] rounded-t-lg"
              : "text-[#65686C] hover:bg-gray-100 rounded-lg"
          }`}
          onClick={() => setChosen(3)}
        >
          <h2 className="text-lg font-bold">Info</h2>
        </div>
      </div>
    </>
  );
}

export default ProfileNav;
