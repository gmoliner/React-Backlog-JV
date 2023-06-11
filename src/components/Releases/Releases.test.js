import { render, screen } from "@testing-library/react"
import Releases from "./Releases"

const release_dates1 = [
  {
    "id": 27310,
    "date": 1037491200,
    "platform": {
      "id": 21,
      "abbreviation": "NGC",
      "alternative_name": "GCN"
    },
    "region": 2
  },
  {
    "id": 110331,
    "date": 1046390400,
    "platform": {
      "id": 21,
      "abbreviation": "NGC",
      "alternative_name": "GCN"
    },
    "region": 5
  },
  {
    "id": 110332,
    "date": 1048204800,
    "platform": {
      "id": 21,
      "abbreviation": "NGC",
      "alternative_name": "GCN"
    },
    "region": 1
  }
]

const release_dates2 = [
  {
    "id": 27310,
    "date": 1037491200,
    "platform": {
      "id": 21,
      "alternative_name": "GCN"
    },
    "region": 2
  }
]

const release_dates3 = [
  {
    "id": 27310,
    "date": 1037491200,
    "platform": {
      "id": 21,
      "abbreviation": "NGC",
      "alternative_name": "GCN"
    },
    "region": 2
  }
]

test('Releases : aucune release est affichee si le tableau est vide', function() {
  render(<Releases />)
  const noreleases = screen.getByTestId("releases_nodata")
  expect(noreleases).toBeInTheDocument()
})

test('Releases : verifier la presence des bonnes dates', function() {
  render(<Releases releases={release_dates1}/>)
  const region1 = screen.getByTestId("region_2")
  const region1_date1 = screen.getByTestId("region_2_date_1037491200")
  const region2 = screen.getByTestId("region_5")
  const region2_date1 = screen.getByTestId("region_5_date_1046390400")
  const region3 = screen.getByTestId("region_1")
  const region3_date1 = screen.getByTestId("region_1_date_1048204800")
  expect(region1).toBeInTheDocument()
  expect(region1_date1).toBeInTheDocument()
  expect(region2).toBeInTheDocument()
  expect(region2_date1).toBeInTheDocument()
  expect(region3).toBeInTheDocument()
  expect(region3_date1).toBeInTheDocument()
})

test('Releases : display alternative_name if no abbreviation', function() {
  render(<Releases releases={release_dates2}/>)
  const name = screen.getByText("GCN")
  expect(name).toBeInTheDocument()
})

test('Releases : display abbreviation', function() {
  render(<Releases releases={release_dates3}/>)
  const name = screen.getByText("NGC")
  expect(name).toBeInTheDocument()
})

test('Releases : display region', function() {
  render(<Releases releases={release_dates3}/>)
  const region = screen.getByText("USA")
  expect(region).toBeInTheDocument()
})
