import { useState, useEffect } from 'react';
 
import { auth } from '../services/firebase';

import { onAuthStateChanged } from 'firebase/auth';

import {Navigate} from 'react-router-dom'

export default function Private({ children }){

  // console.log("PASSOU AQUI");

  const [ loading, setLoading ] = useState(true);
  const [ signed, setSigned ] = useState(false);

  useEffect( () => {
    
    async function checkLogin(){
      onAuthStateChanged(auth, (user) =>{
        // console.log(user) consultar as informações do usuario

        if(user){
          const userData ={
            uid:user.uid,
            email: user.email
          };
          localStorage.setItem("@detailUser", JSON.stringify(userData))
          setLoading(false)
          setSigned(true)
        }else{
          setLoading(false)
          setSigned(false)
        }

      })
    }
    checkLogin();
  }, [signed])

  if(loading){
    return(
      <div>

      </div>
    )
  }

  if(!signed){
    return <Navigate to="/login" />
  }

  //se estiver usuario logado manda para o admin..o filho
  return children;
}