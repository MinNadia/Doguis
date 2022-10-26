import React from "react";
import { Link } from "react-router-dom";
import st from "./LandingPage.module.css";


export default function LandingPage() {
    return (
        <div className= {st.background}>
            <Link to = '/dogs'>
                <button className= {st.button}>Get Into</button>
            </Link>
        </div>
    )
};