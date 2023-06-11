import { Badge } from "react-bootstrap";

// Gère l'affichage des différentes plateformes concernées par le titre
export default function Platforms({platforms}) {
  if (!platforms) {
    return <p data-testid="platform_nodata">Aucune plateforme définie pour ce jeu.</p>
  }

  return (
    platforms.map((platform) => {
      return (
        <span key={platform.id}>
          <Badge data-testid={`platform_${platform.id}`} bg="light" text="dark">
            {platform.abbreviation}
          </Badge>{" "}
        </span>
      );
    })
  )
}