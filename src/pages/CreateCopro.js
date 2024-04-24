import React, {useContext,useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigate, Link} from 'react-router-dom'

function CreateCopro({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Nouvelle copropriété</h1>)
    },[])

    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{user}= contextData

    const navigate = useNavigate()

    let CreateCopro = async(e ) =>{
        e.preventDefault();
        let response = await fetch('https://apitrackey.fr/api/Copropriete/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`},
            body:JSON.stringify({'Numero':e.target.numero.value,'name':e.target.name.value, 'adresse':e.target.adresse.value, 'id_Agency':user.user_id})
            });
            await response.json()
            if (response.ok) {
                alert("La copropriete a bien été créée ! 🏢")
                navigate('/Homepage')
            } else {
                alert('Erreur: Numéro déjà utilisé');
            }
        }

    return(
        <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<span> Création Copro</span></p>
            </div>
        <form onSubmit={CreateCopro}>
            <label>Numéro d'immeuble :
                <input type="number" name='numero' placeholder='Numéro' required="required"/>
            </label>
            <label>Nom :
                <input type="text" name='name' placeholder='Nom' required="required" maxLength="50"/>
            </label>
            <label>Adresse :
                <input type="text" name='adresse' placeholder='adresse' required="required"/>
            </label>
            <input type='submit'/>
        </form>
    </div>
    )
}
export default CreateCopro;


