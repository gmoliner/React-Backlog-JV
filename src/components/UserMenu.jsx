import { NavDropdown } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import user_loggedIn from '../assets/user_loggedin.png'
import user_loggedOut from '../assets/user_loggedout.png'
import UseAuth from "../providers/AuthProvider"


function UserMenu() {
  const navigate = useNavigate()
  const authContext = UseAuth()
  let userOptions
  let userIcon

  // déconnexion
  async function handleLogout(e) {
    e.preventDefault()

    try {
      await authContext.logout()
      toast.success("Déconnexion réussie", {position: toast.POSITION.TOP_RIGHT});
      navigate("/login")
    } catch(err) {
      toast.error(`Problème lors de la déconnexion : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    }
  }

  // Affichage des menus selon si l'utilisateur est connecté ou non
  if (authContext.currentUser) {
    userIcon = user_loggedIn

    userOptions = (
      <>
      <NavDropdown.Item href="/dashboard">
        Voir profil
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>
        Déconnexion
      </NavDropdown.Item>
      </>
    )
  } else {
    userIcon = user_loggedOut

    userOptions = (
      <>
        <NavDropdown.Item href="/login">
          Connexion
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/signup">
          Créer compte
        </NavDropdown.Item>
      </>
    )
  }
  
  return (
    // title={<img alt="" src={userIcon} width="40" height="40"/>} 
    <NavDropdown 
      // title={authContext.currentUser ? authContext.currentUser.displayName : 'Profil'} 
      title={
        <>
          {authContext.currentUser ? authContext.currentUser.displayName : 'Profil'}
          {' '}
          {/* <img alt="" src={userIcon} width="40" height="40"/> */}
        </>
      } 
      id="basic-nav-dropdown user_dropdown">
      {userOptions}
    </NavDropdown>
  )
}

export default UserMenu