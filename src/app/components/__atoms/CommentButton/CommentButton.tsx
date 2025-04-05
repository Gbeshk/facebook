import React from 'react'

function CommentButton() {
  return (
    <>
      <button className="flex-1 py-2 flex items-center justify-center space-x-1 hover:bg-gray-100">
                  <i
                    className="inline-block w-[20px] h-[20px] bg-no-repeat"
                    style={{
                      backgroundImage:
                        'url("https://static.xx.fbcdn.net/rsrc.php/v4/y6/r/olX2yf1iinG.png")',
                      backgroundPosition: "0px -588px",
                    }}
                  ></i>
                  <span className="font-semibold">Comment</span>
                </button>
    </>
  )
}

export default CommentButton
