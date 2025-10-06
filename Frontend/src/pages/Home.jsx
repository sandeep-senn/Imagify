import Header from "../components/Header";
import HowItWorks from "../components/HowItWorks";
import Desc from "../components/Desc";
import Testimonial from "../components/Testimonial";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  return (
    <div>
      <Header />
      <hr className="border-neutral-300 py-10" />
      <HowItWorks />
      <hr className="border-neutral-300 mt-20" />
      <Desc />
      <hr className="border-neutral-300 mt-20" />
      <Testimonial />
      <hr className="border-neutral-300 mt-20" />
      <GenerateBtn />
    </div>
  );
};

export default Home;
