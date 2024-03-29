import React from "react";
import st from "./Orderings.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs, orderByWeight, orderByAZ } from "../../Actions/actions";


export default function Orderings() {
    const dispatch = useDispatch();
    const [order, setOrder] = useState('');

    useEffect(() => {
        dispatch(getAllDogs());
    },[dispatch])

    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value))
        setOrder(`order ${e.target.value}`)
    };

    function handleSortAZ(e){
        e.preventDefault();
        dispatch(orderByAZ(e.target.value))
        setOrder(`order ${e.target.value}`)
    }
    
    return (
        <><div className={st.conteiner}>
            <p className={st.name}>Orderings </p>
            <select onChange={(e) => handleSortWeight(e)} className={st.weight}>
                <option value = "All">-</option>
                <option value="W.Max">Heavy</option>
                <option value="W.Min">Light</option>
            </select>
            <select onChange={(e) => handleSortAZ(e)} className={st.abc}>
                <option value = "All">-</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
        </div></>
    );
};

