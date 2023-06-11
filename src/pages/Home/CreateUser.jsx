import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";

import { getGenres, getPlatforms } from "../../services/fetchAPI";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../providers/AuthProvider";

// Validation des champs du formulaire avec yup
const schema = yup.object({
  nom: yup.string().required('Nom requis'),
  prenom: yup.string().required('Prénom requis'),
  pseudo: yup.string().required('Pseudo requis'),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  genre: yup.number().required(),
  platform: yup.number().required()
}).required();

function CreateUser() {
  // on récupère le contexte "UserContext"
  const userContext = UseAuth()

  // création du formulaire
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  // const { login } = useAuth()

  // validation du formulaire : on remplit le localStorage et on redirige vers la dernière destination connue (accueil par défaut)
  const onSubmit = (data) => {
    const dataCopy = {...data, registered: true, firstVisit: false, loggedIn : true}

    userContext.createAccount(dataCopy).then(() => {
      navigate(state?.path || "/");
    })
  }

  // appel API pour récupérer la liste des plateformes
  const platformsQuery = useQuery({
      queryKey: ['platforms'],
      queryFn: () => getPlatforms(),
      refetchOnWindowFocus: false,
      staleTime: 60000,
      cacheTime: 60000
  })

  // appel API pour récupérer la liste des genres
  const genresQuery = useQuery({
    queryKey: ['genres'],
    queryFn: () => getGenres(),
    refetchOnWindowFocus: false,
    staleTime: 60000,
    cacheTime: 60000
  })  

  /**
   * DisplaySelectsLists : gère l'affichage des donnéees "statiques" dans les <select>
   * @param {*} param0 
   * @returns 
   */
  const DisplaySelectList = ({query, queryKey}) => {
    if (query.isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )
    }

    if (query.isSuccess && query.data.length) {
      return (
        <Form.Select {...register(queryKey)}>
          <option value=""></option>
          {query.isSuccess && query.data?.map(data => {
            return (
              <option key={data.id} value={data.id}>{data.name}</option>
            )
          })}
        </Form.Select>
      )
    }
  }

  return (
    <div>
      <h1>Création de profil</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group md="4">
          <Row className="mb-3">
            <Col md="3">
              <Form.Label>Nom *</Form.Label>
              <Form.Control type="text" placeholder="Renseigner le nom" {...register("nom")}></Form.Control>
              <p className="text-danger">{errors.nom?.message}</p>
            </Col>
            <Col md="3">
              <Form.Label>Prénom *</Form.Label>
              <Form.Control type="text" placeholder="Renseigner le prénom" {...register("prenom")}></Form.Control>
              <p className="text-danger">{errors.prenom?.message}</p>
            </Col>
            <Col md="3">
              <Form.Label>Pseudo *</Form.Label>
              <Form.Control type="text" placeholder="Renseigner le pseudo" {...register("pseudo")}></Form.Control>
              <p className="text-danger">{errors.pseudo?.message}</p>          
            </Col>
            <Col md="3">
              <Form.Label>Âge *</Form.Label>
              <Form.Control type="text" placeholder="Renseigner l'âge" {...register("age")}></Form.Control>
              <p className="text-danger">{errors.age?.message}</p>          
            </Col>        
          </Row>
          <Row>
            <Col>
              <Form.Label>Adresse mail</Form.Label>
              <Form.Control type="email" placeholder="Renseigner l'adresse mail" {...register("email")}></Form.Control>
              <p className="text-danger">{errors.email?.message}</p> 
            </Col>

            <Col>
              <Form.Label>Genre préféré</Form.Label>
              <DisplaySelectList query={genresQuery} queryKey={"genre"}/>
              <p className="text-danger">{errors.genre?.message}</p> 
            </Col>

            <Col>
              <Form.Label>Plateforme préférée</Form.Label>
              <DisplaySelectList query={platformsQuery} queryKey={"platform"}/>
              <p className="text-danger">{errors.platform?.message}</p> 
            </Col>        
          </Row>
        </Form.Group>

        <Button type="submit">Valider</Button>
      </Form>
    </div>

  )
}

export default CreateUser