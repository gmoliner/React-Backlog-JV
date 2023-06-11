import { render, screen } from "@testing-library/react";
import Genres from "./Genres";

const genres = [
  {
    "id": 53,
    "name": "Shooter"
  }
]

test('Genres : verifier que le badge existe', function() {
  render(<Genres genres={genres} />)
  const genre = screen.getByTestId('genre_53');
  expect(genre).toBeInTheDocument()
})

test('Genres : aucun badge est affiché si tableau vide', function() {
  render(<Genres />)
  const genre = screen.getByTestId('genre_nodata');
  expect(genre).toBeInTheDocument()
})