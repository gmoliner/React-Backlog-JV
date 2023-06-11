import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider  } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthContext = React.createContext()

/**
 * AuthProvider: permet de gérer le contexte lié à l'authentification
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  /**
   * signup : fonction permettant d'enregistrer un nouveau profil
   * @param {*} param0 
   * @returns 
   */
  function signup({email, password, name}) {
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      return result.user.updateProfile({
        displayName: name
      })
    }).catch(function(error) {
      console.log(error)
      throw error
    })
  }

  /**
   * login: fonction permettant de se connecter
   * @param {*} email 
   * @param {*} password 
   * @returns 
   */
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * logout: fonction permettant de se déconnecter
   * @returns 
   */
  function logout() {
    return auth.signOut()
  }

  /**
   * resetPassword: fonction permettant d'envoyer un mail de réinitilisation du password
   * @param {*} email 
   * @returns 
   */
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  /**
   * updateEmail: fonction permettant de mettre à jour son mail
   * @param {*} email 
   * @returns 
   */
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  /**
   * updatePassword: fonction permettant de mettre à jour son password
   * @param {*} password 
   * @returns 
   */
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  /**
   * updateName: fonction permettant de mettre à jour son nom d'utilisateur
   * @param {*} displayName 
   * @returns 
   */
  function updateName(displayName) {
    return currentUser.updateProfile({displayName: displayName})
  }

  /**
   * logInGoogle: connexion firebase avec Google
   * @returns 
   */
  function logInGoogle() {
    return signInWithPopup(auth, googleProvider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }

  /**
   * logInGithub: connexion firebase avec Github
   * @returns 
   */
  function logInGithub() {
    return signInWithPopup(auth, githubProvider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // IdP data available using getAdditionalUserInfo(result)
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  }  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setLoading(false)
      setCurrentUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider 
      value={{
        currentUser,
        loading,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateName,
        logInGoogle,
        logInGithub
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}