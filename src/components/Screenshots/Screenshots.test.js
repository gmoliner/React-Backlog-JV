import { render, screen } from "@testing-library/react"
import React from 'react'
import Screenshots from "./Screenshots"

const screenshots = [
  {
      "id": 859523,
      "image_id": "scif7n"
  },
  {
      "id": 859524,
      "image_id": "scif7o"
  },
  {
      "id": 859525,
      "image_id": "scif7p"
  },
  {
      "id": 859526,
      "image_id": "scif7q"
  },
  {
      "id": 859527,
      "image_id": "scif7r"
  }
]

const screenshots_empty = []

test('Screenshots : verifier la présence des cinq images', async function() {
  render(<Screenshots screenshots={screenshots} />)

  const image1 = screen.getByAltText('screenshot_859523');
  expect(image1).toBeTruthy()
  const image2 = screen.getByAltText('screenshot_859524');
  expect(image2).toBeTruthy()
  const image3 = screen.getByAltText('screenshot_859525');
  expect(image3).toBeTruthy()
  const image4 = screen.getByAltText('screenshot_859526');
  expect(image4).toBeTruthy()
  const image5 = screen.getByAltText('screenshot_859527');
  expect(image5).toBeTruthy()

  const images = await screen.findAllByRole('img')

  expect(images).toHaveLength(5)
})

test('Screenshots : vérifier les URLs', function() {
  render(<Screenshots screenshots={screenshots} />)
  const image1 = screen.getByAltText('screenshot_859523');
  expect(image1).toHaveAttribute('src', process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG +'/scif7n.jpg')

  const image2 = screen.getByAltText('screenshot_859524');
  expect(image2).toHaveAttribute('src',   process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG +'/scif7o.jpg')
  
  const image3 = screen.getByAltText('screenshot_859525');
  expect(image3).toHaveAttribute('src',   process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG +'/scif7p.jpg')

  const image4 = screen.getByAltText('screenshot_859526');
  expect(image4).toHaveAttribute('src',   process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG +'/scif7q.jpg')

  const image5 = screen.getByAltText('screenshot_859527');
  expect(image5).toHaveAttribute('src',   process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG +'/scif7r.jpg')
})

test('Screenshots : vérifier le bon comportement si pas de screenshots', function() {
  render(<Screenshots screenshots={screenshots_empty} />)
  const images = screen.queryAllByRole('img')
  expect(images.length).toBe(0)
})
