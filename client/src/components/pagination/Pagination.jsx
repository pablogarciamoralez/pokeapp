import React from "react";
import './pagination.css'

export default function Pagination({ pokemonsPerPage, allPokemons, pagination }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="ulList">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number} className='ulLi'>
              <button onClick={() => pagination(number)} key={number} className='pageNumbersButton'>
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}