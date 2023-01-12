import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filterByTemperament, filterByCreate, getTemperaments } from "../../Actions/actions";
import st from "./Filters.module.css";


export default function Filters(paginado) {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('')
    const temp = useSelector(state => state.temperaments)

    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
        setFilter(`filter ${e.target.value}`)
        paginado(1)
    };

    function handleFilterCreate(e) {
      e.preventDefault();
      dispatch(filterByCreate(e.target.value))
      setFilter(`filter ${e.target.value}`)
      paginado(1)
    };

    useEffect(() => {
      dispatch(getTemperaments());
    }, [dispatch]);


    return (
        <div className={st.conteiner}>
        <div className={st.temps}>
          <label className={st.name} key={"temp"}>Temperament</label>
          <select onChange={(e) => handleFilterTemperament(e)}>
            <option key={"all"} value="All">All</option>
            {temp.map((el) => {
              return (
                <option key={el.id} value={el.Name}>{el.Name}</option>
              );
            }
            )};
          </select>
      </div>
      <div className={st.origin}>
      <label className={st.name} key={"origin"}>Origin</label>
      <select onChange={(e) => handleFilterCreate(e)}>
          <option key={"All"} value="All">All</option>
          <option key={"Original"} value="Original">Original</option>
          <option key={"Created"} value="Created">Created</option>
        </select>
      </div>
        </div> 
    );
};



/*
 filterByTemperament(dispatch, resetArrays, filterByTemperaments) {
    dispatch(resetArrays());
    const optionsTemp = document.getElementById("filter-temp").value;
    dispatch(filterByTemperaments(optionsTemp));
  }, */
