import Games from "../Games/Games"

function UnregisteredUser() {
  return (
    <div>
      <h1>Page d'accueil général</h1>
      <p>Vous nous avez indiqué ne pas vouloir créer un compte. Sans profil enregistré, la page d'accueil affiche les jeux les plus populaires et vous ne pouvez pas ajouter de jeux à votre backlog. <br />
        <em>
          Vous avez encore la possibilité de créer un profil en cliquant <a href="/register">juste ici</a>.
        </em>
      </p>
      
      <Games />
    </div>
  )
}

export default UnregisteredUser