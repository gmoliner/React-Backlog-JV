import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import UseAuth from "../../providers/AuthProvider"

/**
 * UpdateProfile: fonction principale permettant de mettre à jour les infos de son compte
 */
export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef = useRef()

  const authContext = UseAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // envoi du formulaire
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return toast.error(`Les deux mots de passe ne correspondent pas`, {position: toast.POSITION.TOP_RIGHT});
    }

    const promises = [];
    setLoading(true);

    if (emailRef.current.value !== authContext.currentUser.email) {
      promises.push(authContext.updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(authContext.updatePassword(passwordRef.current.value));
    }
    if (displayNameRef.current.value) {
      promises.push(authContext.updateName(displayNameRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Erreur lors de la mise à jour du compte : ${err.message}`, {position: toast.POSITION.TOP_RIGHT});
        return authContext.logout().then(() => {
          navigate("/login")
        })
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Metre à jour le profil</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={authContext.currentUser?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Laisser vide si inchangé"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmation du mot de passe</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Laisser vide si inchangé"
              />
            </Form.Group>
            <hr></hr>
            <Form.Group id="displayName">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                ref={displayNameRef}
                required
                defaultValue={authContext.currentUser?.displayName}
              />
            </Form.Group>            
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              <Loading loading={loading}/>
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Annuler</Link>
      </div>
    </>
  );
}
