import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
};

function CategoryItem({ title }: Props) {
  return (
    <View style={styles.view}>
      <Text>{title}</Text>
    </View>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#6cb1f7',
    width: '100%',
  },
});
