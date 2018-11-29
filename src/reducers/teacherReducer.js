import initialState from './initialState'

export default function teacherReducer(state, action) {
  switch (action.type) {
    case "LOAD_TEACHER_SUCCESS": {
        console.log("teacherData", action.teacherData)
      return {
          ...state,
          data: action.teacherData
      }
    }
    default:
      return state=initialState.teacherData;
  }
}