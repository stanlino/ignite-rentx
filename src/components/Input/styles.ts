import { RFValue } from 'react-native-responsive-fontsize'
import styled, { css } from 'styled-components/native'

interface FocusProps {
    isFocused: boolean
}

export const Container = styled.View`
    width: 100%;
    flex-direction: row;
    margin-bottom: 4px;
`

export const IconContainer = styled.View<FocusProps>`
    background-color: ${({ theme }) => theme.colors.background_secondary};
    width: 55px;
    height: 55px;

    justify-content: center;
    align-items: center;

    margin-right: 4px;

    border-bottom-width: 2px;
    border-bottom-color: transparent;

    ${({ theme, isFocused }) => isFocused && css`
        border-bottom-color: ${theme.colors.main};
    `}
`

export const InputText = styled.TextInput<FocusProps>`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_secondary};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;

    padding: 0 23px;

    border-bottom-width: 2px;
    border-bottom-color: transparent;

    ${({ theme, isFocused }) => isFocused && css`
        border-bottom-color: ${theme.colors.main};
    `}
`

export const TogglePasswordButton = styled.TouchableOpacity<FocusProps>`
    background-color: ${({ theme }) => theme.colors.background_secondary};
    width: 55px;
    height: 55px;

    justify-content: center;
    align-items: center;

    border-bottom-width: 2px;
    border-bottom-color: transparent;

    ${({ theme, isFocused }) => isFocused && css`
        border-bottom-color: ${theme.colors.main};
    `}
`