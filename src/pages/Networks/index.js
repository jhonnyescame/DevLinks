import { useState, useEffect } from 'react';

import './networks.css';

import { Link } from 'react-router-dom';
import { Logo } from '../../components/Logo';
import { Header } from '../../components/Header';
import { MdAddLink }from "react-icons/md";

import { Input } from '../../components/Input';

import { db } from '../../services/firebase';
import { 
  setDoc,
  doc,
  getDoc,
  // addDoc,
  // collection,
  // onSnapshot,
  // query,
  // orderBy,
  // deleteDoc
  } from 'firebase/firestore';

  import { toast } from 'react-toastify';


export default function Networks() {

  const [facebook,setFacebook] = useState("");
  const [instagram,setInstagram] = useState("");
  const [youtube,setYoutube] = useState("");

  useEffect(() => {

    function loadLinks(){

      const docRef = doc(db, "social", "link")

      getDoc(docRef)
      .then( (snapshot)=>{
        // console.log(snapshot.data());
        
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data().facebook)
          setInstagram(snapshot.data().instagram)
          setYoutube(snapshot.data().youtube)
        }

      })
      .catch((error) => {
        console.log("error ao registrar" + error);
      })

    }
    loadLinks();

  }, [])

  function handleSave(e){
    e.preventDefault();
    // alert("teste");

    // console.log(facebook)
    // console.log(instagram)
    // console.log(youtube)
    setDoc(doc(db, "social", "link"),{
      facebook: facebook,
      instagram: instagram,
      youtube: youtube
    })
    .then( () => {
      // setFacebook("")
      // setInstagram("")
      // setYoutube("")
      toast.success("Link Cadastrado com sucesso!");
    })
    .catch((error) => {
      toast.error("Ops erro ao salvar o link");
      console.log("error ao registrar" + error);
    })
  }

  return (

    <div className='admmin-container'>
      <Header />
      <Logo />
      <h1 className='title-social'>Redes social</h1>

      <form className='form'  onSubmit={handleSave}>
        <label>Link facebook </label>
        <Input
         placeholder="Digite a url..."
         value={facebook}
         onChange={ (e) => setFacebook(e.target.value) }
        />
        <label>Link Instagram </label>
        <Input
         placeholder="Digite a url..."
         value={instagram}
         onChange={ (e) => setInstagram(e.target.value) }
        />
        <label>Link Youtube</label>
        <Input
         placeholder="Digite a url..."
         value={youtube}
         onChange={ (e) => setYoutube(e.target.value) }
        />

        <button type="submit" className='btn-register'>
          Salvar links
          <MdAddLink size={24} color="#FFF" /> 
        </button>
      </form>

    </div>
  );
}