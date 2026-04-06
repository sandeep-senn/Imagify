import React from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Loader from "../components/Loader";

const Result = () => {
  const [image, setImage] = React.useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const [input, setInput] = React.useState("");

  const { generateImage, imageLoading } = React.useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || imageLoading) return;

    const generatedImage = await generateImage(input.trim());
    if (generatedImage) {
      setIsImageLoaded(true);
      setImage(generatedImage);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center py-10 min-h-[90vh] px-4"
    >
      <div>
        <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
          <img
            src={image}
            className="max-w-sm rounded-3xl"
            alt={input || "Generated Image"}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px] flex items-center justify-center px-6">
              <Loader
                label="Creating your image"
                sublabel="This usually takes a few seconds. We're rendering the best result for your prompt."
                tone="light"
              />
            </div>
          )}
        </div>
        <div className="mt-4 text-center min-h-11">
          <p className="text-sm font-medium text-slate-700">
            {isImageLoaded ? "Your result is ready." : "Your next image starts here."}
          </p>
          <p className="text-xs text-slate-500">
            {imageLoading
              ? "Rendering in progress. Please keep this tab open for the best experience."
              : isImageLoaded
              ? "You can download it now or generate another variation."
              : "Describe the image clearly for sharper, more detailed output."}
          </p>
        </div>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-slate-800 text-white text-sm p-1 mt-10 rounded-full shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={imageLoading}
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 placeholder-gray-300 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={imageLoading || !input.trim()}
            className={`px-10 sm:px-16 py-3 rounded-full transition ${
              imageLoading || !input.trim()
                ? "bg-slate-600 opacity-70 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {imageLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10">
          <p
            className={`bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full ${
              imageLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => !imageLoading && setIsImageLoaded(false)}
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
