// database/database.ts
import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase(
  {
    name: 'myDatabase.db',
    location: 'default',
  },
  () => {
    console.log('Database opened');
  },
  error => {
    console.log('Error opening database: ', error);
  },
);

export default database;
