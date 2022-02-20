import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

interface ButtonProps extends RectButtonProps {
  color: string
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  background-color: ${({theme, color }) => 
    color ? color : theme.colors.main
  };

  padding: 19px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color:  ${({theme}) => theme.colors.shape};
`