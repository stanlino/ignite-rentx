import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '../../routes/app.routes'

import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/carDto'

import {
  CardList,
  Container, 
  Header, 
  TotalCars
} from './styles'

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation } : HomeScreenProps){

  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[])

  const { navigate } = navigation
  const { colors } = useTheme()

  function handleNavigateToCarDetails(car: CarDTO) {
    navigate('CarDetails', { car })
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCars(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCars()
 
  },[])

  return (
    <Container>
      <StatusBar 
        backgroundColor={colors.header} 
        barStyle={'light-content'}
      />
      <Header>
        <LogoSvg width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de 12 carros</TotalCars>
      </Header>

      <CardList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
        }
        ListEmptyComponent={() => <Load />}
      />

    </Container>
  )
}