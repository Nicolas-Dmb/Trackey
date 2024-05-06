import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import "../static/HomePage.css";
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom"
import PopupOTP from '../components/PopupOTP';
import SearchBar from '../components/SearchBar';

function HomePage({setTitle}){
    useEffect(()=>{
        getCopro()
        getUser()
    },[])

    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    const[copros, setCopros]=useState([])
    const[coproprietes, setCoproprietes] = useState([]) //les valeurs de copros sont stockées pour les récupérers si copros est changés et qu'on veut la reinitialisé
    const[popup, setPopup] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if (coproprietes){
            setTitle(<h1>Copropriétés</h1>)
        }else{
            setTitle(<h1>Bienvenue sur Trackey ! 🗝️</h1>)
        }
    },[coproprietes])

    let getCopro = async() =>{
        let response = await fetch('https://www.apitrackey.fr/api/Copropriete/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
            });
            let data = await response.json()
            if (Array.isArray(data)) {
                setCopros(data); 
                setCoproprietes(data);
            } else {
                alert("Créer vos premières copropriétés avec le bouton 'Plus'👇");
            }}
    let getUser = async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/user/account`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
            });
            let data = await response.json()
            if (data.email_verif === false) {
                setPopup(true)
            } 
    }
    return(popup? (<PopupOTP setPopup={setPopup} verif_mail={true}/>)
        :(
        <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Coproprietes</Link> &gt;<span></span></p>
                <SearchBar setCopros={setCopros} coproprietes={coproprietes}/>
                <div className='lien-right'>
                    <Link to={'/Copropriete/Create'} className='create'><button>Nouvelle copropriété</button></Link>
                    <Link to={'/listeCoproprietes/Create'} className='create'><button>Liste copropriétés</button></Link>
                </div>
            </div>   
            <ul>{copros.map((copro)=>(
                    <Link to={`/Copropriete/${copro.id}`} key={copro.id}><li className='liste'>
                        <span>{copro.Numero}</span><span>{copro.name}</span><span className='adresse'>{copro.adresse}</span>
                        </li></Link>
                    ))}
            </ul>
        </div>)
    )
}


export default HomePage;


