// import des différents schemes
import PopularGamesScheme from "../schemes/PopularGames"
import UpcomingGamesScheme from "../schemes/UpcomingGames"
import GameDetailScheme from "../schemes/GameDetail"

// Headers à insérer dans le fetch
// le body est géré dans chaque fonction
const headers = {
    method: 'POST',
    headers: new Headers({
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      'Client-ID': process.env.REACT_APP_IGDB_CLIENT_ID,
      Authorization: process.env.REACT_APP_IGDB_AUTHORIZATION,
    }),
    mode: 'cors', 
    cache: 'default'
}

/**
 * Pour gérer les CORS, on utilise le module "cors-anywhere" lancé depuis un serveur node local 
 * cd ../proxy
 * node proxy.ts
 */
const PROXY_URL = process.env.REACT_APP_PROXY_URL
const IGDB_URL = process.env.REACT_APP_IGDB_URL

// APPELS API
// Les jeux les plus populaires
// critères : année en courant, les jeux qui ont un rating total supérieur à 85, trié par nombre de rating décroissant
function fetchPopularGames () {
    const currentYear = new Date().getFullYear();
    const timestamp = Math.floor(new Date(currentYear, 0, 1).getTime() / 1000);

    headers.body = `fields 
    id, 
    name, 
    slug,
    cover.image_id, 
    screenshots.image_id,
    total_rating,
    total_rating_count,
    first_release_date;
    where total_rating > 80 & first_release_date > ${timestamp} & total_rating != null & screenshots != null; 
    sort total_rating_count desc;
    sort total_rating desc;
    limit 10;`

    return fetch(`${PROXY_URL}/${IGDB_URL}/games`, headers)
    .then((res) => {
        const data = res.json()

        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            throw new Error(error)
        }

        return data
    })
    .then((json) => PopularGamesScheme.parse(json))
    .catch(error => {
        return Promise.reject(error)
    })
} 

// Les jeux les plus attendus
// critères : le maximum de "hypes" sur les jeux avec une date de sortie supérieure à aujourd'hui, trié par ordre décroissant
function fetchUpcomingGames () {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);

    headers.body = `fields 
    id, 
    cover.image_id, 
    hypes, 
    name, 
    slug, 
    first_release_date;
    sort hypes desc;
    where hypes != null & first_release_date > ${timestamp};
    limit 6;`

    return fetch(`${PROXY_URL}/${IGDB_URL}/games`, headers)
    .then((res) => {
        const data = res.json()

        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            throw new Error(error)
        }

        return data
    })
    .then((json) => UpcomingGamesScheme.parse(json))
    .catch(error => {
        return Promise.reject(error)
    })
}

// les jeux les plus suivis
// critères : le maximum de "follows", trié par ordre décroissant
function fetchMostFollowingGames () {
    headers.body = `fields 
    id, 
    follows,
    name, 
    cover.image_id, 
    slug, 
    first_release_date;
    sort follows desc;
    where follows != null;
    limit 6;`

    return fetch(`${PROXY_URL}/${IGDB_URL}/games`, headers)
    .then((res) => {
        const data = res.json()

        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            throw new Error(error)
        }

        return data
    })
    // .then((json) => GamesScheme.parse(json))
    .catch(error => {
        return Promise.reject(error)
    })
}

// le détail d'un jeu
// critère : l'ID du jeu
function fetchGameById (gameID) {
    headers.body = `fields 
    id, 
    name, 
    summary, 
    cover.image_id, 
    genres.name, 
    platforms.abbreviation, 
    release_dates.id, 
    release_dates.date, 
    release_dates.region, 
    release_dates.platform.id, 
    release_dates.platform.abbreviation, 
    release_dates.platform.alternative_name, 
    screenshots.image_id, 
    total_rating, 
    total_rating_count;
    where id = ${gameID} ;`

    return fetch(`${PROXY_URL}/${IGDB_URL}/games`, headers)
    .then((res) => {
        const data = res.json()

        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            throw new Error(error)
        }

        return data
    })
    .then((json) => GameDetailScheme.parse(json))
    .catch(error => {
        console.error(`Erreur pour récupérer les données : ${error}`)
        return Promise.reject(error)
    })
}

// recherche
function searchGame(params) {
    const searchField = params.search
    const offsetField = params.offset

    // ici nous utilisons l'endpoint multiquery pour récupérer deux données situées sur deux endpoints : 
    // - les résultats de la recherche (/games)
    // - le nombre total de résultats (/games/count)
    headers.body = `query games "Search Results" {
    fields 
        id, 
        name, 
        cover.image_id,
        platforms.abbreviation, 
        genres.name; where name ~ *"${searchField}"* ; sort name asc; offset ${offsetField}; limit 10;
    };
    
    query games/count "Total items" {
        where name ~ *"${searchField}"*;
    };`

    return fetch(`${PROXY_URL}/${IGDB_URL}/multiquery`, headers)
    .then((res) => {
        const data = res.json()

        if (!res.ok) {
            const error = (data && data.message) || res.statusText;
            throw new Error(error)
        }

        return data
    })
    // .then((json) => SearchScheme.parse(json))
    .catch(error => {
        console.error(`Erreur pour récupérer les données : ${error}`)
        return Promise.reject(error)
    })
}

export { fetchPopularGames, fetchUpcomingGames, fetchMostFollowingGames, fetchGameById, searchGame }