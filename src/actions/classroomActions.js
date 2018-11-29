import getClassroom from "../database";

export default function getClassrooms(classrooms) {
  return function(dispatch) {
    return getClassroom(classrooms).then(classroomData => {
      dispatch({
        type: "LOAD_CLASSROOMS_SUCCESS",
        classroomData
      });
    });
  };
}
