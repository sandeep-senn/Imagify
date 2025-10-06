import React from "react";
import { assets } from "../assets/assets";

const Desc = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 mt-10 md:px-28">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-3">
          Create AI Images
        </h1>
        <p className="text-gray-500 mb-6">
          Turn your imagination into visuals
        </p>
      </div>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />
        <div className="flex flex-col mt-6 gap-4">
          <h2 className="text-3xl font-medium max-w-lg">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600">
            Unleash your creativity with our cutting-edge AI technology that transforms your text prompts into stunning images. Whether you're an artist, designer, or simply looking to visualize your ideas, our tool makes it easy and fun to create unique visuals in seconds. Simply enter a description, choose your style, and let our AI do the rest. Perfect for brainstorming, content creation, and bringing your imagination to life!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Desc;
