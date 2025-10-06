import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay }
  })
}

const Header = () => {
  const { user } = useContext(AppContext)
  const navigate = useNavigate()

  const handleGenerate = () => {
    if (user) {
      navigate('/result')
    } else {
      navigate('/login')
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center my-16 px-4"
      initial="hidden"
      animate="visible"
    >
      {/* Badge */}
      <motion.div
        custom={0.1}
        variants={fadeUp}
        className="text-stone-500 inline-flex text-center bg-white gap-2 rounded-full px-4 py-1 border"
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        custom={0.2}
        variants={fadeUp}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-7 text-center"
      >
        Turn text to <br />
        <span className="text-blue-600">Image</span>, in seconds
      </motion.h1>

      {/* Sub text */}
      <motion.p
        custom={0.3}
        variants={fadeUp}
        className="text-center max-w-xl mx-auto mt-7"
      >
        Unleash your creativity with our AI. Transform words into stunning visuals — just type and watch your ideas come to life!
      </motion.p>

      {/* Button with redirect */}
      <motion.div
        custom={0.4}
        variants={fadeUp}
        className="flex items-center mt-7 gap-2 border rounded-full bg-black text-center px-5 py-2 cursor-pointer"
      >
        <button
          onClick={handleGenerate}
          className="sm:text-lg w-auto text-white"
        >
          Generate Images
        </button>
        <img className="w-7" src={assets.star_group} alt="" />
      </motion.div>

      {/* Sample images */}
      <motion.div
        className="flex flex-wrap justify-center items-center mt-10 gap-4 sm:gap-6"
        initial="hidden"
        animate="visible"
      >
        {Array(6)
          .fill('')
          .map((_, index) => (
            <motion.img
              key={index}
              custom={0.5 + index * 0.1}
              variants={fadeUp}
              className="w-20 h-20 rounded-md border"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt="face"
            />
          ))}
      </motion.div>

      {/* Footer text */}
      <motion.p
        custom={1.2}
        variants={fadeUp}
        className="mt-3 text-neutral-600"
      >
        Generated images from Imagify
      </motion.p>
    </motion.div>
  )
}

export default Header
