import React, {useState, useEffect} from 'react';


function MPoublie({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Mot de passe oublié</h1>)
    },[])
    const[retour, setRetour] = useState('')

    let sendEmail = async(e ) =>{
        e.preventDefault()
        let response = await fetch('https://apitrackey.fr/api/MPoublie/get',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'},
            body:JSON.stringify({'email':e.target.email.value})
        })
        if(response.ok){
            setRetour('mail envoyé avec succès')
        }else if(response.status === 401){
                setRetour("Cette adresse mail n'a jamais été vérifiée, nous ne pouvons pas vous transmettre de lien")
        }else if(response.status === 404){
                setRetour("Cette adresse mail n'est associée à aucun compte")
            }
    }
    return(
        <div className='Main'>
            <form onSubmit={sendEmail}>            
            <p style={{display: retour? 'block':'none', color:'red'}}>{retour}</p>
            <label>Veuillez saisir votre adresse Email
                <input type="email" name='email' placeholder='Email' required="required"/>
            </label>
            <input type='submit'/>
            </form>
        </div>)
}
export default MPoublie;