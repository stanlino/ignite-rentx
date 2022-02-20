import React from 'react'
import {
    Calendar as CustomCalendar,
    LocaleConfig
} from 'react-native-calendars'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
}

LocaleConfig.defaultLocale = 'pt-br'

export function Calendar(){
    const { colors, fonts } = useTheme()

  return (
    <CustomCalendar 
        renderArrow={( direction ) => 
            <Feather 
                size={24} 
                color={colors.shape} 
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
            />
        }
        headerStyle={{
            backgroundColor: colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10
        }}
        theme={{
            textDayFontFamily: fonts.primary_400,
            textDayHeaderFontFamily: fonts.primary_500,
            textDayHeaderFontSize: 10,
            textMonthFontSize: 20,
            textMonthFontWeight: 'bold',
            textMonthFontFamily: fonts.secundary_500,
            arrowStyle: {
                marginHorizontal: -15
            }
        }}
        firstDay={1}
        minDate={String(new Date())}
    />
  )

}