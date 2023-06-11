import { render, screen } from "@testing-library/react";
import Platforms from "./Platforms";

const platforms = [
  {
    "id": 9,
    "abbreviation": "PS3"
  }
]

test('Platforms : verifier que le badge existe', function() {
  render(<Platforms platforms={platforms} />)
  const platform = screen.getByTestId('platform_9');
  expect(platform).toBeInTheDocument()
})

test('Platforms : aucun badge est affiché si tableau vide', function() {
  render(<Platforms />)
  const platform = screen.getByTestId('platform_nodata');
  expect(platform).toBeInTheDocument()
})