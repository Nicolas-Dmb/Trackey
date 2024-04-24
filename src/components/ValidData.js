import React from "react";

function ValidEmail({setValidEmail, valeur}){
    const Email = valeur
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = false
    if (regex.test(Email)){
        setValidEmail(true)
        valid = true
    }else{
        setValidEmail(false)
        valid = false
    }
    return(!valid &&
        (<p style={{color:'red', fontSize:'0.8em'}}>Adresse mail invalide</p>)
    )
}

function ValidMP({setValidMP, valeur}){
    const MP = valeur
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;;
    let valid = false
    if (regex.test(MP)){
        setValidMP(true)
        valid = true
    }else{
        setValidMP(false)
        valid = false
    }
    return(!valid && 
        (
        <ul style={{color:'red', padding:'0px', fontSize:'0.8em'}}>
            <li style={{color:'red', fontSize:'0.8em'}}>8 caractères</li>
            <li style={{color:'red', fontSize:'0.8em'}}>1 majuscule</li>
            <li style={{color:'red', fontSize:'0.8em'}}>1 minuscule</li>
            <li style={{color:'red', fontSize:'0.8em'}}>1 chiffre</li>
            <li style={{color:'red', fontSize:'0.8em'}}>1 caractère spécial</li>
        </ul>)
    )
}

function ValidMPconf({setValidConfirmMP, valeurMP,valeur}){
    const MPconfirm = valeur
    const MP = valeurMP
    let valid = false
    if (MPconfirm === MP){
        setValidConfirmMP(true)
        valid = true
    }else{
        setValidConfirmMP(false)
        valid = false
    }
    return(!valid && 
        (<p style={{color:'red', fontSize:'0.8em'}}>Invalide</p>)
    )
}
export { ValidEmail, ValidMP, ValidMPconf };
