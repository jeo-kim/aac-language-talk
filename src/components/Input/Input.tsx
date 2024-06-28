import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  setValue: (value: string) => void;
}

function Input({ setValue }: Props) {
  const [text, setText] = useState('');

  const debouncedValue = useDebounce(text, 300);

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  return (
    <InputWrapper>
      <TextInput
        placeholder="카테고리 이름을 입력해주세요."
        onChangeText={handleTextChange}
        value={text}
        maxLength={20}
      />
    </InputWrapper>
  );
}

export default Input;

const InputWrapper = styled.View`
  background-color: white;
  font-size: ${RFValue(16)}px;
  padding: 17px 15px;
  border-radius: 12px;
`;
