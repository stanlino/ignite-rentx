import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'

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
  TotalCars,
  MyCarsButton
} from './styles'

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>

export function Home({ navigation } : HomeScreenProps){

  const [cars, setCars] = useState<CarDTO[]>([] as CarDTO[])

  const { navigate } = navigation
  const { colors } = useTheme()

  function handleNavigateToCarDetails(car: CarDTO) {
    navigate('CarDetails', { car })
  }

  function handleNavigateToMyCars() {
    navigate('MyCars')
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
        translucent={false}
      />
      <Header>
        <LogoSvg width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>Total de {cars.length} carros</TotalCars>
      </Header>

      <CardList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
        }
        ListEmptyComponent={() => <Load />}
      />

      <MyCarsButton onPress={handleNavigateToMyCars}>
        <Ionicons name='ios-car-sport' size={32} color={colors.shape} />
      </MyCarsButton>

    </Container>
  )
}