import React, {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams} from "react-router-dom";


function CreateTrackCommon({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Départ clé</h1>)
    },[])


    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    const {IdKey} = useParams()
    const navigate = useNavigate()

    let getTrack = async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/TrackC/update/${IdKey}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
            });
            if (response.status === 202){
                navigate(`/Copropriete/CommonKey/Returntrack/${IdKey}/`)
            }else if (response.status === 404){
                alert('Clé inconnue')
            }}

    useEffect(()=>{
        getTrack()
    },[])


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
            }else {
                alert('erreur dans la requête')
            }
    }

    return((<div className='Main'>
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
        </div>)
    )
}
export default CreateTrackCommon;
