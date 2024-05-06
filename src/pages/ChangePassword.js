import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import PopupOTP from '../components/PopupOTP';
import {useNavigate} from "react-router-dom";
import {ValidEmail, ValidMP, ValidMPconf} from '../components/ValidData';


function ChangePassword({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    //state pour savoir si on met ou non le popup
    const[popup, setPopup] = useState(true)
    
    let navigate = useNavigate()

    useEffect(()=>{
        setTitle(<h1>Changement Mot de passe</h1>)
    },[])

    //Données de validation
    const[Mp, setMP] = useState('')
    const[confirmMp, setConfirmMP] = useState('')
    const[validMp, setValidMP] = useState(false)
    const[validconfirmMp, setValidConfirmMP] = useState(false)
    //Submit
    const handleSubmit= (e) =>{
        e.preventDefault();
        if (validMp && validconfirmMp){
            putPassword(e)
        }else{
            alert('Données transmises invalides.')
        }
    }
    
    let putPassword = async(e ) => {
        e.preventDefault()
        let response = await fetch(`https://www.apitrackey.fr/api/user/password`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`},
            body:JSON.stringify({'old_password':e.target.password.value,'new_password': e.target.new_password.value, "confirm_password":e.target.confirmPassword.value})
        }) 
        if(response.ok){
            alert('Modifications enregristrées avec succès')
            navigate('/account')
        }else if(response.status === 408){
            setPopup(true)
        }else{
            let responseData = await response.json();
            if (responseData.old_password) {
                    alert(responseData.old_password);
                }
            if (responseData.non_field_errors) {
                    alert(responseData.non_field_errors);
                }}
        }
    return(popup ? (
            <PopupOTP setPopup={setPopup} verif_mail={false}/>
        ):(
        <div className='Main'>
            <form onSubmit={handleSubmit}>
                <label> Mot de Passe actuel :
                    <input type="password" name='password' placeholder='Mot de passe actuel'/>
                </label>
                <label> Nouveau Mot de Passe :
                    <input type="password" name='new_password' placeholder='Nouveau mot de passe' required="required" value={Mp} onChange={(e) => setMP(e.target.value)}/>
                    <ValidMP setValidMP={setValidMP} valeur={Mp}/>
                </label>
                <label> Confirmez le mot de passe :
                    <input type="password" name='confirmPassword' placeholder='confirmez le nouveau mot de passe' required="required" value={confirmMp} onChange={(e) => setConfirmMP(e.target.value)}/>
                    <ValidMPconf setValidConfirmMP={setValidConfirmMP} valeurMP={Mp} valeur={confirmMp}/>
                </label>
                <input type='submit'/>
            </form>
        </div>)
    )
}


export default ChangePassword;
