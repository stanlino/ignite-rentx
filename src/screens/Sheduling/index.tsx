import React from 'react'
import { useTheme } from 'styled-components'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Button'
import { BackButton } from '../../components/BackButton'
import { Calendar } from '../../components/Calendar'

import ArrowSvg from '../../assets/arrow.svg'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from './styles'

export function Sheduling(){
  
  const { colors } = useTheme()

  const { navigate, goBack } = useNavigation<any>()

  function handleNavigateToShedulingDetails() {
    navigate('ShedulingDetails')
  }

  return (
  <Container>
    <Header>
      <StatusBar translucent={false} backgroundColor={colors.header} barStyle={'light-content'}/>

      <BackButton color={colors.shape} onPress={() => goBack()}/>

      <Title>
        {`Escolha uma \ndata de inicio e \nfim do aluguel`}
      </Title>

      <RentalPeriod>
        <DateInfo>
          <DateTitle>DE</DateTitle>
          <DateValue selected={false}></DateValue>
        </DateInfo>

        <ArrowSvg />

        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue selected={false}></DateValue>
        </DateInfo>
      </RentalPeriod>
    </Header>

    <Content>
      <Calendar />
    </Content>

    <Footer>
      <Button title='Confirmar' onPress={handleNavigateToShedulingDetails} />
    </Footer>
  </Container>
  )
}