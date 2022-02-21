import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { Alert, FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'
import { Car } from '../../components/Car'
import { Load } from '../../components/Load'

import { api } from '../../services/api'

import { RootStackParamList } from '../../routes/app.routes'
import { CarDTO } from '../../dtos/carDto'

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

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startDate: string
  endDate: string
}

type HomeScreenProps = StackScreenProps<RootStackParamList, 'MyCars'>

export function MyCars({ navigation } : HomeScreenProps){
  
  const [cars, setCars] = useState<CarProps[]>([] as CarProps[])
  const [isLoading, setIsLoading] = useState(true)

  const { goBack } = navigation

  const { colors } = useTheme()

  useEffect(() => {

    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=2`)

        setCars(response.data)
      } catch (error) {
        Alert.alert('Ops', 'Houve um erro ao carregar os carros')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()

  }, [])

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
          isLoading ? <Load /> :
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
                    <CarFooterDate>{item.startDate}</CarFooterDate>

                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={colors.title}
                      style={{ marginHorizontal: 10 }}
                    />

                    <CarFooterDate>{item.endDate}</CarFooterDate> 
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