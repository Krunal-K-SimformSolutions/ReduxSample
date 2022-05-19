import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainerStyle: {
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'black'
  },
  label: {
    fontWeight: '400',
    fontSize: 14,
    color: 'black',
    marginTop: 20
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: 'rgba(151, 151, 151, 0.25)'
  }
});
