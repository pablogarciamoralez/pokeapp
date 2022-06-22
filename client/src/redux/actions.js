import axios from 'axios'

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/pokemon')
    return dispatch({
      type: 'GET_POKEMONS',
      payload: json.data
    })
  }
}

export function getNamePokemons(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/pokemon/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log('get details error');
    }
  };
}

export function restartDetail() {
  return (dispatch) => {
    dispatch({ type: 'RESET' })
  }
}

export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/pokemon", payload);
    return response;
  };
}

export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get('http://localhost:3001/type', {});
    return dispatch({ type: "GET_TYPES", payload: json.data });
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterTypes(payload) {
  return {
    type: "FILTER_TYPES",
    payload,
  };
}

export function alphabeticalSort(payload) {
  return {
    type: "ALPHABETICAL_SORT",
    payload,
  };
}


export function forceSort(payload) {
  return {
    type: "FORCE_SORT",
    payload,
  };
}
// export function loaderAction(payload) {
//   return {
//     type: 'SHOW_LOADER',
//     payload
//   }
// }

export function searchByNameLoading (payload) {
  return {
    type: 'SEARCH_BY_NAME_LOADING', 
    payload
  }
}
