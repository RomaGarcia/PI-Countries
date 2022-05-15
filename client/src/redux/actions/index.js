export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIE_BY_ID = 'GET_COUNTRIE_BY_ID';
export const GET_COUNTRIE_BY_NAME = 'GET_COUNTRIE_BY_NAME';
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_COUNTRY_ACTIVITY = 'GET_COUNTRY_ACTIVITY';
export const SET_ACTIVITY_MSG = 'SET_ACTIVITY_MSG';
export const DELETE_ACT_COUN = 'DELETE_ACT_COUN';
export const SET_PAGE = 'SET_PAGE';
export const SET_FILTER = 'SET_FILTER';
export const SET_COUNTRIE = 'SET_COUNTRIE'; 
export const ADD_ACTIVITY = 'ADD_ACTIVITY';


export const getCountries = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIES, payload: json });
      })
      .catch(err => console.error(err))
    };
  };

  /*export const getCountries = () => {
    return async function (dispatch) {
      try {
        const response = await fetch("http://localhost:3001/countries")
        const responseJson = await response.json()
        dispatch({ type: GET_COUNTRIES, payload: responseJson });
      } catch (error) {
        console.log(error)
      }
    };
  };*/

  /*export const getCountries = () => {
    return async function (dispatch) {
      return axios.get("/countries")
      .then(response => {
        dispatch({ type: GET_COUNTRIES, payload: response.data });
      })
      .catch(err => console.error(err))
    };
  };*/


  export const getCountrieById = (id) => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/countries/"+id)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_COUNTRIE_BY_ID, payload: json });
      })
      .catch(err => console.error(err))

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

    };
  };

  export const setActivity = (form/*activityCountry*/) => {
    return async function (dispatch) {
      return fetch('http://localhost:3001/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name:form.name, dificulty: form.dificulty, duration: form.duration,season:form.season,country:form.countries/*country:activityCountry*/ })
    })
    .then(response => response.json())
    .then(json => {
      dispatch({ type: SET_ACTIVITY, payload: json });
    })
      .catch(err => console.error(err))
    };
  };
  /*export const setActivity = (form,activityCountry) => {
    return function(dispatch){
        return axios.post('http://localhost:3001/activity', {form,activityCountry})
        .then(msg => dispatch({type: SET_ACTIVITY, payload: msg.data }))
    }
}*/

  export const getActivities = () => {
    return async function (dispatch) {
      return fetch("http://localhost:3001/activity")
      .then(response => response.json())
      .then(json => {
        dispatch({ type: GET_ACTIVITY, payload: json });
      })
      .catch(err => console.error(err))

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

    };
  };

  export const setActivityMsg = () => {
    return {type: SET_ACTIVITY_MSG}
  };

  export const setPageStore = (page) => {
    return {type: SET_PAGE, payload: page}
  };

  export const setFilter = (options) => {
    return {type: SET_FILTER, payload: options}
  };


  export const setCountriesLoad = () => {
    return {type: SET_COUNTRIE}
  };


  export const deleteActCoun = (idCountry,idActivity) => {
    return async function (dispatch) {
      return fetch('http://localhost:3001/activity/'+idCountry,{
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idActivity })})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: DELETE_ACT_COUN, payload: json });
      })
      .catch(err => console.error(err))

    };
  };

  export const addActivity = (idCountry,idActivity) => {
    return async function (dispatch) {
      return fetch('http://localhost:3001/activity',{
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCountry,idActivity })})
      .then(response => response.json())
      .then(json => {
        dispatch({ type: ADD_ACTIVITY, payload: json });
      })
      .catch(err => console.error(err))

    };
  };

