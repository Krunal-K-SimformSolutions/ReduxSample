import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  flatlist: {
    width: '90%'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black'
  },
  btnView: {
    minWidth: 50,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flexDirection: 'row',
    marginRight: -10
  }
});
