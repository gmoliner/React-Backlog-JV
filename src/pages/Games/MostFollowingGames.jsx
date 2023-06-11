import { useQuery } from '@tanstack/react-query';
import {Badge, Card, Container, ListGroup, Row} from 'react-bootstrap'

import { fetchMostFollowingGames } from "../../services/fetchAPI";
import Cover from '../../components/Cover/Cover';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';
import Loading from '../../components/Loading/Loading';

/**
 * MostFollowingGames: fonction principale qui affiche la liste des jeux les plus suivis
 */
export default function MostFollowingGames() {
  // on exécute l'appel API pour récupérer la liste des jeux
  const {
    isLoading,
    isError,
    data: mostFollowingGames,
  } = useQuery({
    queryKey: ['mostFollowingGames'],
    queryFn: fetchMostFollowingGames,
    refetchOnWindowFocus: false,
    staleTime: 60000,
    onError: (error) => {
      toast.error(`${error}`, {position: toast.POSITION.TOP_RIGHT});
    }
  });

  if (isLoading) {
    return <Loading loading={true} />
  }

  if (isError) {
    return <NoData />
  }

  return(
    <div>
      <h2 className="main-title">Jeux les plus suivis</h2>
      {mostFollowingGames && mostFollowingGames.map((item, index) => {
        return (
          <ListGroup as="ol" key={index}>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <Cover image={item.cover?.image_id} size="micro"></Cover>
                <div className="ms-2 me-auto">
                  <div className="fw-bold"><a href={`/games/${item.id}`}>{item.name}</a></div>
                  {item.follows} followers
                </div>
                <Badge bg="warning" pill>
                  ⭐ {item.follows}
                </Badge>
              </ListGroup.Item>
          </ListGroup>
        )
      })}
    </div>
  )
}