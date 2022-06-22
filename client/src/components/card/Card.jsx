import React from "react";
import '../card/card.css'

export default function Card ({name, image, types}) {
    return (
    <article>
        <h3 className="pokeName">{name}</h3>
        <img src={image} alt="" className="pokeImage"/>
        <p className="typesCard">Tipo: {types}</p>
    </article>
    )
}