import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useParams, useLocation} from "react-router-dom";
import QRCode from 'qrcode';
import available from '../static/available.svg';
import unavailable from '../static/unavailable.svg';
import '../static/DetailKey.css';
import {downloadCommonQRCode ,downloadPrivateQRCode, downloadQRCode} from '../utils/QRcode.js'


function formatDate(dateString){
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'};
    return new Date(dateString).toLocaleString('fr-FR', options);
}
function DetailPrivateKey({setTitle}){
    //Auth
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    //Variable
    const {IdCopropriete, IdKey} = useParams()
    const[key, setKey] = useState([])
    const[tracks, setTracks] = useState([])
    //Info Copro
    const location = useLocation()
    const {copropriete} = location.state || {}

    let getKey = async() =>{
        let response = await fetch (`https://www.apitrackey.fr/api/PrivateKey/${IdKey}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`},
        });
        let data = await response.json()
        setKey(data)
        setTracks(data.trackprivate_set)
       }
    
    useEffect(()=>{
        getKey()
    },[])
    useEffect(()=>{
        //Title
        setTitle(<h1>{key.name}</h1>)
    },[key])

    return(
        <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<Link to={`/Copropriete/${IdCopropriete}`}>{copropriete.Numero}</Link> &gt;{key.name}</p>
                <div className='lien-right'>
                    <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/${IdKey}/Modif`} state={{key,copropriete}} className='modif'><button>Modifier la clé</button></Link>
                    <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/${IdKey}/Delete`} state={{key,copropriete}} className='delete'><button>Supprimer la clé</button></Link>
                </div>
            </div>
            <div className='firstFloor'>
                <img src={key.image} alt='image des clés'/>
                <p className='acces'>Accès : <span>{key.acces}</span></p>
                <p className='available'>Disponible : {key.available ? 
                    (<img src={available} alt='available'/>):
                    (<img src={unavailable} alt='unavailable'/>)}
                </p>
                <button onClick={()=>{downloadPrivateQRCode(copropriete, key)}}>Imprimer l'étiquette</button>
            </div>
            <ul className='tableaukey'>{tracks.map((track)=>(
                    <li className='Track' key={track.id}>
                        <div><span>Entreprise : {track.entreprise}</span><span>Départ : {formatDate(track.depart)} -  Retour : {track.retour!==null && formatDate(track.retour)}</span><span>Tel : {track.tel}</span></div>
                        <p>Remarques : {track.notes}</p>
                    </li>
            ))
                }
            </ul>
        </div>
    )
}
export default DetailPrivateKey;
