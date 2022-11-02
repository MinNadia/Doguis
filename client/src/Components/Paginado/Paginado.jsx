/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import st from "./Paginado.module.css";


export default function Paginado({dogsPerPage, dogsAll, paginado}) {
    const pageNumber = []

    for(let i = 1; i <= Math.ceil(dogsAll/dogsPerPage); i++) {
        pageNumber.push(i)
    }

    return (
        <nav className={st.conteiner} >
        <ul className={st.paginado} >
            {pageNumber &&
                pageNumber.map(number => (
                    <a onClick={() => paginado(number)} key={number} className={st.number}>{number}</a>
                ))}
        </ul>
        </nav>
    )
};