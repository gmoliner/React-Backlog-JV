import React from "react"
import { Card, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import UseAuth from "../../providers/AuthProvider"

/**
 * Dashboard: fonction principale qui affiche les informations de l'utilisateur connecté
 */
export default function Dashboard() {
  const authContext = UseAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await authContext.logout()
      toast.success("Déconnexion réussie", {position: toast.POSITION.TOP_RIGHT});
      navigate("/login")
    } catch(err) {
      toast.error(`Problème lors de la déconnexion : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profil</h2>
          <p><strong>Email :</strong> {authContext.currentUser?.email ? authContext.currentUser.email : 'N.C'}</p>
          <p><strong>Nom d'utilisateur :</strong> {authContext.currentUser?.displayName}</p>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Mettre à jour
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
    </>
  )
}