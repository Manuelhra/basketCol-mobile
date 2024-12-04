import { StyleSheet } from 'react-native';

export const getStyles = () => StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  selectedDateContainer: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDescriptionText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});
