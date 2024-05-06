import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom"


function NewMP({setTitle}){
    let navigate = useNavigate()
    let {token} = useParams()
    const[retour, setRetour] = useState()
    useEffect(()=>{
        setTitle(<h1></h1>)
    },[])
    
    let putPassword = async(e ) => {
        e.preventDefault()
        let response = await fetch(`https://www.apitrackey.fr/api/MPoublie/post`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'},
            body:JSON.stringify({'token':token,'new_password': e.target.new_password.value, "confirm_password":e.target.confirmPassword.value})
        }) 
        if(response.ok){
            alert('Midifications enregristrées avec succès')
            navigate('/login')
        }else if(response.status === 400){
            alert('Mot de passe de confirmation invalide')
        }else if(response.status === 408){
            setRetour("Erreur d'accès à cette page, veuillez réessayer")
        }
    }
    return(
        <div className='Main'>
            <form onSubmit={putPassword}>
                <h2>Changement du mot de passe</h2>
                <p style={{display: retour? 'block':'none', color:'red'}}><Link to='/MPoublie'>{retour}</Link></p>
                <label> Nouveau Mot de Passe :
                    <input type="password" name='new_password' placeholder='Nouveau mot de passe' required="required"/>
                </label>
                <label> Confirmez le mot de passe :
                    <input type="password" name='confirmPassword' placeholder='confirmez le nouveau mot de passe' required="required"/>
                </label>
                <input type='submit'/>
            </form>
        </div>)
}
export default NewMP;
