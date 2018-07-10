const creaMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
}

module.exports = {
    creaMensaje
}