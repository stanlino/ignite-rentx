import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { 
  Keyboard, 
  ScrollView, 
  StatusBar,
  Alert
} from 'react-native'
import * as Yup from 'yup'

import { Bullet } from '../../../components/Bullet'
import { BackButton } from '../../../components/BackButton'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { RootStackParamList } from '../../../routes/app.stack.routes'

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'

type SignUpFirstStepScreenProps = StackScreenProps<RootStackParamList, 'SignUpFirstStep'>

export function SignUpFirstStep({ 
  navigation: {
    navigate,
    goBack
  }
} : SignUpFirstStepScreenProps){

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [driverLicense, setDriverLicense] = useState('')

  const ScrollViewRef = useRef<ScrollView | null>(null)

  async function handleNavigateToNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        email: Yup.string()
          .required('E-mail é obrigatório')
          .email('E-mail inválido'),
        name: Yup.string()
          .required('Nome é obrigatório')
      })

      const data = { name, email, driverLicense }

      await schema.validate(data)
      navigate('SignUpSecondStep', { data })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Ops', error.message)
      }
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      ScrollViewRef.current?.scrollToEnd({ animated: true })
    })
  },[])

  return (
    <Container keyboardShouldPersistTaps={'always'} ref={ScrollViewRef}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      
      <Header>
        <BackButton onPress={() => goBack()} />
        <Steps>
          <Bullet active/>
          <Bullet />
        </Steps>
      </Header>
      
      <Title>
        Crie sua{'\n'}conta
      </Title>
      <SubTitle>
        Faça seu cadastro de{'\n'}
        forma rápida e fácil!
      </SubTitle>

      <Form>
        <FormTitle>1. Dados</FormTitle>
        <Input 
          iconName='user' 
          placeholder='Nome'
          onChangeText={setName}
          value={name}
        />
        <Input 
          iconName='mail' 
          placeholder='E-mail' 
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
        />
        <Input 
          iconName='credit-card' 
          placeholder='CNH'
          keyboardType='number-pad'
          onChangeText={setDriverLicense}
          value={driverLicense}
        />
      </Form>

      <Button 
        title='Próximo'
        style={{ marginBottom: 24 }}
        onPress={handleNavigateToNextStep}
      />
    </Container> 
  )
}