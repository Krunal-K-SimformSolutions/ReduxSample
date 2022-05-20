import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  itemView: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white'
  },
  textDesc: {
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
    marginTop: 5
  },
  image: {
    height: 42,
    width: 42
  }
});
