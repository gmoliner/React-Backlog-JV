import { Badge } from "react-bootstrap";

export default function Genres({genres}) {
  if (!genres) {
    return <p data-testid="genre_nodata">Aucun genre défini pour ce jeu</p>
  }
  
  return (
    genres.map((genre) => {
      return (
        <span key={genre.id}>
          <Badge data-testid={`genre_${genre.id}`} bg="primary">{genre.name}</Badge>{" "}
        </span>
      );
    })
  );
}