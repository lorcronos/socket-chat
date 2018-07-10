const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios');
const { creaMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSalas(data.sala));

        callback(usuarios.getPersonasPorSalas(data.sala));

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = creaMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', creaMensaje('Administrador', `${personaBorrada.nombre} abandonó el chat.`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSalas(personaBorrada.sala));

    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', creaMensaje(persona.nombre, data.mensaje));
    });
});