import React from "react";
import { Link } from "react-router-dom";
import st from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar";
import Orderings from "../Orderings/Orderings";
import FilterTemperament from "../Filters/FilterTemperament";


export default function Nav() {
    return (
        <div className={st.conteiner}>
            <Orderings />
            <FilterTemperament />
            <SearchBar />
            <div>
                <Link to = '/dogs/create' className={st.CreateRace}>Add new race</Link>
            </div>
        </div>

    )
};