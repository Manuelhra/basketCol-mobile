import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
import { Theme } from 'react-native-calendars/src/types';
import { useSelector } from 'react-redux';

import { getStyles } from './styles';
import { RootState } from '../../store/redux/rootReducer';

// Customize locale configuration
LocaleConfig.locales.es = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
};
LocaleConfig.defaultLocale = 'es';

type EnhancedCalendarComponentProps = {
  enhancedMarkedDates: Record<string, { marked: boolean; dotColor: string; description: string }>;
  onDayPress?: (day: DateData) => void;
};

export function EnhancedCalendarComponent({
  enhancedMarkedDates,
  onDayPress,
}: EnhancedCalendarComponentProps): React.JSX.Element {
  const { theme } = useSelector((state: RootState) => state.theme);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const styles = getStyles();

  // Custom calendar theme
  const calendarTheme: Theme = {
    backgroundColor: theme.colors.background,
    calendarBackground: theme.colors.background,
    textSectionTitleColor: theme.colors.primary,
    selectedDayBackgroundColor: theme.colors.primary,
    selectedDayTextColor: theme.colors.background,
    todayTextColor: theme.colors.secondary,
    dayTextColor: theme.colors.text,
    dotColor: theme.colors.primary,
    selectedDotColor: theme.colors.background,
    arrowColor: theme.colors.primary,
    monthTextColor: theme.colors.primary,
  };

  const handleDayPress = (day: DateData) => {
    // Update selected date
    setSelectedDate(day.dateString);

    // Call external onDayPress if provided
    if (onDayPress) {
      onDayPress(day);
    }

    // Optional: Log additional information about marked dates
    const markedDateInfo = enhancedMarkedDates[day.dateString as keyof typeof enhancedMarkedDates];
    if (markedDateInfo) {
      console.log('Marked Date Details:', markedDateInfo.description);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Basic Configuration
        current="2025-01-01"
        minDate="2024-01-01"
        maxDate="2026-12-31"
        // Marking and Selection
        markedDates={{
          ...enhancedMarkedDates,
          ...(selectedDate ? {
            [selectedDate]: {
              selected: true,
              selectedColor: theme.colors.primary,
            },
          } : {}),
        }}
        // Appearance
        theme={calendarTheme}
        // Interaction
        onDayPress={handleDayPress}
        // Localization
        locale="es"
        // Customization
        enableSwipeMonths
        firstDay={1} // Start week on Monday
        // Additional Options
        hideArrows={false}
        disableMonthChange={false}
      />
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Fecha Seleccionada:
            {' '}
            {selectedDate}
          </Text>
          {enhancedMarkedDates[selectedDate as keyof typeof enhancedMarkedDates] && (
            <Text style={styles.eventDescriptionText}>
              Evento:
              {' '}
              {enhancedMarkedDates[selectedDate as keyof typeof enhancedMarkedDates].description}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
