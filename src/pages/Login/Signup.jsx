import React, { useRef, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import UseAuth from "../../providers/AuthProvider"
import Loading from '../../components/Loading/Loading'

// Validation des champs du formulaire avec yup
const schema = yup.object({
  email: yup.string().email().required('Adresse email requise'),
  password: yup.string().required('Mot de passe requis'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas'),
  displayName: yup.string().required('Pseudo requis')
}).required();

/**
 * Signup: fonction principale pour créer un nouveau compte
 */
export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const displayNameRef = useRef()

  const authContext = UseAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // création du formulaire
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // envoi du formulaire
  async function onSubmit(data) {
    try {
      setLoading(true)
      await authContext.signup({email: data.email, password: data.password, name: data.displayName})
      toast.success("Votre compte a été créé !", {position: toast.POSITION.TOP_RIGHT});
      navigate('/dashboard')
    } catch(err) {
      toast.error(`Erreur lors de la création du compte : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    }

    setLoading(false)
  }

  // Connexion avec Google
  const handleClickGoogle = (event) => {
    event.preventDefault()

    authContext.logInGoogle().then(result => {
      toast.success("Votre compte a été créé !", {position: toast.POSITION.TOP_RIGHT});
      navigate('/dashboard')
    }).catch(err => {
      toast.error(`Erreur lors de la connexion Github : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    })
  }

  // Connexion avec Github
  const handleClickGithub = (event) => {
    event.preventDefault()

    authContext.logInGithub().then(result => {
      toast.success("Votre compte a été créé !", {position: toast.POSITION.TOP_RIGHT});
      navigate('/dashboard')
    }).catch(err => {
      toast.error(`Erreur lors de la connexion Google : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Créer un compte</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required {...register("email")}/>
              <p className="text-danger">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" ref={passwordRef} required {...register("password")}/>
              <p className="text-danger">{errors.password?.message}</p>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmation du mot de passe</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required {...register("passwordConfirm")}/>
              <p className="text-danger">{errors.passwordConfirm?.message}</p>
            </Form.Group>
            <hr></hr>
            <Form.Group id="displayName">
              <Form.Label>Pseudo</Form.Label>
              <Form.Control type="text" ref={displayNameRef} required {...register("displayName")}/>
              <p className="text-danger">{errors.displayName?.message}</p>
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
        Vous possédez déjà un compte ? <Link to="/login">Connexion</Link>
      </div>
    </>
  )
}
