import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}api/auth/verify-razor`,
            response,
            {
              headers: { token },
            }
          );
          if (data.success) {
            await loadCreditsData();
            alert("Payment Successful!");
          } else {
            alert("Payment verification failed!");
          }
        } catch (error) {
          console.error(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    try {
      rzp.open();
    } catch (err) {
      alert("Unable to open payment gateway.");
      console.error(err);
    }
  };
  
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}api/auth/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order);
      } else {
        console.error("Payment failed:", data.message);
      }
    } catch (error) {
      console.error("Error in paymentRazorpay:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="text-center mb-12">
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-6 hover:bg-gray-100 transition">
          OUR PLANS
        </button>
        <h1 className="text-2xl sm:text-4xl font-medium mb-8">
          Choose the plan
        </h1>
      </div>

      <div className="flex flex-wrap gap-6 justify-center text-left">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-2xl py-10 px-8 text-gray-600 hover:scale-105 transition-all duration-500 w-full sm:w-[300px]"
          >
            <img
              width={40}
              src={assets.credit_star}
              alt="Credit Star Icon"
              className="mb-4"
            />
            <p className="font-semibold text-lg">{plan.id}</p>
            <p className="text-sm mb-4">{plan.desc}</p>
            <p className="mt-6">
              <span className="text-4xl font-semibold">${plan.price}</span> /{" "}
              {plan.credits} credits
            </p>
            <button
              onClick={() => {
                paymentRazorpay(plan.id);
              }}
              className="mt-6 bg-black text-white px-6 py-2 rounded-full hover:bg-blue-600 transition"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
