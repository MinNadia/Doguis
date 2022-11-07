import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filterByTemperament, filterByCreate, getTemperaments, getAllDogs } from "../../Actions/actions";
// import st from "./FilterTemperament.module.css";


export default function Filters() {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('')
    // const allD = useSelector((state) => state.dogs)
    const temp = useSelector(state => state.temperaments)

    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
        setFilter(`filter ${e.target.value}`)
    };

    function handleFilterCreate(e) {
      e.preventDefault();
      dispatch(filterByCreate(e.target.value))
      setFilter(`filter ${e.target.value}`)
    };

    // useEffect(() => {
    //   dispatch(getAllDogs());
    // }, [dispatch]);


    useEffect(() => {
      dispatch(getTemperaments());
    }, [dispatch]);


    return (
        <div>
             <label>Temperament</label>
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option key={"all"} value="All">All</option>
            {temp.map((el) => {
              return (
              <option key={el.id} value={el.Name}>{el.Name}</option>
            )}
            )};
          </select>
             <label>Origin</label>
          <select onChange={(e) => handleFilterCreate(e)}>
            <option value="All">All</option>
            <option value="Original">Original</option>
            <option value="Created">Created</option>
          </select>
        </div>
    );
};



/*
 filterByTemperament(dispatch, resetArrays, filterByTemperaments) {
    dispatch(resetArrays());
    const optionsTemp = document.getElementById("filter-temp").value;
    dispatch(filterByTemperaments(optionsTemp));
  }, */
