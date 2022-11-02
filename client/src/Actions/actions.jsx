import axios from "axios";
import { useDispatch } from "react-redux";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_NAME_DOG = "GET_NAME_DOG";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const POST_NEW_DOG = "POST_NEW_DOG";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
export const FILTER_BY_CREATE = "FILTER_BY_CREATE";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";



export function getAllDogs() {
    return async function(dispatch) {
        var allDogs = await axios.get('http://localhost:3001/dogs');
        return dispatch ({
            type: 'GET_ALL_DOGS',
            payload: allDogs.data
        });
    };
};

export function getNameDog(name) {
    return async function(dispatch) {
      try{        
        var json = await axios.get('http://localhost:3001/dogs?name=' + name);
        return dispatch ({
            type: 'GET_NAME_DOG',
            payload: json.data
        });
     } catch(error) {
        console.log(error);
     };
    };
};

export function getDogDetails(id) {
    return async function(dispatch) {
        try {
            var details = await axios.get(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: 'GET_DOG_DETAILS',
                payload: details.data
            });
        } catch(error) {
            console.log(error)
        };
    };
};

export function postNewDog(payload) {
    return async function(dispatch) {
        var newDog = await axios.post('http://localhost:3001/dogs/create', {payload});
        return dispatch({
            type: 'POST_NEW_DOG',
            payload: newDog.data
        });
    };
};

export function getTemperaments() {
    return async function(dispatch) {
        var newTemperament = await axios.get('http://localhost:3001/temperaments');
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: newTemperament.data
        });
    };
};

export function filterByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
};
     /*
      return function(dispatch) {
        var temperament = axios.get('http://localhost:3001/temperaments');
          return dispatch({
            type: FILTER_BY_TEMPERAMENT,
            payload: temperament.data
          }); */


    //     return (dispatch) => {
    //       return axios("/temperaments")
    //         .then((data) => dispatch({ type: GET_TEMPERAMENTS, payload: data.data }))
    //         .catch((error) => alert(error.message));
    //     };
    // return {
    //     type: 'FILTER_BY_TEMPERAMENT',
    //     payload
    // };


export function filterByCreate(payload) {
    return {
        type: 'FILTER_BY_CREATE',
        payload
    };
};

export function orderByAZ(payload) {
    return {
        type: 'ORDER_BY_AZ',
        payload
    };
};

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    };
};

