import {StyleSheet} from 'react-native';

export const ToDoListStyles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,.1)',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  task: {
    fontSize: 16,
  },
  icon: {
    fontSize: 25,
  },
  textWhite: {
    color: '#fff',
  },
  rowBack: {
    flex: 1,
  },
  backRightBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 80,
    height: 80,
    backgroundColor: 'red',
    right: 0,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 80,
  },
  backLeftBtn: {
    backgroundColor: '#378805',
    left: 0,
  },
  pinnedView: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 6,
    marginTop: 2,
  },
  pinned: {
    backgroundColor: '#FFC0CB',
  },
  notMain: {
    marginVertical: 0,
    borderTopWidth: 0,
  },
  viewMultiSelect: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  listBackground: {
    backgroundColor: '#FFCC00',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,.1)',
  },
  listTitle: {
    color: '#000',
  },
});
