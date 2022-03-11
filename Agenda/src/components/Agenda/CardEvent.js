import React from 'react'
import moment from 'moment';
import Swal from 'sweetalert2';

import { useDispatch, useSelector } from 'react-redux'
import { eventSetActive, eventStartDelete } from '../../actions/events';
import 'moment/locale/es';


export const CardEvent = ({
    id,
    end,
    notes,
    start,
    characters,
    title,
    setVisible
}) => {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.evento);
    moment.locale('es');

    const handleDelete = async (e) => {

        Swal.fire({
            title: '¿Esta seguro?',
            text: "No se podra recuperar el evento",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo'
          }).then((result) => {
            if (result.isConfirmed) {
              
                let event = events.filter(event => event.id === id)
                dispatch(eventSetActive(event[0]));
                dispatch(eventStartDelete(id));         

              Swal.fire(
                'Borrado!',
                'Your evneto ha sido borrado.',
                'success'
              )


            }
          })
  

    }
    const handleUpdate = async (e) => {
        let event = events.filter(event => event.id === id)
        dispatch(eventSetActive(event[0]));
        setVisible(true)
    }

    return (
        <div className="card ms-3 mt-4 animate__animated animate__fadeIn " style={{ maxWidth: 540 }}>
            <div className="row no-gutters">

                <div className="col-md-8">

                    <div className="card-body">
                        <h5 className="card-title"> {title} </h5>
                        <p className="card-text"> {notes} </p>
                        <p className="card-text text-danger"> Inicio: <span className="card-text text-primary"> {moment(start).format('MMMM Do YYYY, h:mm:ss a')} </span></p>
                        <p className="card-text text-danger"> Fin: <span className="text-primary"> {moment(end).format('MMMM Do YYYY, h:mm:ss a')} </span></p>
                    </div>

                </div>
            </div>
            <div className="m-1 d-flex flex-row-reverse">
                <button
                    type="button"
                    className="btn btn-danger btn-sm ms-1"
                    onClick={handleDelete}
                >Borrar</button>

                <button
                    type="button"
                    className="btn btn-primary btn-sm ms-1"
                    onClick={handleUpdate}
                >Editar</button>
            </div>
        </div>
    )
}
