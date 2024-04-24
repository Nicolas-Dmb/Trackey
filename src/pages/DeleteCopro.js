import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useNavigate, useLocation, useParams, Link} from "react-router-dom"
import PopupOTP from '../components/PopupOTP';


function DeleteCopro({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    const[popup, setPopup] = useState(true)
    //information du compte 
    const location = useLocation()
    const {copropriete} = location.state || {}
    const {IdCopropriete} = useParams()

    const navigate = useNavigate()
    
    useEffect(()=>{
        setTitle(<h1>Supprimer</h1>)
    },[])

   //Modifier les informations 
   let deleteCopropriete = async(e) =>{
    e.preventDefault()
    let response = await fetch(`https://apitrackey.fr/api/Copropriete/${IdCopropriete}`,{
        method:'DELETE',
        headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`}
        });
    if (response.status===204) {
        navigate('/Homepage')
    } else {
        alert("Une erreur s'est produite");
    }}

    return(popup?(
        <PopupOTP setPopup={setPopup} verif_mail={false}/>
    ):(
        <div className='Main'>
           <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<Link to={`/Copropriete/${IdCopropriete}`}>{copropriete.Numero}</Link> &gt;Supprimer Copro</p>
            <form onSubmit={deleteCopropriete}>
                <p style={{color:'red'}}>Etes-vous certain de vouloir supprimer la copropriété {copropriete.name} ?</p>
                <input type='submit' placeholder='Supprimer'/>
            </form>
        </div>)
    )
}

export default DeleteCopro;