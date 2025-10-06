import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-3">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-6">
        What Our Users Say About Us
      </p>
      <div className='flex flex-col md:flex-row items-center gap-6 flex-wrap justify-center'>
        {testimonialsData.map((item, index) => (
          <div key={index} className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 w-80'>
            <img src={item.image} alt={item.name} className='w-20 h-20 rounded-full mb-4' />
            <h3 className='text-xl font-semibold mb-2'>{item.name}</h3>
            <p className='text-gray-600 text-center'>" {item.role} "</p>
            <div className='flex mt-2 mb-4'>
              {Array(item.stars).fill().map((_, i) => (
                <img src={assets.rating_star} key={i} alt="" />
              ))}
            </div>
            <p className='text-gray-600 text-center'>" {item.text} "</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonial
