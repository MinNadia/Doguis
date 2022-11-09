/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDogDetails } from "../../Actions/actions";
import st from "./DogDetails.module.css";



export default function DogDetails(props) {
    const dispatch = useDispatch();
    const myDog = useSelector((state) => state.dogDetails)

    useEffect(() => {   
        dispatch(getDogDetails(props.match.params.id));
    },[])
    console.log("1", myDog)


    if(Object.entries(myDog).length) {
        return (
            <div className={st.background}> {  
               <div>
                  <h1>{myDog[0].Name}</h1>
                  <div className={st.contenedorDatos}>
                   
                   <div className={st.datos}>
                      <p>Height: {`${myDog[0].Height_Min} - ${myDog[0].Height_Max} cm`}</p>
                      <p>Weight: {`${myDog[0].Weight_Min} - ${myDog[0].Weight_Max} Kg`}</p>
                      <p>Years of Life: {myDog[0].YearsOfLife}</p>
                      <p>Temperaments: {myDog[0].Temperaments || myDog[0].temperaments}</p>
                      {/* <p>Temperaments: {myDog[0].Temperaments}</p> */}
                  </div>
                  <img src = {myDog[0].Image} alt= "Image of a dog" className={st.image} />
                  </div>
               </div>
            }
            <Link to = '/dogs'>
               <button className={st.boton}>Come back</button>
            </Link>
            </div>  
        )} else {
              return <p className={st.loading}>Loading...</p>
        };
};

