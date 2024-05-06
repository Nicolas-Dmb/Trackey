import React, {useContext, useState, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useLocation, useParams, useNavigate} from "react-router-dom";

function ModifPrivateKey({setTitle}){
    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let{user}= contextData
    //Copropriete
    const location = useLocation()
    const {key, copropriete} = location.state || {}
    const {IdCopropriete, IdKey} = useParams()
    //returnRender
    const[firstRender, setfirstRender] = useState(true)
    //title
    useEffect(()=>{
        (setTitle(<h1>Modifier</h1>))
    },[])

    let PutKey = async(e ) =>{
        e.preventDefault()
        let formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('acces', e.target.acces.value);
        if (e.target.image.files.length > 0) {
            formData.append('image', e.target.image.files[0]);
        }
        formData.append('id_Agency', user.user_id);
        formData.append('available', key.available);
        formData.append('qr_code', key.qr_code);
        formData.append('id_Copro', IdCopropriete);
        let response = await fetch(`https://www.apitrackey.fr/api/PrivateKey/${IdKey}/`,{
            method:'PATCH',
            headers:{
                'Authorization': `Bearer ${authTokens.access}`},
        body:formData
        })
        if (response.ok) {
            setfirstRender(false)
        } else {
            alert('Nom de clé déjà utilisée');
        }
    }

    return(firstRender ? (
    <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriétés</Link> &gt;<Link to={`/Copropriete/${IdCopropriete}`}>{copropriete.Numero}</Link> &gt; <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/${IdKey}`} state={{copropriete}}>{key.name}</Link> &gt; Modif clé </p>
            </div>
            <form onSubmit={PutKey}>
                <label>Nom du proprietaire :
                    <input type='text' id='name' name='name' defaultValue={key.name} required="required"/>
                </label>
                <label>Accès :
                    <input type='text' id='acces' name='acces' defaultValue={key.acces} required="required" maxLength="27"/>
                </label>
                <label>Photo des clés :
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg"/>
                    <img src={key.image} alt='image clé' style={{margin:'auto',width:'80%'}}/>
                </label>
                <input type='submit' placeholder='Valider'/>
            </form>
    </div>):(<h1>Modification enregistrée <Link to={`/Copropriete/${IdCopropriete}/PrivateKey/${IdKey}`} state={{copropriete}}>Page de la clé</Link></h1>)
    )
}
export default ModifPrivateKey;
