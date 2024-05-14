import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useParams} from "react-router-dom";
import '../static/DetailCopro.css';
import {downloadCommonQRCode ,downloadPrivateQRCode, downloadQRCode} from '../utils/QRcode.js'

function DetailCopro({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{logoutUser} = contextData;
    //On récupère la copropriété clické par l'user 
    const {IdCopropriete} = useParams()
    const[copropriete, setCopropriete] = useState([])
    const[commonkeys, setCommonkeys] = useState([])
    const[privatekeys, setPrivatekeys] = useState([])

    let getCopropriete = async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/Copropriete/${IdCopropriete}`,{
            method:'GET',
            headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.access}`}
            });
        if (response.ok) {
            let data = await response.json()
            setCopropriete(data);
            setCommonkeys(data.commonkey_set || []);
            setPrivatekeys(data.privatekey_set || []);
        } else if (response.status===401){
            logoutUser()
        }else {
            alert("Créer vos premières clés");
        }}

    useEffect(()=> {
        getCopropriete()
    },[])

    useEffect(()=> {
        //titre header
        setTitle(<h1>{copropriete.name}</h1>)
    },[copropriete])
   
    return(
        <div className='Main'>
            <div className='Partie'>
                <div className='lien'>
                    <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;{copropriete.Numero}</p>
                    <div className='lien-right'>
                        <Link to={`/Copropriete/${IdCopropriete}/Modif`} state={{copropriete}} className='modif'><button>Modifier la copropriété</button></Link>
                        <Link to={`/Copropriete/${IdCopropriete}/Delete`} state={{copropriete}} className='delete'><button>Supprimer la copropriété</button></Link>
                        <Link  onClick={()=>downloadQRCode(copropriete, commonkeys, privatekeys)} className='delete'><button>Liste étiquettes</button></Link>
                    </div>
                </div>
                <div className='clé_commune'>
                    <h1>Clés partie commune:</h1>
                    <Link to={`/Copropriete/${IdCopropriete}/CommonKey/Create`} state={{copropriete}} className='create_key'><button>Nouvelle clé commune</button></Link>
                </div>
                <ul className='commonkey'>
                {commonkeys.map((commonkey)=>(
                    <Link to={`/Copropriete/${IdCopropriete}/CommonKey/${commonkey.id}`} state={{copropriete}} key={commonkey.id}><li className='liste'><span>{commonkey.name}</span><span>{commonkey.acces}</span>{commonkey.available ? (<span className='dispo'>Disponible</span>):(<span className='dispo'>Indisponible</span>)}</li></Link>
                ))
                }
                </ul>
            </div>
            <div className='Partie'>
                <div className='clé_privative'>
                    <h1>Clés partie privative:</h1>
                    <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/Create`} state={{copropriete}} className='create_key'><button>Nouvelle clé privative</button></Link>
                </div>
                <ul className='privatekey'>
                {privatekeys.map((privatekey)=>(
                    <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/${privatekey.id}`} state={{copropriete}} key={privatekey.id}><li className='liste'><span>{privatekey.name}</span><span>{privatekey.acces}</span>{privatekey.available ? (<span className='dispo'>Disponible</span>):(<span className='dispo'>Indisponible</span>)}</li></Link>
                ))
                }
                </ul>
            </div>
        </div>
    )
}
export default DetailCopro;

