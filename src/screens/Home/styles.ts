import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.header};

  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 32px 24px;

`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(15)}px;
`

export const CardList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})``