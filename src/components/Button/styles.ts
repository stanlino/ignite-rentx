import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

interface ButtonProps {
  color: string
  loading: boolean
}

interface ButtonTitleProps {
  light: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  background-color: ${({theme, color }) => 
    color ? color : theme.colors.main
  };

  opacity: ${({ enabled, loading }) => !enabled || loading ? 0.5 : 1};

  padding: 19px;

  align-items: center;
  justify-content: center;
`

export const Title = styled.Text<ButtonTitleProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color:  ${({theme, light}) => 
    light ? theme.colors.header : theme.colors.shape
  };

`