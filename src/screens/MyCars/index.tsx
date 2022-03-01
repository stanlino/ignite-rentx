import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Alert, FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'

import { api } from '../../services/api'
import { RootBottomTabsParamList } from '../../routes/app.tabs.routes'

import { Car as ModelCar } from '../../database/models/Car'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentTitle,
  AppointmentQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles'
import { LoadAnimation } from '../../components/LoadAnimation'
import { format } from 'date-fns'
import { getPlatformDate } from '../../utils/getPlatformDate'
import { useFocusEffect } from '@react-navigation/native'

interface CarProps {
  id: string
  user_id: string
  car: ModelCar
  start_date: string
  end_date: string
}

type HomeScreenProps = StackScreenProps<RootBottomTabsParamList, 'MyCars'>

export function MyCars({ navigation } : HomeScreenProps){
  
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[])
  const [isLoading, setIsLoading] = useState(true)

  const { goBack } = navigation

  const { colors } = useTheme()

  useFocusEffect(() => {

    async function fetchCars() {
      try {
        const response = await api.get(`/rentals`)
        setCars(response.data)
      } catch (error) {
        Alert.alert('Ops', 'Houve um erro ao carregar os carros')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()

  })

  return (
    <Container>
      <Header>
        <StatusBar backgroundColor={colors.header} barStyle={'light-content'}/>

        <BackButton color={colors.shape} onPress={() => goBack()}/>

        <Title>
          {`Seus agendamentos \nestão aqui.`}
        </Title>

        <SubTitle>
          Conforto, segurança e particidade!
        </SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
          <AppointmentQuantity>{cars.length}</AppointmentQuantity>
        </Appointments>
      
        {
          isLoading ? <LoadAnimation /> :
          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => 
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{format(getPlatformDate(new Date(item.start_date)), 'dd-MM-yyyy')}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{format(getPlatformDate(new Date(item.end_date)), 'dd-MM-yyyy')}</CarFooterDate> 
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            }
          />
        }
      </Content>
    </Container>
  )
}