import { createContext, useState, useEffect } from 'react'
import {jwtDecode} from "jwt-decode";
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()

export default AuthContext; 

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens]=useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : ({access:null, refresh:null}))
    let [user, setUser]= useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading]= useState(true)
    const navigate = useNavigate()

    let loginUser = async(e )=> {
        e.preventDefault();
        let response = await fetch('https://apitrackey.fr/api/token/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'},
           body:JSON.stringify({'email':e.target.identifiant.value,'password':e.target.password.value})
        });
        let data = await response.json()
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/Homepage')
        }else{
            alert('Identifiant ou Mot de passe incorrect')
        }
    }

    let updateToken = async() => {
        let response = await fetch('https://apitrackey.fr/api/token/refresh/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'},
           body:JSON.stringify({'refresh':authTokens.refresh})
        });
        let data = await response.json()

        if(response.status === 200){

            setAuthTokens(prevTokens => ({
                ...prevTokens,
                access: data.access
            }));
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify({
                ...authTokens, 
                access: data.access
            }));
        }else{
            logoutUser()
        }
    }

    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    //Create Account
    let newAccount= async(e ) => {
        e.preventDefault();
        let response = await fetch('https://apitrackey.fr/api/user/create',{
        method:'POST', 
        headers:{
            'Content-Type':'application/json'},
             body:JSON.stringify({'Name':e.target.Nom.value,'email':e.target.identifiant.value,"Adresse":e.target.Adresse.value,'password':e.target.password.value, "confirm_password":e.target.confirmPassword.value})
        });
        if (response.status === 201){

            alert('Votre compte agence a bien été crée !')
            navigate('/login')
        }else{
            let data = await response.json()
            if (data && data.email && data.email.length > 0) {
                const errorMessage = data.email.join('\n');
                alert(errorMessage);}
        }
    }

    //OTP
    let sendOTP= async() =>{
        let response = await fetch('https://apitrackey.fr/api/otp',{
            method: 'GET', 
            headers:{
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${authTokens.access}`},
            });
        if (response.ok){

        }else if(response.status===304){
            
        }else{
            alert(`error : ${response}`)
        }
    }
    

    let contextData={
        authTokens:authTokens,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        newAccount:newAccount,
        sendOTP : sendOTP,
    }

    useEffect(()=> {
        let fourminutes = 1000 * 60 * 4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourminutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={{contextData}}>
            {children}
        </AuthContext.Provider>
    )
}
