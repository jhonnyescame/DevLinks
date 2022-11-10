import { useState } from 'react';

import { Logo } from '../../components/Logo';
import { Input } from '../../components/Input';

import './style.css';

import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import{ useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleLogin(e){
    e.preventDefault();
    // alert("teste");

    if( email === '' ||  password === ''){
      alert("Preenchar todos os campos!")
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      // console.log("usuario logado")
      toast.success("Bem vindo de volta 🥰 ");
      navigate("/admin", {replace: true });
    })
    .catch(()=>{
      // alert("Usuario não tem permissão");
      console.log("ERRO NO USUARIO");
      toast.error("Erro ao tentar fazer o Login!");
    })
    // console.log(email);
    // console.log(password);
  }


  return (
     <div className='login-container'>

     <Logo />

     <form className='form' onSubmit={handleLogin}>
        <Input
         type="email"
         placeholder="Digite seu email ..."
         value={email}
         onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
         type="password"
         placeholder="*********"
         autoComplete='on'
         value={password}
         onChange={ (e) => setPassword(e.target.value) }
        />

       <button type="submit">Acessar</button>

     </form>

   </div>
  );
}