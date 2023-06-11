import { useQuery } from '@tanstack/react-query';
import { Row, Carousel, Col } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Moment from 'react-moment';

import { fetchPopularGames } from "../../services/fetchAPI";
import Cover from '../../components/Cover/Cover';
import NoData from '../NoData/NoData';
import Loading from '../../components/Loading/Loading';

import './PopularGames.css'

/**
 * PopularGames: fonction principale qui affiche la liste des jeux les plus populaires
 */
export default function PopularGames() {
  // on exécute l'appel API pour récupérer la liste des jeux
  const {
    isLoading,
    isError,
    data: popularGames,
  } = useQuery({
    queryKey: ['popularGames'],
    queryFn: fetchPopularGames,
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

  // fonction utilisée pour afficher plusieurs items dans un même panel du carousel react-bootstrap (inutilisée)
  const reduceGames = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 5);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  const screenshotUrl = process.env.REACT_APP_IGDB_IMAGE_URL + process.env.REACT_APP_IMAGE_SCREENSHOT_BIG

  return(
    <div>
      <h2 className="main-title">Jeux populaires</h2>
      <Carousel className="carousel-wrapper">
        {popularGames && popularGames.map((item) => {
          const screenshot_background = screenshotUrl+'/'+item.screenshots[0]?.image_id+'.jpg'

          return (
            <Carousel.Item key={item.id} className="carousel-item-blur">
              <div className="carousel-item-blur-bg" style={{ backgroundImage: `url(${screenshot_background})`, zIndex: 1, backgroundSize: 'cover' }} />
              <Cover image={item?.cover.image_id} size="medium" style={{position: 'absolute', zIndex: 2, border: '1px solid #9e7acd'}}/>
              <Carousel.Caption className="home-carousel-caption">
                <Row className="d-flex justify-content-between">
                  <Col className="col-lg-1"></Col>
                  <Col className="col-lg-7 text-left">
                    <h3><a href={`/games/${item.id}`}>{item.name}</a></h3>
                    <p>Sortie : <Moment unix>{item.first_release_date}</Moment></p>
                  </Col>
                  <Col className="col-lg-2 d-flex align-items-center">
                    <h3>{Math.round(item.total_rating)}%</h3>
                  </Col>
                  <Col className="col-lg-1"></Col>
                </Row>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}