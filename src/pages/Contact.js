import React, {useEffect} from 'react';
import {Link} from "react-router-dom"


function Contact({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Contact</h1>)
    },[])

    return(
        <div className='Main'>
            <h2>Mon adresse Email : contact@trackey.fr</h2>
            <h3>Déjà un compte ?</h3>
            <div>Un problème avec votre compte ? Ou des suggestions d'améliorations ?</div>
            <div>Merci de me contacter par mail avec l'adresse Email de votre compte.</div>
            <h3>Pas de compte ?</h3>
            <div>Vous pouvez me transmettre votre demande par mail.</div>
        </div>
    )
}


export default Contact;
