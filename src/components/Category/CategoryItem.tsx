import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { CategoryItemProps } from '../../types/Category';

function CategoryItem({ icon, name, id }: CategoryItemProps) {
  return (
    <View style={styles.view}>
      <Image src={icon} alt={'icon' + id} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

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
    fontSize: RFValue(20),
    fontWeight: '700',
  },
});
