import {GET_COUNTRIES,GET_COUNTRIE_BY_ID} from '../actions';

const initialState = {
    countries: [],
    countrieById: []
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

        default: return {...state}
      }
}

export default rootReducer;