import dbFunctions from "../database";

export default function getTeacher() {
  return function(dispatch) {
    return dbFunctions.initializeData().then(teacherData => {
      dispatch({
        type: "LOAD_TEACHER_SUCCESS",
        teacherData
      });
    });
  };
}
