import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'    
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const GenerateBtn = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (user) {
      navigate('/result')   // go to result page
    } else {
      navigate('/login')    // go to login page
    }
  }

  return (
    <div className="flex flex-col items-center justify-center my-10 py-16 px-4">
      <h1 className="text-center text-4xl py-4 font-semibold">
        See the Magic, Try it Now!
      </h1>

      <div
        className="bg-black text-white rounded-full px-6 py-3 mt-4 flex items-center gap-3 w-fit mx-auto cursor-pointer hover:scale-[1.02] transition-all duration-300"
      >
        <button
          className="rounded-lg shadow-lg"
          onClick={handleGenerate}
        >
          Generate Images
        </button>
        <img src={assets.star_group} width={30} alt="" />
      </div>
    </div>
  )
}

export default GenerateBtn
