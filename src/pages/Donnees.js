import React, {useEffect} from 'react';


function Donnees({setTitle}){
    useEffect(()=>{
        setTitle(<h1>Politique de Confidentialité</h1>)
    },[])

    return(
        <div className='Main'>            
            <h3 style={{ textAlign: 'center' }}>Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons, et sécurisons vos informations lorsque vous utilisez nos services.</h3>

            <h2>1. Collecte des Données Personnelles</h2>
            <ul style={{ textAlign: 'center', margin:'5px'}}>Nous collectons les données suivantes :
                <li>- Nom des agences</li>
                <li>- Adresse email</li>
                <li>- Adresse de l’agence</li>
                <li>- Noms et adresses des copropriétés gérées.</li>
                <li>- Noms de certains copropriétaires.</li>
                <li>- Numéros de téléphone des entreprises ou particuliers lors d'un emprunt de clé</li>
            </ul>

            <h2>2. Utilisation des Données</h2>
            <ul style={{ textAlign: 'center', margin:'5px'}}>Vos données sont utilisées pour :
                <li>- Gérer votre compte utilisateur</li>
                <li>- Communiquer avec vous</li>
            </ul>
            
            <h2>3. Partage des Données</h2>
            <p>Nous ne partageons vos données avec des tiers que lorsque la loi nous y oblige.</p>
            
            <h2>4. Sécurité des Données</h2>
            <p style={{ textAlign: 'center', margin:'5px'}}>Nous prenons des mesures de sécurité strictes pour protéger vos données contre l'accès non autorisé, l'altération, la divulgation ou la destruction.</p>
            <p style={{ textAlign: 'center', margin:'5px'}}> Ces mesures incluent des protocoles technologiques et des procédures de sécurité.</p>
            
            <h2>5. Vos Droits</h2>
            <ul style={{ textAlign: 'center', margin:'5px'}}>Conformément au RGPD, vous avez le droit de :
                <li>- Accéder à vos données personnelles</li>
                <li>- Demander la correction de vos données si elles sont inexactes</li>
                <li>- Demander la suppression de vos données</li>
                <li>- Limiter le traitement de vos données</li>
                <li>- Vous opposer au traitement de vos données</li>
                <li>- La portabilité des données</li>
                <li>- Pour exercer ces droits, veuillez nous contacter à contact@trackey.fr</li>
            </ul>

            <h2>6. Modifications de la Politique de Confidentialité</h2>
            <p>Nous pouvons modifier cette politique de confidentialité à tout moment. Les modifications seront effectives dès leur publication sur notre site.</p>
            
            <h3 style={{ textAlign: 'center', padding:50}}>Contactez-nous pour toute question ou préoccupation concernant notre politique de confidentialité, veuillez nous contacter à contact@trackey.fr.</h3>
        </div>
    )
}
export default Donnees;