import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filterByTemperament, getTemperaments } from "../../Actions/actions";
// import st from "./FilterTemperament.module.css";


export default function FilterTemperament() {
    const dispatch = useDispatch();
    const allD = useSelector((state) => state.dogs)
    const temp = useSelector((state) => state.temperaments)
    // console.log("1", temp)
    function handleFilterTemperament(e) {
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value))
    };

    return (
        <div>
             <label>Temperament</label>
          <select onChange={e => handleFilterTemperament(e)}>
            {temp.map((el) => {
              return (
              <option value={el.Name}>{el.Name}</option>
            )}
            )}
          </select>
        </div>
    );
};

/**
 <div className={styles.selection}>
          <label to="temperament">Temperament</label>
          <select
            className={styles.buttonSelection}
            id="filter"
            name="temperament"
            onChange={props.handleFilter}
          >
            <option>All</option>
            {props.temperaments.map((el) => (
              <option key={el.id}>{el.name}</option>
            ))}
          </select>
        </div>

 */
