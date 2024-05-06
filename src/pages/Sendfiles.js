import React, {useContext,useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import {Link} from 'react-router-dom'


function CreateManyCopro({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Liste copropriétés</h1>)
    },[])

    const{contextData} = useContext(AuthContext)
    let{authTokens} = contextData; 
    let[errors, setErrors] = useState()

    let CreateCopro = async(e ) =>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('file', e.target.file.files[0]);
        let response = await fetch('https://www.apitrackey.fr/api/filecopro',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${authTokens.access}`},
            body:formData
            });
            const retour = await response.text()
            if(response.status === 200){
                setErrors('Fichier Excel traité avec succès.')
            }else if(response.status === 206){
                setErrors(retour)
            }else{
                setErrors("Une erreur s'est produite avec le fichier assurez-vous d'utiliser le model fourni")
            }
        }

    return(
        <div className='Main'>
            <div className='lien'>
                <p className='Navbar'><Link to='/Homepage'>Copropriete</Link> &gt;</p>
            </div>
            <h3 style={{margin:'2px'}}>Implémenter toutes vos copropriétés rapidement.</h3>
            <h3 style={{margin:'2px'}}>Pour cela vous devez compléter ce fichier</h3>
            <p><a href='/Liste_coproprietes.csv' download='liste_coproprietes.csv' type="text/csv">Liste copropriétés</a></p>
            <h3 style={{margin:'2px'}}>Puis l'envoyer via le questionnaire ci-dessous :</h3>
        <form style={{marginTop:'20px'}}onSubmit={CreateCopro}>
            <p style={{color:'red'}}>{errors}</p>
            <label>Liste des copropriétés :
                <input type="file" name='file' accept='.csv' required="required"/>
            </label>
            <input type='submit'/>
        </form>
    </div>
    )
}
export default CreateManyCopro;
