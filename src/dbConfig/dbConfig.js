import mongoose from 'mongoose';

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('database connection successful.');
    });

    connection.on('error', (error) => {
      console.log('error while connecting to database.');
      console.log('-------------------------------------');
      console.log(error);
      console.log('-------------------------------------');
      process.exit();
    });
  } catch (error) {
    console.log('something went wrong.');
    console.log('-------------------------------------');
    console.log(error);
    console.log('-------------------------------------');
  }
}

export default connect;
