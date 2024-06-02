// database/connection.ts
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { CardEntity } from './entities/CardEntity';

const connection = createConnection({
  type: 'react-native',
  database: 'myDatabase.db',
  location: 'default',
  logging: ['error', 'query', 'schema'],
  synchronize: true,
  entities: [CardEntity],
});

export default connection;
