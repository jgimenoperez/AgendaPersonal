import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { eventSearch } from '../../actions/events';
import DateTimePicker from 'react-datetime-picker';
import './DateTimePicker.css';

export const Navbar = () => {

    const dispatch = useDispatch();
    const [buscatexto, setbusqueda] = useState()

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout());
    }
    const [datestart, onChangeStart] = useState(new Date());
    const [dateend, onChangeEnd] = useState(new Date());

    const handleSearch = (e) => {
        dispatch(eventSearch(buscatexto,datestart,dateend))
    }


    

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand ms-5">
                {name}
            </span>

            <div >

                <span className="navbar-brand ms-5">
                    Inicio
                </span>
                <DateTimePicker
                    onChange={onChangeStart} 
                    value={datestart}
                    className="btn btn-light me-3"
                    style={{ border: 0 }} />


                <span className="navbar-brand">
                    Fin
                </span>
                <DateTimePicker
                    onChange={onChangeEnd}
                    value={dateend}
                    className="btn  btn-light me-3"
                />


                <input
                    type="text"
                    placeholder="Texto a buscar"
                    className="btn  btn-light me-3"
                    onChange={(e) => (setbusqueda(e.target.value))}
                />

                <button
                    className="btn  btn-light me-3"
                    onClick={handleSearch}
                >
                    <i className="fa-thin fa-magnifying-glass "></i>
                    <span> Buscar</span>
                </button>

                <button
                    className="btn btn-outline-danger me-5"
                    onClick={handleLogout}
                >
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>

            </div>


        </div>
    )
}
