import React, { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import UseAuth from "../../providers/AuthProvider"
import Loading from '../../components/Loading/Loading'

/**
 * Login: fonction principale permettant de se connecter
 */
export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const authContext = UseAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation();

  // envoi du formulaire
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      await authContext.login(emailRef.current.value, passwordRef.current.value)
      toast.success("Connexion réussie !", {position: toast.POSITION.TOP_RIGHT});

      // redirection vers la dernière destination connue (si passée dans les params), dashboard par défaut
      navigate(state?.path || "/dashboard");
    } catch(err) {
      toast.error(`Erreur lors de la connexion : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    }

    setLoading(false)
  }

  // connexion avec Google
  const handleClickGoogle = (event) => {
    event.preventDefault()

    authContext.logInGoogle().then(result => {
      toast.success("Connexion réussie !", {position: toast.POSITION.TOP_RIGHT});

      // redirection vers la dernière destination connue (si passée dans les params), dashboard par défaut
      navigate(state?.path || "/dashboard");
    }).catch(err => {
      toast.error(`Erreur lors de la connexion Google : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    })
  }

  // connexion avec Github
  const handleClickGithub = (event) => {
    event.preventDefault()

    authContext.logInGithub().then(result => {
      toast.success("Connexion réussie !", {position: toast.POSITION.TOP_RIGHT});
      
      // redirection vers la dernière destination connue (si passée dans les params), dashboard par défaut
      navigate(state?.path || "/");
    }).catch(err => {
      toast.error(`Erreur lors de la connexion Github : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    })
  }  

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Connexion</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
              <Link to="/forgot-password">Mot de passe oublié ?</Link>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              <Loading loading={loading}/>
            </Button>
          </Form>
          <hr></hr>
          <Button className="btn btn--google" size="sm" as="input" type="button" value="Se connecter avec Google" onClick={handleClickGoogle}/>{' '}
          <Button className="btn btn--github" size="sm" as="input" type="button" value="Se connecter avec Github" onClick={handleClickGithub}/>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Pas encore de compte ? <Link to="/signup">S'enregistrer</Link>
      </div>
    </>
  )
}
