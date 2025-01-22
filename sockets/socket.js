const { io }= require('../index');


//Mensajes de sockets
io.on('connection', (client) => {
    console.log('Client conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload)=>{
        console.log('Mensaje!!!', payload);

        io.emit('mensaje', { admin: 'nuevo mensaje' });
    });


});