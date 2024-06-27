import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Image, Text } from 'react-native';
import { CategoryRepository } from '../../../database/repositories/CategoryRepository';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title/Title';

function AddCategory() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handleAddCategory = async () => {
    try {
      const categoryRepo = new CategoryRepository();
      await categoryRepo.createCategory({ icon: imageUri, name });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setImageUri(uri ?? '');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Title label="카테고리 이름" children={<Text>10/20</Text>} />
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Title label="카테고리 이미지" />
      <Button title="이미지 선택" onPress={selectImage} />
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}
      <Button title="저장하기" onPress={handleAddCategory} />
    </View>
  );
}

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
});
