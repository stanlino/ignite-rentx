import React, { useEffect, useRef, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'
import { Alert, Keyboard, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'

import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/auth'

import { RootBottomTabsParamList } from '../../routes/app.tabs.routes'

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  ChangePhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles'
import { Button } from '../../components/Button'
import { string } from 'yup/lib/locale'

type Option = 'data-edit' | 'password-edit'

type ProfileScreenProps = StackScreenProps<RootBottomTabsParamList, 'Profile'>

export function Profile({
  navigation: {
    goBack
  }
} : ProfileScreenProps){

  const { colors } = useTheme()
  const { user, signOut, updateUser } = useAuth()

  const [option, setOption] = useState<Option>('data-edit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)

  const containerRef = useRef<ScrollView | null>(null)
  const scrollViewRef = useRef<ScrollView | null>(null)

  async function handleSignOut() {
    try {
      Alert.alert('Encerrar sessão', 'Deseja se desconectar do app?', [
        {text: 'Não' },
        {
          text: 'Sim',
          onPress: signOut
        }
      ])
    } catch {
      Alert.alert('Ops', 'Um erro ocorreu ao realizar o logout')
    }
  }

  function handleOptionChange() {
    if (option === 'data-edit') {
      setOption('password-edit')
    } else {
      setOption('data-edit')
    }
  }

  async function handleSelectAvatar() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      })
  
      if(result.cancelled){
        return;
      }
      
      if (result.uri) {
        setAvatar(result.uri)
      }
    } catch (err) {
      Alert.alert('Não foi possível acessar a galeria :(')
    }

  }

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O campo "nome" precisa ser preenchido!')
      })

      await schema.validate({ name })

      await updateUser({
        ...user,
        name,
        avatar
      })

      Alert.alert('Concluído!', 'Perfil atualizado com sucesso!')

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops', error.message)
      } else {
        Alert.alert('Ops', 'Houve um erro ao atualizar o perfil :(')
      }
    }
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      containerRef.current?.scrollToEnd({ animated: true })
    })
  },[])

  useEffect(() => {
    if (option === 'data-edit') {
      scrollViewRef.current?.scrollTo({ x: 0, animated: true })
    } else {
      scrollViewRef.current?.scrollToEnd({animated: true})
    }
  }, [option])

  return (
    <Container ref={containerRef} keyboardShouldPersistTaps="handled" >
      <Header>
        <HeaderTop>
          <BackButton color={colors.shape} onPress={goBack}/>
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather 
              name='power'
              size={24}
              color={colors.shape}
            />
          </LogoutButton>
        </HeaderTop>
        <PhotoContainer>
          {!!avatar && <Photo source={{ uri: avatar }} /> }
          <ChangePhotoButton onPress={handleSelectAvatar}>
            <Feather 
              name='camera'
              size={24}
              color={colors.shape}
            />
          </ChangePhotoButton>
        </PhotoContainer>
      </Header>

      <Content>
        
        <Options>
          <Option 
            active={option === 'data-edit'}
            onPress={handleOptionChange}
          >
            <OptionTitle active={option === 'data-edit'}>Dados</OptionTitle>
          </Option>
          <Option 
            active={option === 'password-edit'}
            onPress={handleOptionChange}
          >
            <OptionTitle active={option === 'password-edit'}>Trocar senha</OptionTitle>
          </Option>
        </Options>

        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <Section>
            <Input 
              iconName='user'
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              defaultValue={name}
              onChangeText={setName}
            />
            <Input 
              iconName='mail'
              editable={false}
              defaultValue={user.email}
            />
            <Input 
              iconName='credit-card'
              editable={false}
              defaultValue={user.driver_license}
            />
          </Section>

          <Section>
            <Input 
              iconName='lock'
              placeholder='Senha atual'
              autoCapitalize='none'
              autoCorrect={false}
              isPassword
            />
            <Input 
              iconName='lock'
              placeholder='Nova senha'
              autoCapitalize='none'
              autoCorrect={false}
              isPassword
            />
            <Input 
              iconName='lock'
              placeholder='Confirme a nova senha'
              autoCapitalize='none'
              autoCorrect={false}
              isPassword
            />
          </Section>
        </ScrollView>

        <Button 
          title='Salvar alterações'
          style={{ marginVertical: 12 }}
          onPress={handleProfileUpdate}
        />

      </Content>
    </Container>
  )
}