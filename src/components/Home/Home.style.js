import {StyleSheet, Dimensions} from 'react-native';

export const HomeStyles = StyleSheet.create({
  generalMargin: {
    marginHorizontal: 20,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 80,
    height: 60,
    margin: 12,
    marginLeft: 0,
    padding: 16,
    borderWidth: 1,
    fontSize: 24,
    borderRadius: 4,
  },
  btn: {
    color: '#007AFF',
    fontSize: 18,
  },
  btnSelectTasks: {
    marginBottom: 20,
  },
  headline: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  selectTasksAndOtherActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
