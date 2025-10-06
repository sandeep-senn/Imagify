import { stepsData } from "../assets/assets";

const HowItWorks = () => {
  return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mt-10 gap-3">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
            How It Works
          </h1>
          <p className="text-lg mb-8 text-neutral-700">
            Transform Words into Stunning Images
          </p>
        </div>
        <div>
          {stepsData.map((item, index) => (
            <div className="flex gap-10 my-8 shadow-md bg-white/20 cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg px-5 py-2 " key={index}>
                <img width={40} src={item.icon} alt="" />
                <div>
                    <h2 className="text-xl font-medium">{item.title}</h2>
                    <p className="text-gray-700">{item.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default HowItWorks;
