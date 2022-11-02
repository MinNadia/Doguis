import {
    GET_ALL_DOGS,
    GET_NAME_DOG,
    GET_DOG_DETAILS,    
    POST_NEW_DOG,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_CREATE,
    ORDER_BY_AZ,
    ORDER_BY_WEIGHT,
    GET_TEMPERAMENTS
} from "../Actions/actions";

const initialState = {
    dogs: [],
    dogDetails: [],    
    temperaments: [],
    postDog: [],
    filtersDogs: []
    
}; 

function rootReducer(state = initialState, action) {
    switch(action.type) {

        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filtersDogs: action.payload
            };

        case GET_NAME_DOG:
            return {
                ...state,
                dogs: action.payload
            };

        case GET_DOG_DETAILS:
            return {
                ...state,
                dogDetails: action.payload
            };

        case POST_NEW_DOG:
            return {
                ...state,
                postDog: [...state.postDog, action.payload]
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
            
        case FILTER_BY_TEMPERAMENT:
            const allDoguis = state.filtersDogs
            const filterTemp = state.filtersDogs.filter((e) => e.filtersDogs);
             if (filterTemp.length === 0) {
                return {
                    ...state,
                    allDoguis
                };
             }
            return {
                ...state,
                allDoguis: filterTemp
            }
            // const allDogs = state.allDogs
            // const temperamentFilter = action.payload === "All" ? allDogs : allDogs.filter(el => el.Temperament === action.payload)
            // return {
            //     ...state,
            //     dogs: [...temperamentFilter]
            // };

        case ORDER_BY_WEIGHT:
            const sortWeight = action.payload === "W.Min" ?
        
            state.filtersDogs.sort(function(a, b) {
                a.w = (a.Weight_Max + a.Weight_Min) /2
                b.w = (b.Weight_Max + b.Weight_Min) /2
                if( a.w > b.w) {
                    return 1;
                }
                if(b.w > a.w) {
                    return -1;
                }
                return 0;
            }) :
            state.filtersDogs.sort(function(a, b) {
                a.w = (a.Weight_Max + a.Weight_Min) /2
                b.w = (b.Weight_Max + b.Weight_Min) /2
                if(a.w > b.w) {
                    return -1;
                }
                if(b.w > a.w) {
                    return 1;
                }
                return 0;
            }) 
             
           
            console.log("2", state.filtersDogs)
                return {
                    ...state,
                    filtersDogs: [...sortWeight],
                            };
           
        case ORDER_BY_AZ:
            var sortAbc = action.payload === "A-Z" ?
            state.filtersDogs.sort(function(a, b) {
                if(a.Name > b.Name) {
                    return 1;
                }
                if(b.Name > a.Name) {
                    return -1;
                }
                return 0;
            }) :
            state.filtersDogs.sort(function(a, b) {
                if(a.Name > b.Name) {
                    return -1;
                }
                if(b.Name > a.Name) {
                    return 1;
                }
                return 0;
            }); 
            return {
                ...state,
                filtersDogs: [...sortAbc]
            };
             
            
            


        default: return state;
    };
};

export default rootReducer;