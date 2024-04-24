import React, {useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {useParams, Link, useLocation, useNavigate} from "react-router-dom"

function CreatePrivateKey({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Nouvelle clé Privative</h1>)
    },[])
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{user}= contextData
    //id copro
    const {IdCopropriete} = useParams()
    //info copro
    const location = useLocation()
    const {copropriete} = location.state || {}

    const navigate = useNavigate()

    let postPrivateKey = async(e )=>{
        e.preventDefault()
        let formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('acces', e.target.acces.value);
        formData.append('image', e.target.image.files[0]);
        formData.append('id_Agency', user.user_id);
        formData.append('available', 'True');
        formData.append('id_Copro', IdCopropriete);
        let response = await fetch('https://apitrackey.fr/api/PrivateKey/',{
            method:'POST',
            headers:{
                'Authorization':`Bearer ${authTokens.access}`},
            body:formData
        });
        await response.json()
        if (response.ok) {
            navigate(`/Copropriete/${IdCopropriete}`)
        } else {
            alert(`Nom déjà utilisé`);
        }
    }

    return(
        <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<Link to={`/Copropriete/${IdCopropriete}`}>{copropriete.Numero}</Link></p>
            </div>
            <form onSubmit={postPrivateKey}>
                <label>Nom du propriétaire : 
                    <input type='text' id='name' name='name' placeholder='Nom'  required="required"/>
                </label>
                <label>Accès : 
                    <input type='text' id='acces' name='acces' placeholder='Accès'  required="required" maxLength="27"/>
                </label>
                <label>Photo des clés:
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg"  required="required"/>
                </label>
                <input type='submit' placeholder='Valider'/>
            </form>
        </div>
    )
}
export default CreatePrivateKey;