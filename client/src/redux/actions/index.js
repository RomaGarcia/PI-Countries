export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIE_BY_ID = 'GET_COUNTRIE_BY_ID';
export const GET_COUNTRIE_BY_NAME = 'GET_COUNTRIE_BY_NAME';
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_COUNTRY_ACTIVITY = 'GET_COUNTRY_ACTIVITY';
export const SET_PAGE = 'SET_PAGE';

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

  export const getCountrieByName = (name) => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries/?name="+name)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIE_BY_NAME, payload: json });
      })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };

  export const setActivity = (form,activityCountry) => {
    return async function (dispatch) {
      return fetch('http://localhost:3001/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:form.name, dificulty: form.dificulty, duration: form.duration,season:form.season,country:activityCountry })
    })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: SET_ACTIVITY, payload: json });
    })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };

  export const getActivities = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/activity")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_ACTIVITY, payload: json });
      })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };

  export const getCountriesActivities = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries/activity")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRY_ACTIVITY, payload: json });
      })
      .catch(err => console.error(err))
      /*return axios.get('http://localhost:3001/products')
        .then(response => dispatch({type: GET_ALL_PRODUCTS, payload: response.data}))
        .catch(err => dispatch({type: undefined}))*/
    };
  };

  export const setPage = (num) => {
    return(dispatch) => {
        dispatch({ type: SET_PAGE, payload: num });
    };
  };