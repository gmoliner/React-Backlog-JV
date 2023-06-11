import { render, screen } from "@testing-library/react"
import Cover from "./Cover"
import React from 'react'

test('Cover : verifier que la couverture est unique', function() {
  render(<Cover image={1534} size="big"></Cover>)
  const image = screen.getAllByAltText('cover_1534');
  expect(image).toHaveLength(1)
})

test('Cover : verifier que la couverture existe', function() {
  render(<Cover image={1534} size="big"></Cover>)
  const image = screen.getByAltText('cover_1534');
  expect(image).not.toBeNull()
})

test('Cover : verifier la bonne url (size = big)', function() {
  render(<Cover image={1534} size="big"></Cover>)
  const image = screen.getByAltText('cover_1534');
  expect(image).toHaveAttribute('src', "https://images.igdb.com/igdb/image/upload/t_cover_big/1534.jpg")
})

test('Cover : verifier la bonne url (size = small)', function() {
  render(<Cover image={1534} size="small"></Cover>)
  const image = screen.getByAltText('cover_1534');
  expect(image).toHaveAttribute('src', "https://images.igdb.com/igdb/image/upload/t_cover_small/1534.jpg")
})
