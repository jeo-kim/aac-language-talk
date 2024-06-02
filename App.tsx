/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppInner from './AppInner';
import { CardRepository } from './database/repositories/CardRepositories';
import connection from './database/connection';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F6F8',
  },
};

function App(): React.JSX.Element {
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
    <NavigationContainer theme={theme}>
      <AppInner />
    </NavigationContainer>
  );
}

export default App;
