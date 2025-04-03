import Link from 'next/link'
import React from 'react'

function AlreadyHaveAcc() {
  return (
    <div className="text-center text-xs mt-4 text-[#1c1e21]">
    <Link href="signin" className="text-[#1877f2] hover:underline  font-[SFProText-Semibold, Helvetica, Arial, sans-serif] mt-5 text-[17px] leading-[20px] cursor-pointer">
      Already have an account?
    </Link>
  </div>
  )
}

export default AlreadyHaveAcc
