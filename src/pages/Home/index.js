import { useState, useEffect } from 'react';

import Social from '../../components/Social';
import './home.css';

import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";

import { db } from '../../services/firebase';
import { 
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
  } from 'firebase/firestore';


export default function Home() {

  const [socialLinks ,setSocialLinks] = useState({});

  const [links, setLinks] = useState([]);

  useEffect( ()=>{

    function loadLinks(){
      // alert("teste");

      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc") )

      getDocs(queryRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
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
      

      })
      .catch((error)=>{
        console.log("error ao registrar" + error);
      })
    }// final funcão

    loadLinks();

  }, [])



  useEffect( ()=>{

    function loadSocialLinks(){

      // alert("teste");

      const docRef = doc(db, "social", "link")

      getDoc(docRef)
      .then( (snapshot)=>{
        // console.log(snapshot.data());
        if(snapshot.data() !== undefined){
          setSocialLinks({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            youtube: snapshot.data().youtube
          })

        }

      })
      .catch((error)=>{
        console.log("error ao registrar" + error);
      })


    }// final funcão

    loadSocialLinks();

  }, [])

  return (
    <div className="home-container">
      <h1>Home</h1>
      <span>Veja meus links 👇</span>
      <main  className="links">

      {
        links.map( (item,index ) =>(
        <section 
        key={index}
        style={{ backgroundColor:item.bg }}
        className="link-area animate-pop">
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <p className="link-text" style={{color:item.color}}> 
              {item.name}
            </p>
          </a>
        </section>
        ))
      }


      {
        links.length !== 0 && Object.keys(socialLinks).length > 0 && (

        <footer>
          <Social url={socialLinks?.facebook}>
            <FaFacebook size={35} color="#FFF" />
          </Social>
          <Social url={socialLinks?.youtube}>
            <FaYoutube size={35} color="#FFF" />
          </Social>
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color="#FFF" />
          </Social>
        </footer>
        )
      }

      </main>
    </div>
  );
}