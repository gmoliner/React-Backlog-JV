import React, { useRef } from 'react'
import { Form } from 'react-bootstrap'
import BacklogManagement from '../../components/Backlog/BacklogManagement'
import useBacklog from '../../providers/BacklogProvider'

const BacklogListItem = ({game}) => {
    const backlogContext = useBacklog()
    const statusRef = useRef()

    const handleChange = (event) => {
      event.preventDefault()
      backlogContext.modifyStatus(game, statusRef.current.value)
    }

    return (
      <tr>
        <td></td>
        <td><a href={`/games/${game.id}`}>{game.name}</a></td>
        <td>{game.genres?.map(genre => genre.name).join(', ')}</td>
        <td>{game.platforms?.map(platform => platform.abbreviation).join(', ')}</td>
        <td>
          <Form.Select ref={statusRef} value={game.status} aria-label="Statut de progression du jeu" onChange={handleChange}>
              <option value="1">A faire</option>
              <option value="2">En cours</option>
              <option value="3">Fini</option>
              <option value="4">Abandonné</option>
          </Form.Select>
        </td>
        <td><BacklogManagement game={game}/></td>
      </tr>
    )
}

export default BacklogListItem