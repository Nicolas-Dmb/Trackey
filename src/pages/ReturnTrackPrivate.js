import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";


function ReturnTrackPrivate({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Retour de clé</h1>)
    },[])
    const navigate = useNavigate()

    return(
        <div className='Main' style={{gap:"20px", marginTop:'20px'}}>
            <h1>Clé retournée avec succès !</h1>
            <button onClick={() => navigate('/Homepage')} style={{height:'50px', width:'100px'}}>Accueil</button>
        </div>
        )
}
export default ReturnTrackPrivate;
