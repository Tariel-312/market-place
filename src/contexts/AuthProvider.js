import React, { useEffect, useReducer } from 'react';
import {GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../firebase'

export const AuthContext = React.createContext()

const INIT_STATE = {
    user: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CHECK_USER":
            return {...state, user: action.payload}
        default:
            return state;
    }
};

const AuthProvider = (props) => {
    const [state,dispatch] = useReducer(reducer,INIT_STATE)

    // ! AUTH WITH GOOGLE
    const googleProvider = new GoogleAuthProvider()

    const authWithgoogle = async () =>{
        try{
            const response = await signInWithPopup(auth, googleProvider)
            console.log(response)
        }catch(error) {
            console.log(error)
        }
    }

    // ! Проверка на то что пользователь в системе или нет

    const checkUser = () =>{
        onAuthStateChanged(auth, (user)=>{
            let action = {
                type: 'CHECK_USER',
                payload: user,
            }
            dispatch(action)
        })
    }
    useEffect(()=>{
        checkUser()
    },[])

    // ! Выйти из системы

    const logout = async ()=>{
        try{
            await signOut(auth)
        }catch(error) {
            console.log(error)
        }
    }

    return  <AuthContext.Provider value={{
        authWithgoogle: authWithgoogle, 
        logout:logout, 
        user:state.user}}
         >
        {props.children}
        </AuthContext.Provider>
    

};

export default AuthProvider;