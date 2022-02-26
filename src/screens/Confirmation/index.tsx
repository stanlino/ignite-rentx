import React from 'react'
import { useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '../../routes/app.routes'

import { ConfirmButton } from '../../components/ConfirmButton'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles'
import { useTheme } from 'styled-components/native'

type ConfirmationScreenProps = StackScreenProps<RootStackParamList, 'Confirmation'>

export function Confirmation({
  navigation: { navigate },
  route: { params }
} : ConfirmationScreenProps){

  const { width } = useWindowDimensions()

  const { colors } = useTheme()

  function handleConfirm() {
    navigate(params.nextScreenName)
  }

  return (
    <Container>
        <StatusBar backgroundColor={colors.header} style="light" />

        <LogoSvg width={width} />

        <Content>
          <DoneSvg width={80} height={80} />
          <Title>{params.title}</Title>

          <Message>
            {params.message}
          </Message>
        </Content>

        <Footer>
          <ConfirmButton onPress={handleConfirm} title='ok' />
        </Footer>
    </Container>
  )
}