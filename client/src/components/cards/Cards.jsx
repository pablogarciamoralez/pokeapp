import React, {useState} from "react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import '../cards/cards.css'

export default function Cards({ currentPokemons }) {
    return (
        <section className="gridCards">
            {currentPokemons?.map((e) => {
                return (
                    <article key={e.id}>
                        <Link className="linkCard" to={`/home/${e.id}`}>
                            <Card 
                                name={e.name ? e.name : 'Not Found'} 
                                image={e.image} 
                                types={e.types?.map((n) => n.name + " ")} 
                                key={e.id} 
                            />
                        </Link>
                    </article>
                )
            }
            )
            }
        </section>
    )
}