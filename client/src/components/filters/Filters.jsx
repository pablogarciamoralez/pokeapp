import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCreated, alphabeticalSort, getTypes, filterTypes, forceSort } from "../../redux/actions"
import '../filters/filters.css'

export default function Filters({ setCurrentPage, setOrden }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const filterByTypes = useSelector((state) => state.arrayTypes);

    function handleFilterType(e) {
        e.preventDefault();
        dispatch(filterTypes(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();
        dispatch(alphabeticalSort(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleForceSort(e) {
        e.preventDefault();
        dispatch(forceSort(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    return (
        <div className="filtergrid">
            <div className="filterLabel">
                <label className="titlesLabel"> Ordenar alfabeticamente </label>
                <select onChange={(e) => handleAlphabeticalSort(e)} className='selectFilter'>

                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>

            <div className="filterLabel">
                <label className="titlesLabel">Ordenar por fuerza</label>
                <select onChange={(e) => handleForceSort(e)} className='selectFilter'>
                    <option value="asc">MÁS FUERTES</option>
                    <option value="desc">MENOS FUERTES</option>
                </select>
            </div>

            <div className="filterLabel">
                <label className="titlesLabel">Filtrar por tipos</label>
                <select onChange={(e) => handleFilterType(e)} className='selectFilter'>
                    <option disabled>Type</option>
                    {filterByTypes?.map((t) => {
                        return (
                            <option value={t.name} key={t.id}>
                                {t.name.toUpperCase()}
                            </option>
                        )
                    })})
                </select>
            </div>

            <div className="filterLabel">
                <label className="titlesLabel">Filtrar creados</label>
                <select onChange={(e) => handleFilterCreated(e)} className='selectFilter'>
                    <option disabled>Category</option>
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="created">Creados</option>
                </select>
            </div>

        </div>
    )
}