import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { PictureIcon } from '../../assets/svgs';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props {
  setImgUri: (value: string) => void;
}

function ImageUploader({ setImgUri }: Props) {
  const [imageUri, setImageUri] = useState<string>();

  useEffect(() => {
    if (imageUri) {
      setImgUri(imageUri);
    }
  }, [imageUri, setImgUri]);

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
    <Container onPress={selectImage}>
      {imageUri ? (
        <ImageWrapper source={{ uri: imageUri }} />
      ) : (
        <>
          <PictureIcon />
          <TextWrapper>
            사진을 업로드 하거나, {'\n'}
            아래에서 아이콘을 선택해주세요.
          </TextWrapper>
        </>
      )}
    </Container>
  );
}

export default ImageUploader;

const Container = styled.TouchableOpacity`
  background-color: white;
  border-radius: 12px;
  align-items: center;
  padding: 40px 0;
  gap: 20px;
`;

const ImageWrapper = styled.Image`
  width: 100px;
  height: 100px;
`;

const TextWrapper = styled.Text`
  text-align: center;
  color: #8e95a3;
`;
