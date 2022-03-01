import React, { useEffect, useState } from 'react'
import { Alert, StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { StackScreenProps } from '@react-navigation/stack'
import { synchronize } from '@nozbe/watermelondb/sync'
import { useNetInfo } from '@react-native-community/netinfo'
import { CarDTO } from '../../dtos/CarDTO'

import { RootStackParamList } from '../../routes/app.stack.routes'

import LogoSvg from '../../assets/logo.svg'
import { Car } from '../../components/Car'
import { LoadAnimation } from '../../components/LoadAnimation'

import { database } from '../../database'
import { Car as ModelCar } from '../../database/models/Car'
import { api } from '../../services/api'

import {
  CardList,
  Container, 
  Header, 
  TotalCars,
} from './styles'

type HomeScreenProps = StackScreenProps<RootStackParamList, 'AppTabRoutes'>

export function Home({ navigation } : HomeScreenProps){

  const [cars, setCars] = useState<ModelCar[]>([] as ModelCar[])

  const { navigate } = navigation
  const { colors } = useTheme()
  const { isConnected } = useNetInfo()

  function handleNavigateToCarDetails(car: ModelCar) {
    navigate('CarDetails', { car })
  }

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)
        const { changes, latestVersion } = response.data
        return { changes, timestamp: latestVersion }
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users
        await api.post('/users/sync', user)
          .catch(() => {})
      }
    })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()
        if (isMounted) {
          setCars(cars)
        }
      } catch (error) {
        Alert.alert('Ops', 'Houve um erro ao buscar os dados na api')
      }
    }

    fetchCars()

    return () => {
      isMounted = false
    }
 
  },[])

  useEffect(() => {
    if (isConnected) {
      offlineSynchronize()
    }
  }, [isConnected])

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