import { useState, useEffect } from 'react';

import { Logo } from '../../components/Logo';

import { Input } from '../../components/Input';

import { MdAddLink }from "react-icons/md";
import { FiTrash2 }from "react-icons/fi";

import './style.css';
import { Header } from '../../components/Header';


import { db } from '../../services/firebase';
import { 
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
  } from 'firebase/firestore';

  import { toast } from 'react-toastify';

export default function Admin() {

  const [nameInput,setNameInput] = useState("");
  const [urlInput,setUrlInput] = useState("");
  const [backgroudnColorInput,setBackgroudnColorInput] = useState("#f1f1f1");
  const [textColorInput,setTextColorInput] = useState("#00000");

  const [links, setLinks] = useState([]);

  useEffect(()=>{

    const linksRef = collection(db, "links")
    const queryRef = query(linksRef, orderBy("created", "asc") )

    onSnapshot(queryRef, (snapshot)=>{

      let lista = [];

      snapshot.forEach( (doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        })
      })//forEach
      // console.log(lista);

      setLinks(lista);

    })//onSnapshot

  }, []) //useEffect

  function handleRegister(e){
    e.preventDefault();

    // alert("teste");

    if( nameInput === '' || urlInput === '' ){
      toast.error("Peencha todos os campos!");
      return;
    }

    addDoc( collection(db, "links" ), {
      name: nameInput,
      url: urlInput,
      bg: backgroudnColorInput,
      color: textColorInput,
      created: new Date(),
    })
    .then(()=>{
      setNameInput("")
      setUrlInput("")
      setBackgroudnColorInput("")
      setTextColorInput("")
      toast.success("Link Cadastrado com sucesso!");
    })
    .catch((error)=>{
      toast.error("Ops erro ao salvar o link");
      console.log("error ao registrar" + error);
    })

  }

  async function handelDeleteLink(id, name){
    // alert("ID do LINK " + name);
    // alert("ID do LINK " + id);
    const docRef = doc(db, "links", id)
    await deleteDoc(docRef)
    toast.info(`Item ${name} Deletado com sucesso`, {
      position: toast.POSITION.BOTTOM_LEFT
    });
  }


  return (
    <div className='admmin-container'>
      <Header />
      <Logo />
      <form className='form'  onSubmit={handleRegister}>
        <label>Nome do Link: </label>
        <Input
         placeholder="Nome do Link..."
         value={nameInput}
         onChange={ (e) => setNameInput(e.target.value) }
        />
        <label>URL: </label>
        <Input
         type="url"
         placeholder="Digite a url ..."
         value={urlInput}
         onChange={ (e) => setUrlInput(e.target.value) }
        />

        <section className='container-colors'>
          <div>
            <label className='label right'>Fundo do link</label>
            <input 
              type="color"
              value={backgroudnColorInput}
              onChange={ (e) => setBackgroudnColorInput(e.target.value) }
            />
          </div>

          <div>
            <label className='label right'>Cor do link</label>
            <input 
              type="color"
              value={textColorInput}
              onChange={ (e) => setTextColorInput(e.target.value) }
            />
          </div>
        </section>

        {
          nameInput !== '' &&

          <div className='preview'>
          <label>
            Veja como está ficando 👇
          </label>
          <article 
            className='list animate-pop'
            style={{marginTop:8, backgroundColor: backgroudnColorInput}}
          >
            <p
              style={{color: textColorInput}}
            >
              {nameInput}
            </p>
          </article>
        </div>
        }


       <button type="submit" className='btn-register'>
          Cadastrar
          <MdAddLink size={24} color="#FFF" /> 
        </button>

     </form>


    <h2 className='title'>
      MEU LILNKS
    </h2>


      {
        links.map( (item,index ) =>(
        <article
          key={index}
          className='list animate-pop'
          style={{ backgroundColor:item.bg , color:item.color}}
          >
            <p>{item.name}</p>
            <div>
              <button className='btn-delete' onClick={ () => handelDeleteLink(item.id, item.name) }>
                <FiTrash2 size={18} color="#FFF" />
              </button>
            </div>
          </article>
        ))
      }





    </div>
  );
}