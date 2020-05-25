const { io } = require('../server');
const {Usuario} = require('../classes/usuarios');
const {crearMensaje} = require('../utilidades/utilidades');

const usuarios = new Usuario();
 

io.on('connection', (client) => {

    // console.log('Usuario conectado');

    client.on('entrarChat',(usuario, callback) => {
        //console.log(usuario);
        if(!usuario.nombre || !usuario.sala){
            return callback({
                err:true,
                menssage: 'nombre y sala son necesarios'
            });
        }

        client.join(usuario.sala);

        usuarios.agregarPersona(client.id,usuario.nombre,usuario.sala);
        // console.log(usuarios.getPersonas());

        client.broadcast.to(usuario.sala).emit('listaPersonas',usuarios.getPersonaPorSala(usuario.sala));
        callback(usuarios.getPersonaPorSala(usuario.sala));
         
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    })

    client.on('disconnect',()=> {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('administrador',`${personaBorrada.nombre } ha salido`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonaPorSala(personaBorrada.sala));
        // console.log(usuarios.getPersona());

    });

    // mensajes privados
    client.on('mensajePrivado',data=>{
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));
    });

});