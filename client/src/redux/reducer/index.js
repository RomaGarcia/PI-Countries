import {GET_COUNTRIES,GET_COUNTRIE_BY_ID,GET_COUNTRIE_BY_NAME, SET_ACTIVITY, GET_ACTIVITY, GET_COUNTRY_ACTIVITY,SET_ACTIVITY_MSG,DELETE_ACT_COUN, SET_PAGE, SET_FILTER, SET_COUNTRIE, ADD_ACTIVITY} from '../actions';

const initialState = {
    countries: [],
    countrieById: [],
    countrieByName: [],
    activities: [],
    activitiesAll: [],
    countriesActivity: [],
    deleteActCounMsg: '',
    addActCounMsg: '',
    continent:'',
    activity:'',
    alfa:'',
    population:'',
    page: 1,
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

        case DELETE_ACT_COUN:
          return{
            ...state,
            deleteActCounMsg: action.payload,
          }

        case SET_PAGE:
            return{
              ...state,
              page: action.payload
            }

        case SET_FILTER:
          return{
            ...state,
            continent: action.payload.continent,
            activity: action.payload.activity,
            alfa: action.payload.alfa,
            population: action.payload.population,
          }
        
        case SET_COUNTRIE:
          return{
            ...state,
            countries: []
          }

        case ADD_ACTIVITY:
          return{
            ...state,
            addActCounMsg: action.payload,
          }
        
        default: return {...state}
      }
}

export default rootReducer;