import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CategoryItemProps } from '../../types/Category';
import { CardRepository } from '../../../database/repositories/CardRepository';

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, name, id }) => {
  const handlePress = async () => {
    try {
      const cardRepo = new CardRepository();
      const cards = await cardRepo.getCardsByCategoryId(id);
      Alert.alert('카드 리스트', JSON.stringify(cards, null, 2));
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.view} onPress={handlePress}>
      <Image source={{ uri: icon }} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 80,
    margin: 13,
    borderRadius: 8,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: RFValue(24),
    fontWeight: '700',
  },
});
