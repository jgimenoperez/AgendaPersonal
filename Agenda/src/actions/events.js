import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";
import Swal from 'sweetalert2';

export const eventStartAddnew = (event) => {

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth

        try {


            const resp = await fetchConToken('events/add', event, 'POST');
            const body = await resp.json()

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name,
                }

                dispatch(eventAddNew(event));
            }


        } catch (error) {
            console.log(error)
        }


    }

}




const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const EventStartUpdate = (event) => {

    return async (dispatch) => {
        try {

            const resp = await fetchConToken(`events/update/${event.id}`, event, 'PUT');
            const body = await resp.json()


            if (body.ok) {

                dispatch(eventUpdated(event))

            } else {
                Swal.fire('Error', body.msg, 'error');
            }



        } catch (error) {
            console.log(error)
        }
    }

}


const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = (id) => {

    return async (dispatch, getState) => {
        try {
            // const {id} = getState().evento.activeEvent
            console.log(`events/delete/${id}`)
            const resp = await fetchConToken(`events/delete/${id}`, {}, 'DELETE');
            const body = await resp.json()


            if (body.ok) {

                dispatch(eventDeleted())

            } else {
                Swal.fire('Error', body.msg, 'error');
            }



        } catch (error) {
            console.log(error)
        }
    }

}

const eventDeleted = () => ({ type: types.eventDeleted });


export const eventStartLoading = () => {

    return async (dispatch) => {

        try {


            const resp = await fetchConToken('events');
            const body = await resp.json()

            if (body.ok) {

                const events = prepareEvents(body.eventos)
                dispatch(eventLoaded(body.eventos));
            }


        } catch (error) {
            console.log(error)
        }

    }

}



export const eventSearch = (busca) => {

    return async (dispatch) => {

        // Utilizo post por que express parace que no le gusta una petición GET con body
        try {

            const resp = await fetchConToken('events/find',{"title":busca},'POST' );
            const body = await resp.json()

            if (body.ok) {

                const events = prepareEvents(body.eventos)
                dispatch(eventLoaded(body.eventos));
            }


        } catch (error) {
            console.log(error)
        }

    }
}




// export const eventSearch = () =>{

//     return async (dispatch) =>{

//         try {

//             console.log(111)
//             const resp = await fetchConToken( 'events/find',{title:'prueba'}  );
//             const body = await resp.json()

//             if ( body.ok ) {

//               const events = prepareEvents( body.eventos)
//               dispatch( eventLoaded( body.eventos ) );
//             }


//         } catch (error) {
//             console.log(error)
//         }     

//     }

// }

const eventLoaded = (events) => (
    {
        type: types.eventLoaded,
        payload: events
    }
)


export const eventLogout = () => (

    {
        type: types.eventLogout,
    }
)