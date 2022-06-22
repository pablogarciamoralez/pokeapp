import React from "react";
import { getNamePokemons, searchByNameLoading } from '../../redux/actions'
import { useState } from "react";
import { useDispatch } from "react-redux";
import '../searchBar/SearchBar.css'

export default function SearchBar({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByNameLoading(true))
    dispatch(getNamePokemons(name)).then(() => {
      dispatch(searchByNameLoading(false))
  })
  setName("")
  setCurrentPage(1)
  
}
  
  return (
    <div>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <input  className="inputSearch" type="text" placeholder="Buscar pokemon..." onChange={(e) => handleInputChange(e)}/>
        <button className="buttonSearch">
        ►{" "}
        </button>
      </form>
      
    </div>
  );
}
