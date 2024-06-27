import React, { useEffect, useState } from 'react';
import AddCard from '../components/Card/AddCard';
import AddCategory from '../components/Category/AddCategory';
import { RFValue } from 'react-native-responsive-fontsize';
import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

type RouteParams = {
  AddCategory: {
    id: string;
  };
};

function AddItems() {
  const [value, setValue] = useState<string>('1');

  const route = useRoute<RouteProp<RouteParams, 'AddCategory'>>();
  const { id } = route.params;

  useEffect(() => {
    if (id) {
      setValue(id.toString());
    }
  }, [id]);

  const handleValue = (param: string) => {
    if (value !== param) {
      setValue(param);
    }
  };

  return (
    <Container>
      <ToggleWrapper>
        <ToggleButton onPress={() => handleValue('1')} $isFocus={value === '1'}>
          <ToggleText $isFocus={value === '1'}>카테고리</ToggleText>
        </ToggleButton>
        <ToggleButton onPress={() => handleValue('2')} $isFocus={value === '2'}>
          <ToggleText $isFocus={value === '2'}>카드</ToggleText>
        </ToggleButton>
      </ToggleWrapper>
      {value === '1' ? <AddCategory /> : <AddCard />}
    </Container>
  );
}

export default AddItems;

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const ToggleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  margin: 16px;
  border-radius: 24px;
`;

const ToggleButton = styled.TouchableOpacity<{ $isFocus: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: ${prop => (prop.$isFocus ? '#34c185' : 'transparent')};
`;

const ToggleText = styled.Text<{ $isFocus: boolean }>`
  color: ${prop => (prop.$isFocus ? 'white' : '#8e95a3')};
  font-size: ${() => RFValue(20)}px;
  font-weight: 600;
  padding: 8px;
`;
