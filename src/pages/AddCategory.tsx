import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { CategoryRepository } from '../../database/repositories/CategoryRepository';

type Props = {
  navigation: any;
};

function AddCategory({ navigation }: Props) {
  const [name, setName] = useState('');

  const handleAddCategory = async () => {
    try {
      const categoryRepo = new CategoryRepository();
      await categoryRepo.createCategory({ icon: '', name: name });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>카테고리 이름</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Button title="추가" onPress={handleAddCategory} />
    </View>
  );
}

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
