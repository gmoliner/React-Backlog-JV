import { useSearchParams } from "react-router-dom";
import { searchGame } from "../../services/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";

// sous composants
import Genres from "../../components/Genres/Genres";
import Platforms from "../../components/Platforms/Platforms";
import BacklogManagement from "../../components/Backlog/BacklogManagement";
import Loading from "../../components/Loading/Loading";
import NoData from "../NoData/NoData";
import { useEffect, useState } from "react";

const PAGINATION_LIMIT = 10

/**
 * Search: fonction principale permettant d'effectuer une recherche sur les jeux
 */
function Search() {
  // on récupère les paramètres de recherche
  const [searchParams] = useSearchParams()
  const searchParam = searchParams.get('search')

  // page courante
  const [currentPage, setCurrentPage] = useState(0)
  // liste des pages à utiliser pour la pagination
  const [pages, setPages] = useState(0)
  // contenu de la recherche
  const [search, setSearch] = useState(searchParam)
  // index à partir duquel chercher les résultats
  const [offset, setOffset] = useState(0)

  // appel api
  const { 
    isLoading, 
    isError, 
    isSuccess, 
    data:results,
    isFetching
  } = useQuery({
      queryKey: ['search', `${search}-page${currentPage+1}`],
      queryFn: () => searchGame({search: search, offset: offset}),
      refetchOnWindowFocus: false,
      staleTime: 60000,
      enabled: true,
      onError: (error) => {
        toast.error(`Erreur pour récupérer les données : ${error}`, {position: toast.POSITION.TOP_RIGHT});
      }
  })

  function goToFirstPage() {
    setCurrentPage(0)
    setOffset(0)
  }

  function goToPage(page) {
    const nextPage = page
    setCurrentPage(nextPage)
    const newOffset = (10 * nextPage) + 1
    setOffset(newOffset)
  }

  function goToLastPage() {
    const nextPage = pages - 1
    setCurrentPage(nextPage)
    const newOffset = (10 * nextPage) + 1
    setOffset(newOffset)
  }

  // on compte le nombre de pages totales à proposer dans la pagination
  useEffect(() => {
    if (results) {
      const totalPages = Math.ceil(results[1].count / PAGINATION_LIMIT)
      setPages(totalPages)
    }
  }, [results])

  // on met à jour la recherche + on reset la page courante et l'offset
  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam)
      setCurrentPage(0)
      setOffset(0)
    }
  }, [searchParam])
 
  if (isLoading) {
    return <Loading loading={true} />
  }
  
  if (isError) {
    return <NoData />
  }

  // on construit nos éléments de pagination
  const Pagination = () => {
    // on ne continue pas si les résultats sont vides
    if (results[1].count === 0) {
      return 
    }

    const rows = [];

    // première page de la liste
    rows.push((<span key={0}><Button size="sm" variant="secondary" disabled={currentPage === 0} onClick={goToFirstPage}>{'<<'}</Button><span> </span></span>))

    // liste des différentes pages
    for (let index = 0; index < pages; index++) {
      rows.push(<Button size="sm" variant={currentPage === index ? 'primary': 'secondary'} key={index + 1} onClick={() => goToPage(index)}>{index + 1}</Button>)
    }

    // dernière page de la liste
    rows.push((<span key={pages + 1}><span> </span><Button size="sm" variant="secondary" disabled={(currentPage + 1) === pages} onClick={goToLastPage}>{'>>'}</Button></span>))

    return rows
  }

  const SearchResults = () => {
    if (isFetching) {
      return <tr><td colSpan="4"><Loading loading={true} /></td></tr>
    } else if (results[1].count === 0) {
      return <tr><td colSpan="4">Aucun résultat pour cette recherche</td></tr>
    } else {
      return results[0].result.map(result => {
        return (
          <tr key={result.id}>
              <td><a href={`/games/${result.id}`}>{result.name}</a></td>
              <td><Genres genres={result.genres} /></td>
              <td><Platforms platforms={result.platforms} /></td>
              <td>
                <BacklogManagement game={result}/>
              </td>
          </tr>
        )
      })
    }
  }
  
  return (
    <Row>
      <Col>
        <Pagination />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Genre(s)</th>
              <th>Console(s)</th>
              <th>Backlog</th>
            </tr>
          </thead>
          <tbody>
            <SearchResults />
          </tbody>
        </Table>
      </Col>
    </Row>
  )
}



export default Search