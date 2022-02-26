import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'

import { RootStackParamList } from '../../routes/app.stack.routes'

import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

import { api } from '../../services/api'
import { CarDTO } from '../../dtos/carDto'

import {
  CardList,
  Container, 
  Header, 
  TotalCars,
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
        Alert.alert('Ops', 'Houve um erro ao buscar os dados na api')
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
        {cars.length > 0 && <TotalCars>Total de {cars.length} carros</TotalCars>}
      </Header>

      { cars.length > 0 ?  
        <CardList 
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Car data={item} onPress={() => handleNavigateToCarDetails(item)} />
          }
        /> : <LoadAnimation />
      }

    </Container>
  )
}