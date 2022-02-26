import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
 
export const Container = styled.ScrollView`
  
  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
    width: 100%;
    margin-top: 116px;
`

export const Title = styled.Text`
    font-size: ${RFValue(40)}px;
    font-family: ${({ theme }) => theme.fonts.secundary_600};

    color: ${({ theme }) => theme.colors.title};
`

export const SubTitle = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.primary_400};

    line-height: ${RFValue(25)}px;

    margin-top: 16px;

    color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View``

export const Form = styled.View`
    width: 100%;
    margin: 64px 0px;
`