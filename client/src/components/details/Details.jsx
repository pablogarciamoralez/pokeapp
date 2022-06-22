import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, restartDetail } from "../../redux/actions";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { Link, useParams} from "react-router-dom";
import '../details/details.css'
import '../home/home.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons'


export default function Details() {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false)

  
  useEffect(() => {
    setLoading(true);
    dispatch(getDetails(id)).then(() => setLoading(false))
    dispatch(restartDetail());
  }, [dispatch, id]);


  const myPokemon = useSelector((state) => state.detail);
  
  return (
    <div className="backGroundDetail">

      {
        loading 
        ? <Loader></Loader>
        : (
          <><div className="headerContainer">
              <div className="title">
                <h2>POKEAPP</h2>
              </div>
            </div>
            <div key={myPokemon.id}>
                {myPokemon.length > 0 && (

                  <div className="detailContainer">
                    <div>
                      <h1>{myPokemon[0].name}</h1>

                      <div>
                        <div>
                          <span>
                            <h2>ID Number: {myPokemon[0].id}</h2>
                          </span>
                        </div>
                      </div>


                      <div>
                        <div>
                          <h2>Hit Point: {myPokemon[0].hp}</h2>
                          <h2>Attack: {myPokemon[0].attack}</h2>
                          <h2>Defense: {myPokemon[0].defense}</h2>
                          <h2>Speed: {myPokemon[0].speed}</h2>
                          <h2>Height: {myPokemon[0].height + " m"}</h2>
                          <h2>Weight: {myPokemon[0].weight + " kg"}</h2>
                          <h2>Type(s): {myPokemon[0].types.map((e) => e.name + " ")}</h2>
                        </div>
                        <div>
                          <img
                            src={myPokemon[0].image}
                            alt="pokemon" 
                            className="imageDetail"/>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
                <div>
                <Link to='/home/'>
                  <button className="buttonBack" >Volver</button>
                </Link>
              </div>
              <footer className="footerDetail">
              <p className="about">Desarrollado por Pablo García a partir de <a href="https://pokeapi.co/">POKEAPI</a> </p>
              <div className="social">
                                <a href="https://github.com/pablogarciamoralez"><FontAwesomeIcon icon={faGithub} /></a>
                                <a href="https://github.com/pablogarciamoralez"><FontAwesomeIcon icon={faLinkedin} /></a>
                                </div>
              </footer></>
        )
      }
    </div>
  );
}