export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIE_BY_ID = 'GET_COUNTRIE_BY_ID';

export const getCountries = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIES, payload: json });
      })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };

  export const getCountrieById = (id) => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries/"+id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIE_BY_ID, payload: json });
      })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };