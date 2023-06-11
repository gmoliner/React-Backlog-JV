import { useNavigate, createSearchParams } from 'react-router-dom';
import { Button, Form } from "react-bootstrap"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";

// Validation des champs du formulaire avec yup
const schema = yup.object({
  search: yup.string().required('Champ requis')
}).required();

// Formulaire de recherche inclus dans la barre de navigation
function SearchForm() {
    // création du formulaire
    const { register, handleSubmit, formState:{ errors }, resetField } = useForm({
      resolver: yupResolver(schema)
    });

    const navigate = useNavigate()
    const params = {}

    // fonction appelée au submit du formulaire
    function onSubmit(data) {
      params['search'] = data.search

      // on reset la barre de recherche
      resetField("search")

      // navigation vers la page des résultats de recherche
      navigate({
        pathname: '/search', 
        search: `?${createSearchParams(params)}`,
      })
    }
  
    return (
      <Form className="d-flex" onSubmit={handleSubmit(onSubmit)} style={{position: 'relative'}}>
        <Form.Control type="text" placeholder="Rechercher un jeu"  {...register("search")} className={`me-2 ${errors.search ? 'alert-foobar' : ''}`} aria-label="Search" />
        <span style={{position: 'absolute', left: '0px', bottom: '-25px', backgroundColor: 'red', color: 'white'}}>{errors.search?.message}</span>
        <Button type="submit" variant="outline-success">OK</Button>
      </Form>
    )
  }

export default SearchForm