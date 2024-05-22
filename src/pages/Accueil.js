import React, {useEffect} from 'react';
import {Link} from "react-router-dom"
import '../static/Accueil.css'
import immeuble from '../static/immeuble.png'
import cle from '../static/clé.png'
import pret from '../static/Pret_cle.png'
function Accueil({setTitle}){
    useEffect(()=>{
        setTitle( <h1>Bienvenue sur Trackey ! 🗝️</h1>)
    },[])
    
    return (
    <div className='Main_accueil'>
        <h1>Présentation</h1>
        <div className='top'>
            <div className='left'>
                <p>Trackey offre une solution moderne et efficace pour la gestion des clés pour les syndics de copropriété. Grâce à ses fonctionnalités intuitives, cette plateforme simplifie le processus de suivi des clés. 
                Les utilisateurs bénéficient d'une vue d'ensemble claire, évitant ainsi les erreurs et les incompréhensions. 
                Son principal avantage réside dans notre capacité à offrir un gain de temps significatif par rapport aux méthodes traditionnelles.</p>
                <Link to='/signIn' name='lien'><button>Créez votre compte en quelques clics afin de tester ses fonctionnalités</button></Link>
            </div>
            <div className='right'>
                <div><img src={immeuble} alt='immeuble'/>Organisé</div>
                <div><img src={cle} alt='clé'/>Accessible</div>
                <div className='pret'><img src={pret} alt='Pret de clé'/>Efficace</div>
            </div>
        </div>
        <div className='bottom'>
        <iframe  src="https://www.youtube.com/embed/_mM35xYqasc?si=BYNEWKKS2BBL9m9O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div className='right'>
                <h2>Contact</h2>
                <p>Vous pouvez me transmettre vos questions par mail :</p>
                <p className='mail'>contact@trackey.fr</p>
            </div>
            <Link to={`/Donnees`} className='create_key'><button>Protection des données</button></Link>
        </div>
    </div>
    )
}
export default Accueil;
