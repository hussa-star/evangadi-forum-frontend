import React, { createContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import {RingLoader} from 'react-spinners';
import Instance from '../../axiosConfig';
import style from './protect.module.css';
export const AppState = createContext();
const ProtectedRoute = () => {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    const checkUser = async ()=>{
        setLoading(true)
        const token = localStorage.getItem('token');
        if(!token){
            navigate('/')
            return;
        }
      try {
        
        const {data} = await Instance.get('/user/checkUser',{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response?.data);

      }finally{
        setLoading(false);
      }

    }
    checkUser();
  },[navigate]);
    if(loading){
       return <div className={style.loader_container}>
                <RingLoader color="#FF8704" size={60} speedMultiplier={0.8}/>
            </div> 
    }
  
  return (
    <AppState.Provider value={{user,setUser}}>
        <Outlet />
    </AppState.Provider>
  )
}

export default ProtectedRoute;