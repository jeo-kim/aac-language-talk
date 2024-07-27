import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import { Text, Button, Image } from 'react-native';
import { CategoryRepository } from '../../../database/repositories/CategoryRepository';
import { CardRepository } from '../../../database/repositories/CardRepository';
import { CategoryEntity } from '../../../database/entities/CategoryEntity';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title/Title';
import styled from 'styled-components/native';
import Input from '../Input/Input';
import ImageUploader from '../FileUploader/ImageUploader';
import { CloseIcon } from '../../assets/svgs';
import Select from '../Select/Select';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

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

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags(prevTags => [...prevTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleDelteTag = (selected: string) => {
    setTags(tags.filter(tag => tag !== selected));
  };

  const renderItem = useCallback(
    ({ item }) => (
      <CategoryItemWrapper>
        <Image source={item.icon} width={70} height={70} />
        <Text>{item.name}</Text>
      </CategoryItemWrapper>
    ),
    [],
  );

  const selectCategory = (): ReactNode => {
    return <BottomSheetFlatList data={categories} renderItem={renderItem} />;
  };

  return (
    <Container>
      <Wrapper>
        <Title label="카테고리" />
        <Select placeholder="카테고리를 선택해주세요.">
          {selectCategory()}
        </Select>
      </Wrapper>
      <Wrapper>
        <Title label="카드 이름" children={<Text>{name.length}/20</Text>} />
        <Input setValue={setName} placeholder="카드 이름을 입력해주세요." />
      </Wrapper>
      <Wrapper>
        <Title label="카테고리 이미지" />
        <ImageUploader setImgUri={setImageUri} />
        {imageUri ? <Image source={{ uri: imageUri }} /> : null}
      </Wrapper>
      <Wrapper>
        <Title label="검색 태그" children={<Text>{tags.length}/10</Text>} />
        <TagInputWrapper>
          <Input
            setValue={setTagInput}
            placeholder="태그를 입력해주세요."
            clearVal={tagInput ? false : true}
          />
          <Button title="추가" onPress={handleAddTag} />
        </TagInputWrapper>
        <TagsWrapper>
          {tags.map((tag, index) => (
            <TagContainer key={index} onPress={() => handleDelteTag(tag)}>
              <Text>{tag}</Text>
              <CloseIcon width={7} height={7} color="#353C49" />
            </TagContainer>
          ))}
        </TagsWrapper>
      </Wrapper>
      <Button title="저장하기" onPress={handleAddCard} />
    </Container>
  );
}

export default AddCard;

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Wrapper = styled.View`
  padding-bottom: 36px;
`;

const TagInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TagsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  margin-top: 12px;
`;

const TagContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background-color: rgba(142, 149, 163, 0.3);
  border-radius: 4px;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 7px;
  padding-bottom: 7px;
  align-self: flex-start;
`;

const CategoryItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
