import { Spinner } from "react-bootstrap";

// Permet d'afficher le spinner de loading
// Utilisé également comme contenu des boutons de validation des forms
export default function Loading({loading}) {
  return (
    <>
      {!loading ? "Valider" : 
        <Spinner data-testid="spinner-loading" animation="border" role="status" size="sm">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }
    </>
  );
}