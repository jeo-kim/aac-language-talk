import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  setValue: (value: string) => void;
  clearVal?: boolean;
  placeholder: string;
}

function Input({ setValue, placeholder, clearVal }: Props) {
  const [text, setText] = useState('');

  const debouncedValue = useDebounce(text, 300);

  useEffect(() => {
    setValue(debouncedValue);
  }, [debouncedValue, setValue]);

  useEffect(() => {
    if (clearVal) {
      setText('');
    }
  }, [clearVal]);

  const handleTextChange = (val: string) => {
    setText(val);
  };

  return (
    <InputWrapper>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#8e95a3"
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
  flex: 1;
`;
