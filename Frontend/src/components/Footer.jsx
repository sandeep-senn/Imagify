import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <hr className='border-neutral-300' />
      <div className='flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4'>
        <img src={assets.logo} alt="Logo" className="w-[150px]" />
        <p className='text-center text-sm text-gray-500'>
          © sandeepsen.dev | All rights reserved.
        </p>
        <div className='flex gap-3'>
          <img src={assets.facebook_icon} alt="Facebook" className="w-[30px]" />
          <img src={assets.instagram_icon} alt="Instagram" className="w-[30px]" />
          <img src={assets.twitter_icon} alt="Twitter" className="w-[30px]" />
        </div>
      </div>
    </div>
  )
}

export default Footer
