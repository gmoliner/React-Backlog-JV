import React, { useRef, useState } from "react"
import { Form, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import UseAuth from "../../providers/AuthProvider"

export default function ForgotPassword() {
  const emailRef = useRef()
  const authContext = UseAuth()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await authContext.resetPassword(emailRef.current.value)
      toast.success("Un mail avec les instructions nécessaires vous a été envoyé !", {position: toast.POSITION.TOP_RIGHT});
    } catch(err) {
      toast.error(`Problème lors de la réinitialisation du mot de passe : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Réinitialisation du mot de passe</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Valider
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Connexion</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Pas encore de compte ? <Link to="/signup">S'enregistrer</Link>
      </div>
    </>
  )
}