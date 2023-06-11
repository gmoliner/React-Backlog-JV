import React from "react";
import {Button, OverlayTrigger, Popover, Table} from "react-bootstrap"

import BacklogListItem from "./BacklogListItem";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Ajouter des jeux</Popover.Header>
    <Popover.Body>
      <ul>
        <li>Depuis la fiche détaillé du jeu</li>
        <li>Depuis la recherche</li>
      </ul>
    </Popover.Body>
  </Popover>
);

export default function BacklogList({backlog}) {
  return (
    <div>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success" size="sm">Comment ajouter des jeux ? </Button>
      </OverlayTrigger>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Type</th>
            <th>Console</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            backlog && backlog.map((game) => {
                return <BacklogListItem key={game.id} game={game}></BacklogListItem>
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

