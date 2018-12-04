export default function setTeacher(teacherData) {
  // return function(dispatch, { getFirebase, getFirestore }) {
  //   let teacherData = {}
  //   dispatch({
  //     type: "LOAD_TEACHER_SUCCESS",
  //     teacherData
  //   });
  // };
  return {
    type: "LOAD_TEACHER_SUCCESS",
    teacherData
  };
}
