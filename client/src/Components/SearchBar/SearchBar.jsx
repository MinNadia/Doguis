import React from "react";
import st from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNameDog, cleanStateDog } from "../../Actions/actions";


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameDog(name));
        setName("")
            
    };
    
    return (
        <div className={st.conteiner}>
            <input type='text' placeholder='Search Race' onChange={(e) => handleInputChange(e)} className={st.input} />
            <button type='submit' onClick={(e) => handleSubmit(e)} className={st.button}>Search</button>
        </div>
    );
};