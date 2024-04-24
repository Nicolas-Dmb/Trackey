import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext';

function PrivateRoute({children, ...rest}){
    const{contextData} = useContext(AuthContext)
    let{user} = contextData; 

    return(
        !user ? <Navigate to="/login" replace/>:React.cloneElement(children, { ...rest })
    )
}
export default PrivateRoute;