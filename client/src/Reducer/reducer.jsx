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
                // dogs: [...state.dogs, action.payload]
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
            
        case FILTER_BY_TEMPERAMENT:
            // const allDoguis = state.filtersDogs
            
            // const filterTemp = action.payload === "All" ? allDoguis : 
            // allDoguis.filter(el => el.Temperament?.includes(action.payload));
            
            return {
                ...state,
                dogs: state.filtersDogs.filter(dog => dog.temperament?.includes(action.payload))
            };

        case FILTER_BY_CREATE:
            const allDog = state.filtersDogs

            const filterCreate = action.payload === "Created" ? 
                                 allDog.filter(el => el.CreateDb) :
                                 allDog.filter(el => !el.CreateDb)
                                 
                                //  console.log("7", filterCreate)            
            return {
                ...state,
                dogs: action.payload === "All" ? state.filtersDogs : filterCreate
            }
            
        case ORDER_BY_WEIGHT:
            const sortWeight = action.payload === "W.Min" ?
        
            state.dogs.sort(function(a, b) {
                if( a.Weight_Max > b.Weight_Max) {
                    return 1;
                }
                if(b.Weight_Max > a.Weight_Max) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function(a, b) {
                if(a.Weight_Min > b.Weight_Min) {
                    return -1;
                }
                if(b.Weight_Min > a.Weight_Min) {
                    return 1;
                }
                return 0;
            })
                return {
                    ...state,
                    dogs: [...sortWeight],
                            };
           
        case ORDER_BY_AZ:
            const sortAbc = action.payload === "A-Z" ?
            state.dogs.sort(function(a, b) {
                if(a.Name > b.Name) {
                    return 1;
                }
                if(b.Name > a.Name) {
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort(function(a, b) {
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
                dogs: [...sortAbc]
            };          
            


        default: return state;
    };
};

export default rootReducer;