import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {AppContext} from "../context/AppContext";

const Navbar = () => {

  const {user, setShowLogin, logout, credit} = useContext(AppContext);
  
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <Link to="/">
          <img
            src={assets.logo}
            alt="Navbar"
            className="w-28 sm:w-32 lg:w-40 hover:cursor"
          />
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700" onClick={()=>{navigate('/buycredit')}}>
              <img src={assets.credit_star} className="w-5" alt="credit-star" />
              <p className="text-xs sm:text-sm font-medium">Credit left : {credit}</p>
            </button>
              <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
              <div className="relative group ">
                <img src={assets.profile_icon} alt="pfp"  className="w-10 drop-shadow "/>
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded text-black pt-12">
                    <ul className="list-none m-0 p-1 bg-white rounded-full text-sm">
                        <li onClick={logout} className="py-1 px-1">Logout</li>
                    </ul>
                </div>
              </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              className="cursor-pointer"
              onClick={() => navigate("/buycredit")}
            >
              Pricing
            </p>
            <button
              onClick={()=>{setShowLogin(true)}}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer hover:bg-blue-600 transition ">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
