const mongoose = require('mongoose')
const mongoPath  = 'mongodb+srv://sadBot:DJsMm8gIRzsNREdY@discordbot.zgj3l.mongodb.net/sadBot?retryWrites=true&w=majority'

module.exports = {
  init: () => {
      const dbOptions = {
          useNewUrlParser: true,
          autoIndex: false,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 500,
          poolSize: 5,
          connectTimeoutMS: 10000,
          family: 4
      };
      
      mongoose.connect(mongoPath, dbOptions);
      mongoose.set('useFindAndModify', false);
      mongoose.Promise = global.Promise;
      
      mongoose.connection.on('connected', () => {
          console.log('Connected to database');
      });
      
      mongoose.connection.on('err', err => {
          console.error(`Database connection error: \n ${err.stack}`);
      });
      
      mongoose.connection.on('disconnected', () => {
          console.log('Database connection disconnected');
      });
  }
};