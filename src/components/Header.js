import React, {useContext, useState, useEffect}from "react";
import AuthContext from'../context/AuthContext'
import {Link} from "react-router-dom"
import logo from "../static/logo.png"
import Account from "../static/account.svg"
import "../static/Header.css"

function Header({title}){
    const{contextData} = useContext(AuthContext)
    let{user} = contextData; 
    let{logoutUser} = contextData;
    //afficher ou non la liste popAccount
    const [display, setDisplay]=useState(false)
    const [listaccount, setListaccount]= useState('none')
    
    useEffect(() =>{
            if(display===true){
                setListaccount('flex')
            }else{
                let interval = setInterval(()=>{if (display===false){
                setListaccount('none')
            }},500)
            return () => clearInterval(interval)}
        },[display])
    
    
    
    return(user ?(
        <div className="Header">
            <Link to='/Homepage'><img src={logo} alt="logo"/></Link>
            <h1>{title}</h1>
            {user ? (
                <React.Fragment>
                    <img className='LogoAccount' onMouseOver={()=>setDisplay(true)} onMouseOut={()=>setDisplay(false)} src={Account} alt='account'/>
                        <div className="popAccount" style={{display:listaccount}} onMouseOver={()=>setDisplay(true)} onMouseOut={()=>setDisplay(false)} >
                            <Link to="/account">Mon compte</Link>
                            <Link to='/login' onClick={()=>{logoutUser(); setListaccount('none')}}>Logout</Link>
                            <Link to='/contact'>Contact</Link>
                            <Link to='/Donnees'>Protection des données</Link>
                        </div>
                </React.Fragment>
            ):(
                <Link to='/login'><img src={Account} alt='account'/></Link>
            )}
        </div>):(<div className="Header">
            <Link to='/'><img src={logo} alt="logo"/></Link>
            <h1>{title}</h1>
            {user ? (
                <React.Fragment>
                    <img className='LogoAccount' onMouseOver={()=>setDisplay(true)} onMouseOut={()=>setDisplay(false)} src={Account} alt='account'/>
                </React.Fragment>
            ):(
                <Link to='/login'><img src={Account} alt='account'/></Link>
            )}
        </div>)
    )
}
export default Header;