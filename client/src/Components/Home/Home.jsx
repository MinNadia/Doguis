import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import st from "./Home.module.css";
import Nav from "../Nav/Nav";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import { getAllDogs } from "../../Actions/actions";


export default function Home() {
  const dispatch = useDispatch()
  const dogsAll = useSelector((state) => state.dogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDog = dogsAll.slice(indexOfFirstDog, indexOfLastDog);
console.log("3", dogsAll)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(()=>{
    setCurrentPage(1)
  },[dogsAll]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  };

  useEffect(() => {
    dispatch(getAllDogs());
},[dispatch]);

  
  return (
    <div className={st.background}>
        <><div>
      <Nav />
    </div>
    <div >
        <h1>Doguiis!!!</h1>
        <Paginado
          dogsPerPage={dogsPerPage}
          dogsAll={dogsAll.length}
          paginado={paginado} />
        <button onClick={e => {handleClick(e)}} className={st.refresh}>Refresh</button>
        <div className={st.conteinerDog}>
          {currentDog && currentDog.map((d) => {
            return (
              <Card image={d.Image} 
              name={d.Name} 
              weight={`${d.Weight_Min} - ${d.Weight_Max} Kg`} 
              temperament={d.Temperaments || d.temperaments} 
              key={d.Id} id={d.Id} />
            )
          })}
        </div>
      </div></>
    </div>
    );
};
