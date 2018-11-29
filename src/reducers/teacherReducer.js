import initialState from './initialState'

export default function teacherReducer(state = initialState.teacher, action) {
  switch (action.type) {
    case "LOAD_TEACHER_SUCCESS": {
      console.log("load teacher Success");
    }
    default:
      return state;
  }
}