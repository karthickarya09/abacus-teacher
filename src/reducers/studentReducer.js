import initialState from "./initialState";

export default function studentReducer(state = initialState.students, action) {
  switch (action.type) {
    case "GET_STUDENTS_SUCCESS": {
      return {
        studentData: action.studentData
      };
    }
    case "ASSESSMENT_SUBMIT_SUCESS":{
      return {
        submitSuccess: true
      }
    }
    default:
      return state;
  }
}
