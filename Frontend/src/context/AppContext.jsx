import {useState, createContext, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(false)
    const [authLoading, setAuthLoading] = useState(false);
    const [creditsLoading, setCreditsLoading] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const loadCreditsData = async ()=>{
      if(!token){
        setCredit(false);
        return;
      }

      setCreditsLoading(true);
      try {
        const {data} = await axios.get(backendUrl + 'api/auth/credits', {headers : {token}})
        if(data.success){
          setCredit(data.credits)
          setUser(data.user)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setCreditsLoading(false);
      }
    }

    const generateImage = async (prompt)=>{
      setImageLoading(true);
      try {
        const {data} = await axios.post(backendUrl + 'api/image/generate-image', {prompt}, {headers : {token}})

        if(data.success){
          loadCreditsData()
          return data.resultImage
        }else{
          toast.error(data.message)
          loadCreditsData()
          if(data.creditBalance === 0 ){
              navigate('/buycredit')
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      } finally {
        setImageLoading(false);
      }
    }

    const logout = ()=>{
      localStorage.removeItem('token')
      setToken('')
      setUser(null)
    }
    useEffect(()=>{
        if(token){
          loadCreditsData()
        } else {
          setUser(null)
          setCredit(false)
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage, authLoading, setAuthLoading, creditsLoading, imageLoading
    }
    
  return ( 
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;

