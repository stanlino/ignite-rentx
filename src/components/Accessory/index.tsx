import React from 'react'
import { SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components'

import {
  Container,
  Name
} from './styles'

interface Props {
    name: string
    icon: React.FC<SvgProps>
}

export function Accessory({ name, icon: Icon } : Props){

  const {colors} = useTheme()

  return (
    <Container>
        <Icon fill={colors.title} width={32} height={32} />
        <Name>{name}</Name>
    </Container>
  )
}