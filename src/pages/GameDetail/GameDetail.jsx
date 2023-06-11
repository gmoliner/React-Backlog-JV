import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { toast } from "react-toastify";

// api
import { fetchGameById } from "../../services/fetchAPI";

// sous composants
import Cover from "../../components/Cover/Cover";
import BacklogManagement from "../../components/Backlog/BacklogManagement";
import Platforms from "../../components/Platforms/Platforms";
import Screenshots from "../../components/Screenshots/Screenshots";
import Genres from "../../components/Genres/Genres";
import Releases from "../../components/Releases/Releases";
import Loading from "../../components/Loading/Loading";
import NoData from "../NoData/NoData";
import Moment from "react-moment";

/**
 * GameDetail : fonction principal qui affiche les détails du jeu sélectionné :
 * Titre du jeu / Jaquette du jeu / Plateformes concernées / Genres concernés / Résumé de l'histoire / Screenshots
 * On utilise parfois des sous composants pour les réutiliser dans d'autres parties de l'app
 */
export default function GameDetail() {
  // On récupère l'id du jeu envoyé dans les params
  const { gameID } = useParams();

  // on exécute l'appel API pour récupérer les détails du jeu
  // on spécifie le staleTime à 1 minute : pas besoin de refetch tout le temps
  const {
    isLoading,
    isError,
    data: game,
  } = useQuery({
    queryKey: ["games", gameID],
    queryFn: () => fetchGameById(gameID),
    refetchOnWindowFocus: false,
    staleTime: 60000,
    onError: (error) => {
      toast.error(`Erreur pour récupérer les données : ${error}`, {position: toast.POSITION.TOP_RIGHT});
    }
  });

  if (isLoading) {
    return <Loading loading={true} />
  }

  if (isError) {
    return <NoData />
  }

  return (
    <div>
      <Container>
        <Row>
          <Col className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <Card>
              <Row>
                <Col className="col-xl-12 col-sm-12">
                  <Cover image={game[0].cover?.image_id} size="big" style={{width: '100%'}}></Cover>
                  <BacklogManagement game={game[0]} />
                </Col>
                <Col className="col-xl-12 col-sm-12">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p className="main-title"><b>Plateformes</b></p>
                      <Platforms platforms={game[0].platforms}></Platforms>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p className="main-title"><b>Dates de sortie</b></p>
                      <Releases releases={game[0].release_dates} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p className="main-title"><b>Popularité</b></p>
                      {game[0].total_rating ? `${Math.round(game[0].total_rating)}% sur ${game[0].total_rating_count} avis.` : 'Aucun avis donné sur le jeu pour le moment'}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col className="col-xl-9 col-lg-9 col-md-8 col-sm-12 col-xs-12">
            <h1>{game[0].name}</h1>
            <Genres genres={game[0].genres}></Genres>
            <p>{game[0].summary}</p>
            <Screenshots screenshots={game[0].screenshots} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}