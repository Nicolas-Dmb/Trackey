import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigate, useLocation} from "react-router-dom"
import PopupOTP from '../components/PopupOTP';


function DeleteAccount({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{logoutUser} = contextData;
    const[popup, setPopup] = useState(true)
    //information du compte 
    const location = useLocation()
    const {account} = location.state || {}

    const navigate = useNavigate()
    
    useEffect(()=>{
        setTitle(<h1>Supprimer {account.Name}</h1>)
    },[])

   //Modifier les informations 
   let deleteAccount = async(e) =>{
        e.preventDefault()
        let response = await fetch('https://apitrackey.fr/api/user/delete',{
            method:'DELETE',
            headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${authTokens.access}`}
            });
        if (response.status===204){
            logoutUser()
            navigate(`/`)
        } else if(response.status === 403){
            alert("code du mail invalide");
        } else if(response.status === 408){
            alert("Utilisateur non identifié")
        }else{
            alert("Demande invalide")
        }}

    return(popup?(
        <PopupOTP setPopup={setPopup} verif_mail={false}/>
    ):(
        <div className='Main'>
            <form onSubmit={deleteAccount}>
                <p style={{color:'red'}}>Etes-vous certain de vouloir supprimer le compte {account.Name} ?</p>
                <p>Toutes vos données seront supprimées</p>
                <input type='submit' placeholder='Supprimer'/>
            </form>
        </div>)
    )
}

export default DeleteAccount;