
// Sección 9 => 124. Mongoose - Conectarnos a la base de datos

const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useCreateIndex: true,
            //useFindAndModify: false
       });

        console.log('Base de datos Online');

    } catch (error){
        console.error(error);
        throw new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}