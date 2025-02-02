const { io } = require('../index');

const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Breaking Benjamin' ));
bands.addBand( new Band( 'Bon Jovi' ));
bands.addBand( new Band( 'Héroes del Silencio' ));
bands.addBand( new Band( 'Metalica' ));


// Mensajes de sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje recibido:', payload);
        io.emit('mensaje', { admin: 'nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands() );

    });
    client.on('add-band', (payload) => {
        const newBand = new Band( payload.name);
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands() );

    });

    client.on('delete-band',(payload) => {

        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });
    // Escuchar el evento 'emitir-mensaje'
    //client.on('emitir-mensaje', (payload) => {
    //    //console.log(payload);
    //    //client.broadcast.emit('nuevo-mensaje', payload);
    //    client.broadcast.emit('nuevo-mensaje', payload);
    //})


});
