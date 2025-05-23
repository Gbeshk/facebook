import React from "react";
interface AddPhotoProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}
function AddPhoto({ fileInputRef, handleImageChange }:AddPhotoProps) {
  return (
    <div
      className="flex items-center gap-[8px] max-w-[33%] justify-center cursor-pointer rounded-[8px] hover:bg-gray-100 h-[40px]"
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="w-[24px] h-[24px] bg-[url('https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png')] bg-no-repeat bg-contain shrink-0" />
      <p className="text-[#65686c] text-[15px]  max-sm:text-[13px] font-semibold">Photo/<br className="hidden max-sm:block" />Video</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}

export default AddPhoto;
