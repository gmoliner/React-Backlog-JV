import PopularGames from "../Games/PopularGames"
import { Col, Container, Row } from "react-bootstrap"
import UpcomingGames from "../Games/UpcomingGames"
import MostFollowingGames from "../Games/MostFollowingGames"


function Home() {
    return (
      <>
      <Container>
        <Row>
          <Col>
            <PopularGames />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="col-xl-6 col-lg-8">
            <MostFollowingGames />
          </Col>
          <Col className="col-xl-6 col-lg-4">
            <UpcomingGames /> 
          </Col>
        </Row>

      </Container>
      </>
    )
}

export default Home
