import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const gitHubAuthProvider = new GithubAuthProvider()

    const createUser = (email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    
    const login = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = (email,password) =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    
    const gitHubLogin = (email,password) =>{
        setLoading(true)
        return signInWithRedirect(auth, gitHubAuthProvider)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    const signOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            console.log(`token is : ${localStorage.getItem('access-token')}`)
                        }
                    })
                    .catch(error => console.log(error))
            }
            else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)

        })
        return () => {
            return subscriber()
        }
    }, [axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        gitHubLogin,
        updateUserProfile,
        signOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;