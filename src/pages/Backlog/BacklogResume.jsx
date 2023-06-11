import { Card, Col, Row } from "react-bootstrap";

import { Chart as ChartJS, 
  ArcElement, 
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler, 
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip } from 'chart.js';
import { Bar, Doughnut, Radar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Filler,
  Tooltip
);

const STATUS_MAPPING = {
  1: {
      label: "A faire",
      bgColor: "rgba(3, 32, 148, 0.2)"
  }, 
  2: {
      label: "En cours",
      bgColor: "rgba(214, 145, 246, 0.2)"
  },
  3: {
      label: "Fini",
      bgColor: "rgba(212, 207, 255, 0.2)"
  },
  4: {
      label: "Abandonné",
      bgColor: "rgba(67, 169, 217, 0.2)"
  }
}

export default function BacklogResume({backlog}) {
  // fonction qui permet de récupérer la valeur la plus nombreuse dans un tableau d'objets, selon une clé donnée
  function getMostValue(data, key) {
    // les clés dépendent de ce qu'on veut chercher
    const keyToFind = {
      'genres': 'name',
      'platforms': 'abbreviation'
    }
    
    // définition des variables
    const aggregatedData = {};
    const keyFound = keyToFind[key]
    let valueMax = 0
    let entryMax = ""

    // on commence par regrouper les données (chaque key) et on compte chaque occurence
    data.map(game => {
      game[key].map(res => {
        const name = res[keyFound]
        if (!aggregatedData[name]) {
          aggregatedData[name] = 0
        }
        aggregatedData[name]++;
        return aggregatedData
      })
      return aggregatedData
    })

    // on récupère la valeur de la donnée qu'on a trouvé le plus de fois
    for (const data in aggregatedData) {
      if (aggregatedData[data] > valueMax) {
        entryMax = data;
        valueMax = aggregatedData[data];
      }
    }

    return {entryMax, valueMax}
  }

  const DisplayResume = () => {
    if (backlog.length === 0) {
      return <p>Résumé pas encore disponible : votre backlog est vide </p>
    }

    const {entryMax: favoriteGenre} = getMostValue(backlog, 'genres')
    const {entryMax: favoritePlatform} = getMostValue(backlog, 'platforms')

    const gameProgresses = {};
    const gameGenres = {}
    const gamePlatforms = {};
  
    backlog.map(game => {
        const name = game.status
        if (!gameProgresses[name]) {
          gameProgresses[name] = 0
        }
        gameProgresses[name]++;
        return gameProgresses
    })
  
    const progressesData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      }]
    }
  
    for (const [key, value] of Object.entries(gameProgresses)) {
      progressesData.datasets[0]['data'].push(value)
      progressesData.labels.push(STATUS_MAPPING[key].label)
      progressesData.datasets[0]['backgroundColor'].push(STATUS_MAPPING[key].bgColor)
    }
  
    backlog.map(game => {
      game['genres'].map(res => {
        const name = res['name']
        if (!gameGenres[name]) {
          gameGenres[name] = 0
        }
        gameGenres[name]++;
        return gameGenres
      })
      return gameGenres
    })
  
    const genresData = {
      labels: [],
      datasets: [{
        data: [],
        label: 'Genres',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }]
    }
  
    for (const [key, value] of Object.entries(gameGenres)) {
      genresData.datasets[0]['data'].push(value)
      genresData.labels.push(key)
    }
  
    backlog.map(game => {
      game['platforms'].map(res => {
        const name = res['abbreviation']
        if (!gamePlatforms[name]) {
          gamePlatforms[name] = 0
        }
        gamePlatforms[name]++;
        return gamePlatforms
      })
      return gamePlatforms
    })
  
    const platformsData = {
      labels: [],
      datasets: [{
        data: [],
        label: 'platforms',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }]
    }
  
    for (const [key, value] of Object.entries(gamePlatforms)) {
      platformsData.datasets[0]['data'].push(value)
      platformsData.labels.push(key)
    }

    return (
      <>
        <Col className="col-xl-4">
          <Card>
            <Card.Body>
              <Doughnut data={progressesData}/>
            </Card.Body>
          </Card>
          </Col>
          <Col className="col-xl-4">  
          <Card>
            <Card.Body>
              <Radar data={genresData} />
            </Card.Body>
          </Card>
          </Col>
          <Col className="col-xl-4">
          <Card>
            <Card.Body>
              <Bar data={platformsData} />
            </Card.Body>
          </Card>
        </Col>
      </>
    )
  }

  return (
    <Row>
      <h2>Votre résumé</h2>
      <DisplayResume />
    </Row>
  )
}


