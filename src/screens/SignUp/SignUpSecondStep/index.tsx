import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from 'styled-components/native'
import { 
  Keyboard, 
  ScrollView, 
  StatusBar, 
  Alert
} from 'react-native'

import { Bullet } from '../../../components/Bullet'
import { BackButton } from '../../../components/BackButton'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import { RootStackAuthParamList } from '../../../routes/auth.routes'

import { api } from '../../../services/api'

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from './styles'

type SignUpSecondStepScreenProps = StackScreenProps<RootStackAuthParamList, 'SignUpSecondStep'>

export function SignUpSecondStep({ 
  navigation: {
    navigate,
    goBack
  }, route: { params }
} : SignUpSecondStepScreenProps){

  const [password, setPassword] = useState('')

  const { data } = params

  const { colors } = useTheme()

  const ScrollViewRef = useRef<ScrollView | null>(null)

  async function handleRegister() {
    if (!password) {
      return Alert.alert('Ops', 'Por favor, informe uma senha')
    }

    await api.post('/users', {
      name: data.name,
      email: data.email,
      driver_license: data.driverLicense,
      password
    })
    .then(() => {
      navigate('Confirmation', {
        nextScreenName: 'SignIn',
        message: 'Eu te disse que seria fácil!',
        title: 'Conta criada!'
      })
    })
    .catch(error => {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível realizar o cadastro :(')
    })
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
        <FormTitle>2. Crie uma senha</FormTitle>
        <Input 
          iconName='lock' 
          placeholder='Senha'
          isPassword
          autoCapitalize='none'
          onChangeText={setPassword}
          value={password}
        />
      </Form>

      <Button 
        title='Cadastrar'
        color={colors.success}
        style={{ marginBottom: 24 }}
        onPress={handleRegister}
      />
    </Container> 
  )
}