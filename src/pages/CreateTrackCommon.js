import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams} from "react-router-dom";


function CreateTrackCommon({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{user} = contextData; 
    const {IdKey} = useParams()
    const navigate = useNavigate()
    let{logoutUser} = contextData;

    //Return 
    const[form, setForm]= useState(true)
    const[Error, SetError]= useState(false)
    const[Agence, setAgence] = useState()
    const[Adresse, setAdresse] = useState()

    useEffect(()=>{
        if (user && authTokens){
            setTitle(<h1>Départ clé</h1>)
            getTrack()
        }else{
            setTitle(<h1>Vous êtes déconnecté</h1>)
            //si user non identifié alors on récupère le nom de l'agence pour lui demander d'y déposer la clé
            setForm(false)
            getAgency()
        }
    },[])
    //Pour savoir si l'agence correspond à l'agence de la clé, savoir si c'est un retour ou un départ 
    let getTrack = async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/TrackC/update/${IdKey}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
            });
            if (response.status === 202){
                //retour de la clé 
                navigate(`/Copropriete/CommonKey/Returntrack/${IdKey}/`)
            }else if (response.status === 404){
                //La clé n'appartient par à l'agence. 
                setForm(false)
                alert("clé inconnue pour votre agence")
                let data = await response.json();
                setAdresse(data.Adresse);
                setAgence(data.Name);
            }else if (response.status === 400){
                //la clé n'a pas été trouvé dans le registre de toutes les clés de toutes les agences 
                SetError(true)
            }else if (response.status===401){
                logoutUser()
            }}
    
    let getAgency= async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/getCkey/${IdKey}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',}
        });
        if (response.status===202){
            let data = await response.json();
            setAdresse(data.Adresse);
            setAgence(data.Name);
        }else if (response.status===400){
            //la clé n'a pas été trouvé dans le registre de toutes les clés de toutes les agences 
            SetError(true)
        }
    }

    //Pour envoyer le nouveau track 
    let CreateTrack = async(e ) =>{
        e.preventDefault();
        let response = await fetch(`https://www.apitrackey.fr/api/TrackCommon/`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`},
            body:JSON.stringify({'id_key':IdKey,'entreprise':e.target.entreprise.value,'tel': e.target.tel.value,'notes':e.target.notes.value})
            });
            await response.json()
            if (response.ok){
                alert('Prêt de clé enregristrée')
                navigate('/Homepage')
            } else if (response.status===401){
                logoutUser()
            }else {
                alert('erreur dans la requête')
            }
    }

    return(Error ?(<p>La clé n'a pas pu être identifiée. Veuillez réessayer ou contacter le support : contact@trackey.fr</p>):
        (form?(<div className='Main'>
            <form onSubmit={CreateTrack}> 
                <label>Nom de l'entreprise :
                    <input type='text' id='entreprise' required="required" maxLength="30"/>
                </label>
                <label>Numéro de téléphone : 
                    <input type='number' id='tel' required="required"/>
                </label>
                <label>Remarques : 
                    <input type='text' id='notes'/>
                </label>
                <input type='submit' placeholder='Valider'/>
            </form>
        </div>):
        (<div className='Main'>
            <h1>La clé appartient à l'agence : {Agence}</h1>
            <p>Merci de les contacter ou de déposer la clé à l'adresse :</p>
            <h3>{Adresse}</h3>
            <p>Merci d'avance pour votre aide !</p>
        </div>
        )
    )
)
}
export default CreateTrackCommon;