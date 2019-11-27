import { combineReducers } from 'redux';

const defaultReducer = (state = {}, action) => {
  return state;
};

const dashboardReducer = (state = {
  studentList: [],
  filterStudentList: []
}, action) => {
  switch (action.type) {
    case 'STUDENT_LIST':
        state = {
          ...state
        }
        state.studentList = [].concat(action.payload.list);
        state.filterStudentList = [].concat(action.payload.list);
        break;
    case 'FILTER_LIST':
      state = {
        ...state
      }
      state.filterStudentList = [].concat(action.payload.filterList);
      break;
    case 'SORT_BY_NAME':
      state = {
        ...state
      }
      state.filterStudentList = [].concat(action.payload.sortedList);
      break;
    case 'SORT_BY_MARK':
      state = {
        ...state
      }
      state.filterStudentList = [].concat(action.payload.sortedList);
      break;
  }
  return state;
};


export default combineReducers({
  defaultReducer,
  dashboardReducer
});