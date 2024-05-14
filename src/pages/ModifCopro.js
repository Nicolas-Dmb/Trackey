import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useLocation, useParams} from "react-router-dom";

function ModifCopro({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{user}= contextData
    let{logoutUser} = contextData
    //Copropriete
    const location = useLocation()
    const {copropriete} = location.state || {}
    const {IdCopropriete} = useParams()
    //returnRender
    const[firstRender, setfirstRender] = useState(true)
    //title
    useEffect(()=>{
        (setTitle(<h1>Modifier la copropriété</h1>))
    },[])

    let PutCopro = async(e ) =>{
        e.preventDefault()
        let response = await fetch(`https://www.apitrackey.fr/api/Copropriete/${IdCopropriete}/`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`},
            body:JSON.stringify({'Numero':e.target.numero.value,'name':e.target.name.value, 'adresse':e.target.adresse.value, 'id_Agency':user.user_id})
        })
        await response.json()
        if (response.ok){
            setfirstRender(false)
        }else if (response.status===401){
            logoutUser()
        }else{
            alert('Erreur: Numéro déjà utilisé');
        }
    }

    return(firstRender ? (
    <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<Link to={`/Copropriete/${IdCopropriete}`}>{copropriete.Numero}</Link> &gt;Modif Copro</p>
            </div>
            <form onSubmit={PutCopro}>
                <label>Numéro d'immeuble :
                    <input type="number" name='numero' defaultValue={copropriete.Numero} required="required"/>
                </label>
                <label>Nom :
                    <input type="text" name='name' defaultValue={copropriete.name} maxLength="50" required="required"/>
                </label>
                <label>Adresse :
                    <input type="text" name='adresse' defaultValue={copropriete.adresse} required="required"/>
                </label>
                <input type='submit'/>
            </form>
    </div>):
    (<h1>Modification enregistrée <Link to={`/Copropriete/${IdCopropriete}`}>Page de l'immeuble</Link></h1>)
    )
}
export default ModifCopro;
