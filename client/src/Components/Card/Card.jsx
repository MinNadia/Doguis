import React from "react";
import { Link } from "react-router-dom";
import st from "./Card.module.css";


export default function Card({name, image, temperament, weight, id}) {

    return (
        <div className={st.card}>
            <img src={image} alt= "img not found" className={st.image} />
            <Link to = {`/dogs/${id}`} className={st.name}>{name}</Link>            
            <h3 className={st.weight}>{weight}</h3>
            <h3 className={st.temperament}>{temperament}</h3>
        </div>
    );
};