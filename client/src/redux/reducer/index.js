import {GET_COUNTRIES,GET_COUNTRIE_BY_ID,GET_COUNTRIE_BY_NAME, SET_ACTIVITY, GET_ACTIVITY, GET_COUNTRY_ACTIVITY, SET_COUNTRIE,SET_ACTIVITY_MSG,DELETE_ACT_COUN} from '../actions';

const initialState = {
    countries: [],
    countrieById: [],
    countrieByName: [],
    activities: [],
    activitiesAll: [],
    countriesActivity: [],
    deleteActCounMsg: '',
}

const rootReducer = (state = initialState, action) => {
    switch (
        action.type
        // Acá va tu código:
      ) {
        case GET_COUNTRIES:
          return{
            ...state,
            countries: action.payload
          }

        case GET_COUNTRIE_BY_ID:
            return{
                ...state,
                countrieById: action.payload
            }

        case GET_COUNTRIE_BY_NAME:
          return{
            ...state,
            countrieByName: action.payload
          }

        case SET_ACTIVITY:
          return{
            ...state,
            activities: action.payload
          }

        case GET_ACTIVITY:
          return{
            ...state,
            activitiesAll: action.payload
          }
        
        case GET_COUNTRY_ACTIVITY:
          return{
            ...state,
            countriesActivity: action.payload
          }

        case SET_ACTIVITY_MSG:
          return{
            ...state,
            activities: []
          }
        
        case SET_COUNTRIE:
          return{
            ...state,
            countries: []
          }

        case DELETE_ACT_COUN:
          return{
            ...state,
            deleteActCounMsg: action.payload,
          }
        

        default: return {...state}
      }
}

export default rootReducer;