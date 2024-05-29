// src/App.tsx
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import connection from './database/connection';
import {CardRepository} from './database/repositories/CardRepositories';

const App = () => {
  useEffect(() => {
    (async () => {
      await connection;
      const cardRepository = new CardRepository();

      // Create a new card
      const newCard = await cardRepository.createCard({
        card_name: 'Sample Card',
        category_uid: 1,
        card_image: null,
        bookmarked: 0,
      });

      console.log('Created new card:', newCard);

      // Fetch all cards
      const allCards = await cardRepository.getAllCards();
      console.log('All cards:', allCards);

      // Update a card
      await cardRepository.updateCard(newCard.uid, {
        card_name: 'Updated Sample Card',
      });

      // Fetch card by id
      const updatedCard = await cardRepository.getCardById(newCard.uid);
      console.log('Updated card:', updatedCard);

      // Delete a card
      await cardRepository.deleteCard(newCard.uid);
      console.log('Card deleted');
    })();
  }, []);

  return (
    <View>
      <Text>Check your console for database logs.</Text>
    </View>
  );
};

export default App;
