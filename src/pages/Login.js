import React, {useContext, useEffect} from 'react';
import AuthContext from'../context/AuthContext'
import {Link} from "react-router-dom"

function Login({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Connexion</h1>)
    },[])
    const{contextData} = useContext(AuthContext)
    let{loginUser} = contextData; 
    
    return (
    <div className='Main'>
        <form onSubmit={loginUser}>
            <label>Identifiant(Email):
                <input type="text" name='identifiant' placeholder='Identifiant(Email)'/>
            </label>
            <label>Mot de Passe :
                <input type="password" name='password' placeholder='Mot de passe'/>
                <Link to='/MPoublie'>mot de passe oublié</Link>
            </label>
            <input type='submit' value='connexion'/>
            <label><Link to='/signIn'>Créer un compte</Link></label>
        </form>
    </div>
    )
}
export default Login;
