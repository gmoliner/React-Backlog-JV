import React from 'react'
import { Accordion, Badge, Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import sortReleasesByRegion from './utils';

// les régions récupérées depuis l'api IGDB retournent uniquement l'ID
// On fait un mapping des codes régions avec le trigramme qu'on doit afficher
const REGIONS = {
  1: "EUR",
  2: "USA",
  3: "AUS",
  4: "NZE",
  5: "JPN",
  6: "CHN",
  7: "ASI",
  8: "MONDIAL",
  9: "KOR",
  10: "BRE",
};

export default function Releases({releases}) {
  if (!releases) {
    return <p data-testid="releases_nodata">Aucune date de sortie enregistrée pour le jeu</p>
  }

  const sortedReleases = sortReleasesByRegion(releases)

  return (
    <Accordion defaultActiveKey="0">
      {sortedReleases.map((data, index) => {
        return (
          <Accordion.Item data-testid={`region_${data.region}`} eventKey={index} key={index}>
            <Accordion.Header>{REGIONS[data.region]}</Accordion.Header>
            <Accordion.Body>
                {data.releases.map((release, idx) => {
                  return (
                    <Row key={idx} data-testid={`region_${data.region}_date_${release.date}`}>
                      <Col >
                      <Badge bg="primary">
                        <Row lg={12}>
                          <Col>
                            {release.platform.abbreviation ? release.platform.abbreviation : release.platform.alternative_name}
                          </Col>
                          <Col>
                            <Moment unix>{release.date}</Moment>
                          </Col>
                        </Row>
                        <Row>
                        </Row>
                      </Badge>
                    </Col>
                    </Row>
                  );
                })}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  )
}

