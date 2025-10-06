import React from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = React.useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState('');

  const {generateImage} = React.useContext(AppContext)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoaded(true)
        setImage(image)
      }else{
          setLoading(false)
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center py-10 min-h-[90vh] px-4"
    >
      <div>
        <div className="relative">
          <img src={image} className="max-w-sm rounded" alt="Generated" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}></span>
        </div>
        {loading && <p className="mt-2 text-blue-600">Loading...</p>}
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 placeholder-gray-300"
          /> 
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10">
          <p
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
            onClick={() => setIsImageLoaded(false)}
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;
