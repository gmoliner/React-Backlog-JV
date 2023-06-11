import { Button, Card } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import useBacklog from "../../providers/BacklogProvider"
import UseAuth from "../../providers/AuthProvider"

function BacklogManagement({game}) {
    const gameRef = game

    // on récupère le contexte User
    const {currentUser} = UseAuth()
    // on récupère le contexte backlog
    const backlogContext = useBacklog()

    // redux
    // const dispatch = useDispatch()
    // const backlog = useSelector((state) => state.backlog)

    const location = useLocation()
    const navigate = useNavigate()

    // le jeu courant est-il présent dans le contexte ?
    const existingGame = backlogContext.backlog?.find(game => game.id === gameRef.id)

    // redirection vers la page de création de profil
    const navigateToRegister = (e) => {
        e.preventDefault()
        navigate('/login', {state: { path: location.pathname }})
    }

    const addGame = (e) => {
        e.preventDefault()
        backlogContext.addGame(gameRef)
    }

    const removeGame = (e) => {
        e.preventDefault()
        backlogContext.removeGame(gameRef)
    }

    // On affiche pas le bouton si l'utilisateur n'est pas enregisté
    if (!currentUser) {
        return (
            <Card.Header>
                <Button data-testid="redirect-login" onClick={navigateToRegister} size="sm">Connexion</Button>
            </Card.Header>
        )
    }

    // si le jeu se trouve dans le backlog : bouton de suppression
    // si le jeu n'est pas dans le backlog : bouton d'ajout
    if (existingGame) {
        return (
            <Card.Header>
                <Button variant="danger" onClick={removeGame}>Supprimer</Button> 
            </Card.Header>
        )
    } else {
        return (
            <Card.Header>
                <Button variant="success" onClick={addGame}>Ajouter</Button> 
            </Card.Header>
        )
    }
}

export default BacklogManagement