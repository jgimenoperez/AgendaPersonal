const { response } = require('express')
const Evento = require('../models/Evento')
const {verifyToken} = require('../helpers/jwt')

const obtenerEventos = async (req, res = response) => {
        
    let {uid}=verifyToken( req.header('x-token'))

    const eventos = await Evento.find({
            user: uid
          })

        // .populate('user', "naame")
    return res.status(200).json({
        ok: true,
        eventos: eventos
    })

}


const buscar = async (req, res = response) => {
    
    let {uid}=verifyToken( req.header('x-token'))

    const { title, datestart, dateend } = req.body

    let fechastart = datestart//new Date('2020-10-19T16:36:14.197Z');
    let fechaend = dateend //new Date('2024-10-19T16:36:14.197Z');
    console.log(datestart, dateend)

    if (fechastart===undefined || fechastart=="null"){
        fechastart=new Date('2020-10-19T16:36:14.197Z');
    }

    if (fechaend===undefined || fechastart=="null"){
        fechaend=new Date('2024-10-19T16:36:14.197Z');
    }

   
    console.log(datestart, dateend)

    const eventos = await Evento.find({
        $and: [{ start: { $gte: fechastart } }, { end: { $lte: fechaend } },{ user: uid}],
        $or: [{ $or: [{ "title": new RegExp(title, 'i') }, { "notes": new RegExp(title, 'i') }] }]

    });

    console.log(eventos)
    return res.status(200).json({
        ok: true,
        eventos: eventos
    })

}


const añadirEvento = async (req, res = response) => {


    const evento = new Evento(req.body);
    try {
        uid = req.uid
        nombre = req.name

        evento.user = req.uid
        console.log(req.uid)
        const eventoDB = await evento.save()

        return res.status(200).json({
            ok: true,
            evento: eventoDB
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador....'
        })
    }

}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id

    try {

        // const evento = await Evento.findById(eventoId)
        const evento = await Evento.findById(eventoId)
        const uid = req.uid

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }


        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(

            eventoId,
            nuevoEvento,
            { new: true }

        )

        return res.status(200).json({
            ok: true,
            msg: "Evento actualizado"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}

const borrarEventos = async (req, res = response) => {

    const eventoId = req.params.id

    try {
        const evento = await Evento.findById(eventoId)
        const uid = req.uid

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }


        if (evento.user.toString() !== uid) {

            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este evento"
            })
        }

        //const eventoBorrado = await Evento.
        const eventoActualizado = await evento.deleteOne()
        console.log(evento)

        return res.status(200).json({
            ok: true,
            msg: 'Evento borrado'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

}


module.exports = {
    obtenerEventos,
    añadirEvento,
    actualizarEvento,
    borrarEventos,
    buscar
}