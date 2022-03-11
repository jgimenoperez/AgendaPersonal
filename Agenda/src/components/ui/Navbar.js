import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import {eventSearch } from '../../actions/events';

export const Navbar = () => {

    const dispatch = useDispatch();
    const [busca, setbusqueda] = useState()

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleSearch = (e) => {
        dispatch(eventSearch(busca))
    }



    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <div>
                <input 
                    type="text" 
                    placeholder="Busqueda" 
                    onChange={(e)=>(setbusqueda(e.target.value))}
                />

                <button
                    className="btn  btn-light ms-3"
                    onClick={handleSearch}
                >
                    <i className="fa-thin fa-magnifying-glass "></i>
                    <span> Buscar</span>
                </button>

                <button
                    className="btn btn-outline-danger ms-3"
                    onClick={handleLogout}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>

            </div>


        </div>
    )
}
