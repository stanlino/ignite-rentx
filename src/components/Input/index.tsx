import React, { useReducer,  useState } from 'react'
import { useTheme } from 'styled-components'
import { TextInputProps } from 'react-native'
import { Feather } from '@expo/vector-icons'

import {
  Container,
  IconContainer,
  InputText,
  TogglePasswordButton
} from './styles'

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']
    isPassword?: boolean
    value?: string
}

export function Input({ 
    iconName, 
    isPassword = false,
    value,
    ...rest 
} : InputProps){

    const [secureTextEntry, toggleSecureTextEntry] = useReducer(isVisible => !isVisible, true)

    const [ isFocused, setIsFocused] = useState(false)
    const [ isFilled, setIsFilled] = useState(false)

    const { colors } = useTheme()

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!value)
    }

    return (
        <Container>
            <IconContainer isFocused={isFocused}>
                <Feather 
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? colors.main : colors.text_detail}
                />
            </IconContainer>

            <InputText 
                {...rest} 
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
                secureTextEntry={isPassword ? secureTextEntry : false}
                style={isPassword ? {paddingRight: 0} : {}} 
                isFocused={isFocused}
            />

            { isPassword && (
                <TogglePasswordButton
                    isFocused={isFocused}
                    onPress={toggleSecureTextEntry}
                >
                    <Feather 
                        name={secureTextEntry ? 'eye' : 'eye-off'}
                        size={24}
                        color={colors.text_detail}
                    />
                </TogglePasswordButton>
            ) }

        </Container>
    )
}