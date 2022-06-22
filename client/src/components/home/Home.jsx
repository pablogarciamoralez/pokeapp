import React from "react";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons} from "../../redux/actions";
import { Link } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";
import SearchBar from "../searchBar/SearchBar";
import Cards from "../cards/Cards";
import './home.css'
import Loader from "../loader/Loader";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'


export default function Home() {
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)

    const [loading, setLoading] = useState(false)

    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setLoading(true);
        dispatch(getPokemons()).then(() => setLoading(false))
    }, [dispatch])

    function handleRefresh(e) {
        e.preventDefault();
        setLoading(true)
        dispatch(getPokemons()).then(() => setLoading(false))
        setCurrentPage(1)
        
    }

    return (

        <div>
            {
                loading 
                ? <Loader/>
                : (
                        <div className="background">
                            <header className="headerContainer">
                                <div className="title">
                                    <h2>POKEAPP</h2>
                                </div>
                                
                                <nav className="navBar">
                                    <div className="divCreate">
                                        <Link to='/home/pokemon/create' className="createContainer">CREAR POKEMON</Link>
                                    </div>    
                                    <div className="searchContainer">
                                        <SearchBar setCurrentPage={setCurrentPage}></SearchBar>
                                    </div>  
                                </nav>
                            </header>
                            <button onClick={(e) => { handleRefresh(e) }} className='reloadButton'>Recargar</button>
                            
                            <Filters setCurrentPage={setCurrentPage} setOrden={setOrden} />
                    
                            <div>
                                    <Cards currentPokemons={currentPokemons}/>
                            </div>

                            <Pagination
                                pokemonsPerPage={pokemonsPerPage}
                                allPokemons={allPokemons.length}
                                pagination={pagination}
                            />

                            <footer className="footer">
                                <p className="about">Desarrollado por Pablo García a partir de <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">POKEAPI</a> </p>
                                
                                <div className="social">
                                <a href="https://github.com/pablogarciamoralez" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="https://www.linkedin.com/in/pablogarciamoralez/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
                                </div>
                                
                            </footer>

                        <div/>
                        </div>
                    )
                
            }
            
        </div>
    )
}