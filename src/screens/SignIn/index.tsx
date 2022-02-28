import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'

import { 
  StatusBar,
  Alert,
  Keyboard,
  ScrollView
} from 'react-native'

import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { useAuth } from '../../hooks/auth'
import { RootStackAuthParamList } from '../../routes/auth.routes'

import {
  Container, 
  Header, 
  SubTitle, 
  Title,
  Form,
  Footer
} from './styles'

type SignInScreenProps = StackScreenProps<RootStackAuthParamList, 'SignIn'>

export function SignIn({ navigation: { navigate } } : SignInScreenProps){

  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignIn() {
    const schema = Yup.object().shape({
      password: Yup.string()
        .required('A senha é obrigatória'),
      email: Yup.string()
        .required('E-mail é obrigatório')
        .email('Digite um e-mail válido')
    })

    try {
      await schema.validate({ password, email })

      await signIn({email, password})
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
          return Alert.alert('Opa', error.message)
      }

      Alert.alert('Opa', 'Ocorreu um erro ao fazer login, verifique as credenciais')
    }  
  }

  function handleNavigateToSignUp() {
      navigate('SignUpFirstStep')
  }

  const ScrollViewRef = useRef<ScrollView | null>(null)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      ScrollViewRef.current?.scrollToEnd({ animated: true })
    })
  },[])

  return (
    <Container keyboardShouldPersistTaps={'always'} ref={ScrollViewRef}>

      <Header>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />

        <Title>
            Estamos{'\n'}quase lá
        </Title>
        <SubTitle>
            Faça seu login para começar{'\n'}
            uma experiência incrível!
        </SubTitle>
      </Header>
        
      <Form>
        <Input 
          iconName='mail' 
          placeholder='E-mail'
          keyboardType='email-address'
          autoCorrect={false}
          autoCapitalize={'none'}
          onChangeText={setEmail}
          value={email}
        />
          
          <Input 
            iconName='lock' 
            placeholder='Senha'
            autoCorrect={false}
            autoCapitalize={'none'}   
            isPassword         
            onChangeText={setPassword}
            value={password}
          />
      </Form>

      <Footer>
        <Button 
          title='Login'
          onPress={handleSignIn}
          enabled={true}
          loading={false}
          style={{ marginBottom: 8 }}
        />
        <Button 
          title='Criar conta gratuíta'
          onPress={handleNavigateToSignUp}
          enabled={true}
          loading={false}
          color={'transparent'}
          light
        />
      </Footer>
    
    </Container>          
  )
}