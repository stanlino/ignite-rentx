import React from 'react'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import SpeedSvg from '../../assets/speed.svg'
import AcelerationSvg from '../../assets/acceleration.svg'
import ForceSvg from '../../assets/force.svg'
import GasolineSvg from '../../assets/gasoline.svg'
import ExchangeSvg from '../../assets/exchange.svg'
import PeopleSvg from '../../assets/people.svg'

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer
} from './styles'

export function CarDetails(){
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      
      <CarImages>
        <ImageSlider 
          imagesUrl={['http://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborguini</Brand>
            <Name>Buracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory 
            name="380km/h"
            icon={SpeedSvg}
          />
          <Accessory 
            name="3.2s"
            icon={AcelerationSvg}
          />
          <Accessory 
            name="800 HP"
            icon={ForceSvg}
          />
          <Accessory 
            name="Consumo"
            icon={GasolineSvg}
          />
          <Accessory 
            name="Auto"
            icon={ExchangeSvg}
          />
          <Accessory 
            name="2 pessoas"
            icon={PeopleSvg}
          />
        </Acessories>

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A cupiditate
          exercitationem molestias blanditiis quis vero odio non, asperiores
          facere repellat atque.
        </About>

      </Content>

      <Footer>
        <Button title='Confirmar' onPress={() => {}} />
      </Footer>

    </Container>
  )
}