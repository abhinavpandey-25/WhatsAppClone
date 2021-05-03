import { Button } from '@material-ui/core'
import React from 'react'
import  './Login.css'
import {auth,provider} from './firebase'
import {useStateValue} from './StateProvider'
import {actionTypes} from './reducer'
function Login() {
    const [{},dispatch]=useStateValue();
    const signin=()=>{
        auth.signInWithPopup(provider)
        .then(res=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:res.user
            });
        })
        .catch(error=>alert(error.message))
    }
    return (
        <div className="login">
        <div className="login_container">
         <img style={{objectFit:'contain',height:'100px',marginBottom:'30px'}} src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"/>
            <div className="login_text">
                <h1>Login to WhatsApp</h1>
            </div>
            <Button onClick={signin} style={{backgroundColor:'#0a8d48',marginTop:'20px',color:'white'}} >Sign In With Google</Button>
        </div>
        </div>
    )
}

export default Login
