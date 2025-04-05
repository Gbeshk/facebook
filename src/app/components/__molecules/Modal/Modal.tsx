import Image from "next/image";
import React from "react";
interface ModalProps {
  isModalOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Submit: (e: React.FormEvent) => Promise<void>;
  postText: string;
  setPostText: React.Dispatch<React.SetStateAction<string>>;
  imagePreview: string | null;
  removeImage: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isSubmitting: boolean;
}
function Modal({
  isModalOpen,
  modalRef,
  setIsModalOpen,
  Submit,
  postText,
  setPostText,
  imagePreview,
  removeImage,
  fileInputRef,
  isSubmitting,
}: ModalProps) {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="relative bg-white w-[500px] p-6 rounded-lg"
          >
            <button
              className="absolute top-4 right-4 text-black text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h3 className="text-center text-lg font-semibold mb-4">
              Create a Post
            </h3>
            <form onSubmit={Submit}>
              <input
                type="text"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Write something..."
                className="w-full h-[40px] border border-gray-300 p-2 rounded-md mb-4"
              />
              {imagePreview && (
                <div className="relative mb-4">
                  <Image
                  width={100}
                  height={100}
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
              <div className="border border-gray-200 rounded-lg mx-4 mb-4 p-2 flex justify-between items-center">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-6 h-6 bg-[url('https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png')] bg-no-repeat bg-contain bg-center"></div>
                  <span className="text-sm">Photo/video</span>
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
