import React from 'react'

function AddStooryBtn() {
  return (
    <>
      <div className="rounded-[10px] gap-2 h-9 bg-[#1877F2] bg-opacity-90 w-[209px] flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
              <p className="text-[25px] text-white mt-[-2px]">+</p>
              <span className="text-white font-semibold text-sm">
                Add to story
              </span>
            </div>
    </>
  )
}

export default AddStooryBtn
