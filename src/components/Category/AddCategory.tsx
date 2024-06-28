import React, { useState } from 'react';
import { Button, Text } from 'react-native';
import { CategoryRepository } from '../../../database/repositories/CategoryRepository';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title/Title';
import Input from '../Input/Input';
import styled from 'styled-components/native';
import ImageUploader from '../FileUploader/ImageUploader';

function AddCategory() {
  const navigation = useNavigation();

  const [name, setName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string>('');

  const handleAddCategory = async () => {
    try {
      const categoryRepo = new CategoryRepository();
      await categoryRepo.createCategory({ icon: imageUri, name });
      navigation.goBack();
    } catch (error) {
      console.error('Error adding category: ', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title label="카테고리 이름" children={<Text>{name.length}/20</Text>} />
        <Input setValue={setName} />
      </Wrapper>
      <Wrapper>
        <Title label="카테고리 이미지" />
        <ImageUploader setImgUri={setImageUri} />
      </Wrapper>
      <Button title="저장하기" onPress={handleAddCategory} />
    </Container>
  );
}

export default AddCategory;

const Container = styled.View`
  flex: 1;
  padding: 16px;
  gap: 36px;
`;

const Wrapper = styled.View``;
