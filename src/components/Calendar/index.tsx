import React from 'react'
import {
    Calendar as CustomCalendar,
    LocaleConfig
} from 'react-native-calendars'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { pt_br } from './localeConfig'
import { CalendarProps } from 'react-native-calendars'

LocaleConfig.locales['pt-br'] = pt_br
LocaleConfig.defaultLocale = 'pt-br'

export interface MarkedDateProps {
    [date: string]: {
        color: string
        textColor: string
        disabled?: boolean
        disabledTouchEvent?: boolean
    }
}

export interface DayProps {
    dateString?: string
    day: number
    month: number
    year: number
    timestamp: number
}

export function Calendar({ 
    markedDates,
    onDayPress
} : CalendarProps){
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
            marginBottom: 10,
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

        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}
    />
  )

}