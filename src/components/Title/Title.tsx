import React, { ReactNode } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  label: string;
  children?: ReactNode;
}

function Title({ label, children }: Props) {
  return (
    <Container>
      <TextWrapper>{label}</TextWrapper>
      <RightWrapper children={children} />
    </Container>
  );
}

export default Title;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${() => RFValue(16)}px;
`;

const TextWrapper = styled.Text`
  font-size: ${() => RFValue(20)}px;
  font-weight: 700;
`;

const RightWrapper = styled.View`
  color: #595f72;
`;
