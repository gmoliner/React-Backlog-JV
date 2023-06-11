import { useQuery } from '@tanstack/react-query';
import {Badge, Card, Col, Container, ListGroup, Row, Table} from 'react-bootstrap'

import { fetchUpcomingGames } from "../../services/fetchAPI";
import Cover from '../../components/Cover/Cover';
import { toast } from 'react-toastify';
import NoData from '../NoData/NoData';
import Loading from '../../components/Loading/Loading';
import Moment from 'react-moment';

/**
 * UpcomingGames: fonction principale qui affiche la liste des jeux à venir
 */
export default function UpcomingGames() {
  // on exécute l'appel API pour récupérer la liste des jeux
  const {
    isLoading,
    isError,
    data: upcomingGames,
  } = useQuery({
    queryKey: ['upcomingGames'],
    queryFn: fetchUpcomingGames,
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
      <h2 className="main-title">Jeux à venir</h2>
      <ListGroup as="ol" >
      {upcomingGames && upcomingGames.map((item, index) => {
        return (
              <ListGroup.Item key={index} as="li" className="d-flex justify-content-between align-items-start">
                <Cover image={item.cover?.image_id} size="micro"></Cover>
                <div className="ms-2 me-auto mb-0">
                  <div className="fw-bold"><a href={`/games/${item.id}`}>{item.name}</a></div>
                  <Moment unix>{item.first_release_date}</Moment>
                </div>
                <Badge bg="primary" pill alt="test">
                  🚀 {item.hypes}
                </Badge>
              </ListGroup.Item>
        )
      })}
      </ListGroup>
    </div>
  )
}