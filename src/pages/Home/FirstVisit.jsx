import { Button, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import UseAuth from "../../providers/AuthProvider";

const FirstVisit = () => {  
  const userContext = UseAuth()
  const navigate = useNavigate();

  const initUnregisteredUser = () => {
    userContext.skipLogin(false)
    .then(() => {
      navigate("/");
    })
  }

  return (
    <div>
        <h1>Bienvenue !</h1>
        <p>Il semblerait que ce soit la première fois que vous consulter le site. Voulez-vous créer un profil ?</p>
        <Button variant="primary">
          <Nav.Link href="/register">Allons-y !</Nav.Link>
        </Button>{' '}
        <Button variant="outline-dark" onClick={initUnregisteredUser}>Non merci</Button>{' '}
    </div>
  )
}

export default FirstVisit