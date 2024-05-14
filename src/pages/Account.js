import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useNavigate} from "react-router-dom"


function Account({setTitle}){

    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{logoutUser} = contextData;
    let navigate = useNavigate()

    const [account, setAccount] = useState()
    useEffect(()=>{
        setTitle(<h1>Compte</h1>)
        getAccount()
    },[])

    //récupérer les infos du compte
    let getAccount = async() =>{
        let response = await fetch(`https://www.apitrackey.fr/api/user/account`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
            });
            let data = await response.json()
            if (response.ok) {
                setAccount(data); 
            } else if (response.status === 401){
                logoutUser()
            }else {
                alert(`erreur:${response.error}`)
            }}


    return(account ? (
        <div className='Main'>
            <form>
                <label>Identifiant(Email):
                    <input type="text" name='email' value={account.email}/>
                </label>
                <label>Nom de l'agence:
                    <input type="text" name='Name' value={account.Name}/>
                </label>
                <label>Adresse de l'agence :
                    <input type="text" name='Adresse' value={account.Adresse}/>
                </label>
                <input type='submit' value='Modifier' onClick={() => navigate('/account/modif', { state: {account} })}/>
                <input type='submit' value='Modifier le Mot de passe' onClick={() => navigate('/account/password')}/>
                <input type='submit' value='Supprimer le compte' onClick={() => navigate('/account/delete', { state: {account} })}/>
            </form> 
        </div>) : (<h1>Chargement...</h1>)
    )
}


export default Account;
