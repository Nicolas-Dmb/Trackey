import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigate, useLocation} from "react-router-dom"
import PopupOTP from '../components/PopupOTP';
import {ValidEmail, ValidMP, ValidMPconf} from '../components/ValidData';


function ChangeAccount({setTitle}){

    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    const[popup, setPopup] = useState(true)
    //information du compte 
    const location = useLocation()
    const {account} = location.state || {}

    const navigate = useNavigate()
    
    useEffect(()=>{
        setTitle(<h1>Changement information du compte</h1>)
    },[])

    //Données de validation
    const[email, setEmail] = useState(account.email)
    const[validemail, setValidEmail] = useState(false)
    //Submit
    const handleSubmit= (e) =>{
        e.preventDefault();
        if (validemail){
            patchAccount(e)
        }else{
            alert('Données transmises invalides.')
        }
    }

   //Modifier les informations 
   let patchAccount = async(e ) => {
    e.preventDefault();
    let response = await fetch('https://www.apitrackey.fr/api/user/update',{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authTokens.access}`},
        body: JSON.stringify({
            'Name': e.target.Name.value,
            'Adresse': e.target.Adresse.value,
            'email': e.target.email.value
        })
    });
    if(response.ok){
        navigate('/account')
    }else if(response.status === 408){
        //si otp invalide
        setPopup(true)
    }else if(response.status === 406){
        alert('Adresse mail déjà utilisée')
    }else{
        alert(`${response.status}:Une erreur s'est produite`)
    }
}
    return(popup?(
        <PopupOTP setPopup={setPopup} verif_mail={false}/>
    ):(
        <div className='Main'>
            <form onSubmit={handleSubmit}>
            <p style={{color:'red'}}>Attention, veillez à transmettre une adresse Email valide</p>
                <label>Identifiant(Email):
                    <input type="text" name='email' required="required" value={email} onChange={(e) => setEmail(e.target.value) }/>
                    <ValidEmail setValidEmail={setValidEmail} valeur={email}/>
                </label>
                <label>Nom de l'agence:
                    <input type="text" name='Name' defaultValue={account.Name} required="required"/>
                </label>
                <label>Adresse de l'agence :
                    <input type="text" name='Adresse' defaultValue={account.Adresse}  required="required"/>
                </label>
                <input type='submit'/>
            </form>
        </div>)
    )
}


export default ChangeAccount;
