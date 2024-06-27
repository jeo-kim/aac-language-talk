import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { CategoryRepository } from '../../../database/repositories/CategoryRepository';
import { CardRepository } from '../../../database/repositories/CardRepository';
import { launchImageLibrary } from 'react-native-image-picker';
import { CategoryEntity } from '../../../database/entities/CategoryEntity';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title/Title';

function AddCard() {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRepo = new CategoryRepository();
        const categoriesData = await categoryRepo.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCard = async () => {
    try {
      const cardRepo = new CardRepository();
      await cardRepo.createCard({ name, image: imageUri }, categoryIds, tags);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding card: ', error);
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
        setImageUri(uri);
      }
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags(prevTags => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Title label="카테고리" />
        <MultiSelect
          items={categories}
          uniqueKey="id"
          onSelectedItemsChange={setCategoryIds}
          selectedItems={categoryIds}
          selectText="카테고리 선택"
          searchInputPlaceholderText="카테고리 검색..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#cccccc' }}
          submitButtonColor="#48d22b"
          submitButtonText="확인"
        />
        <Title label="카드 이름" />
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Title label="카드 이미지" />
        <Button title="이미지 선택" onPress={selectImage} />
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : null}

        <Title label="태그" />
        <View style={styles.tagInputContainer}>
          <TextInput
            style={styles.input}
            value={tagInput}
            onChangeText={setTagInput}
          />
          <Button title="추가" onPress={handleAddTag} />
        </View>

        <View style={styles.tagList}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <Text>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="저장하기" onPress={handleAddCard} />
        </View>
      </ScrollView>
    </View>
  );
}

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
  },
  tagInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tagItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
    margin: 4,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
});
