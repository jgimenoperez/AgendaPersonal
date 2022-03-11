var jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {

    return (
        new Promise((resolve, reject) => {
            const payload = { uid, name }
            jwt.sign(payload, process.env.SECRET_JWT_SEE,
                { expiresIn: '2h' },(err,token)=>{
                    if(err){
                        console.log(err)
                        reject('No se pudo generar el token')
                    }
                    resolve( token )
                }
            )
        })
    )
}

const verifyToken=(token)=>{

 
    try {
        var payload = jwt.verify(token, process.env.SECRET_JWT_SEE)
        return {
            uid:payload.uid,
            name:payload.name
        }
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    generarJWT,
    verifyToken
}
