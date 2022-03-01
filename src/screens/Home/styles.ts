import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { FlatList, FlatListProps } from 'react-native'
import { Car as ModelCar } from '../../database/models/Car'

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(90)}px;
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

export const CardList = styled(

  FlatList as new (props: FlatListProps<ModelCar>) => FlatList<ModelCar>
  
  ).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showVerticalScrollIndicator: false
})``
