import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import LogoSvg from '../../assets/logo.svg'
import { Car, CarData } from '../../components/Car'

import {
  CardList,
  Container, 
  Header, 
  TotalCars
} from './styles'

export function Home(){

  const carData: CarData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'http://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }

  return (
    <Container>
      <StatusBar 
        backgroundColor={'transparent'} 
        barStyle={'light-content'}
        translucent
      />
      <Header>
        <LogoSvg width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      <CardList 
        data={[1,2,3,4,5]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={carData} />}
      />

    </Container>
  )
}