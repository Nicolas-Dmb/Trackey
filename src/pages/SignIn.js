import React, {useContext, useEffect, useState} from 'react';
import AuthContext from'../context/AuthContext'
import {Link} from "react-router-dom"
import {ValidEmail, ValidMP, ValidMPconf} from '../components/ValidData';

function SignIn({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Créer un compte</h1>)
    },[])
    const{contextData} = useContext(AuthContext)
    let{newAccount} = contextData;

    //Données de validation
    const[email, setEmail] = useState('')
    const[Mp, setMP] = useState('')
    const[confirmMp, setConfirmMP] = useState('')
    const[validemail, setValidEmail] = useState(false)
    const[validMp, setValidMP] = useState(false)
    const[validconfirmMp, setValidConfirmMP] = useState(false)
    //Submit
    const handleSubmit= (e) =>{
        e.preventDefault();
        if (validemail && validMp && validconfirmMp){
            newAccount(e)
        }else{
            alert('Données transmises invalides.')
        }
    }

    return (
        <div className='Main'>
        <form onSubmit={handleSubmit} style={{margin:'5%'}}>
            <label>Identifiant(Email):
                <input type="text" name='identifiant' placeholder='trackey@gmail.com' required="required" maxLength="100" value={email} onChange={(e) => setEmail(e.target.value) }/>
                <ValidEmail setValidEmail={setValidEmail} valeur={email}/>
            </label>
            <label>Nom de l'entreprise:
                <input type="text" name='Nom' placeholder="Nom de l'entreprise" required="required" maxLength="100"/>
            </label>
            <label>Adresse de l'agence:
                <input type="text" name='Adresse' placeholder='1 Rue Trackey, 75001 Paris' required="required" maxLength="100"/>
            </label>
            <label>Mot de Passe :
                <input type="password" name='password' placeholder='Mot de passe' required="required" value={Mp} onChange={(e) => setMP(e.target.value)}/>
                <ValidMP setValidMP={setValidMP} valeur={Mp}/>
            </label>
            <label>Confirmez le mot de passe :
                <input type="password" name='confirmPassword' placeholder='confirmez le mot de passe' required="required" value={confirmMp} onChange={(e) => setConfirmMP(e.target.value)}/>
                <ValidMPconf setValidConfirmMP={setValidConfirmMP} valeurMP={Mp} valeur={confirmMp}/>
            </label>
            <input type='submit'/>
            <label><Link to='/login'>Se connecter</Link></label>
        </form>
    </div>
    )
}
export default SignIn;
