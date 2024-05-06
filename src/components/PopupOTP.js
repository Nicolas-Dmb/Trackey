import React, {useContext, useEffect}from "react";
import AuthContext from'../context/AuthContext'
import '../static/PopupOTP.css'



function PopupOTP({setPopup, verif_mail}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{sendOTP} = contextData; 
    
    useEffect(() =>{
        sendOTP()
    },[])

    let verifyOTP = async(e ) =>{
        e.preventDefault()
        let response = await fetch('https://www.apitrackey.fr/api/otp/verify',{
            method:'POST',
            headers:{
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${authTokens.access}`},
                body:JSON.stringify({'otp':e.target.otp_key.value})
            });
        if(response.status === 200){
            //on annule le popup
            setPopup(false)
        }else if(response.status === 408){
            sendOTP()
            alert('Temps écoulé, mail renvoyé');
        }else{
            const data = await response.json();
            alert(data.error);
        }
    }
    return(
            <form onSubmit={verifyOTP}>
                {verif_mail?(<p>Avant de continuer veuillez vérifier votre adresse Email</p>):(<h1>Page sécurisée</h1>)}
                <label>Veuillez récupérer le code reçu par Email</label>
                <label> Code :
                    <input type='number' name='otp_key'/>
                </label>
                <input type='submit'/>
            </form>
    )
}
export default PopupOTP;
