export function getStudents(classID) {
  return (dispatch, getFirebase, getFirestore) => {
    const firestore = getFirestore.getFirestore();
    let studentData = new Array(0);
    firestore
      .get({
        collection: "students",
        where: ["classId", "==", classID]
      })
      .then(snap => {
        snap.forEach(doc => {
          let student = {
            ...doc.data(),
            id: doc.id
          };
          studentData.push(student);
        });
        dispatch({
          type: "GET_STUDENTS_SUCCESS",
          studentData
        });
      });
  };
}

export function updateStudentRubrics(title, studentRubricData, props, classID) {
  return (dispatch, getFirebase, getFirestore) => {
    studentRubricData.title = title;
    studentRubricData.classID = classID;
    studentRubricData.dateCreated = new Date().toString();
    studentRubricData.lastSubmitted = new Date().toString();
    studentRubricData.acdYear = props.teacherData.acdYear;
    const firestore = getFirestore.getFirestore();
    let competencies = Object.keys(props.rubricData.competencies);
    let currentClassroomData = {};
    currentClassroomData = props.classRoomData.filter(classroom => {
      return classroom.id == classID;
    });
    let classAllCompetencies = currentClassroomData[0].allCompetencies;

    let acdYear;
    competencies.forEach(competency => {
      
      classAllCompetencies = {
        ...classAllCompetencies,
        [competency]:  0
      };
    });
    
    firestore
      .collection("assessments")
      .add(studentRubricData)
      .then(data => {
        let key = data._key.path.segments[data._key.path.segments.length - 1];
        props.studentData.forEach(student => {
          let myRubrics = student.myRubrics;
          let studentCompetencies = student.competencies;
          let allCompetencies = student.allCompetencies;
          acdYear = student.acdYear;
          competencies.forEach(competency => {
            classAllCompetencies[competency] +=
              studentRubricData[student.id][competency];
            allCompetencies[competency] =
              studentRubricData[student.id][competency];
            let competencyScore = studentCompetencies.hasOwnProperty(acdYear)
              ? studentCompetencies[acdYear].hasOwnProperty(competency)
                ? studentCompetencies[acdYear][competency].score
                : 0
              : 0;
            let competencyCount = studentCompetencies.hasOwnProperty(acdYear)
              ? studentCompetencies[acdYear].hasOwnProperty(competency)
                ? studentCompetencies[acdYear][competency].number
                : 0
              : 0;
            studentCompetencies = {
              ...studentCompetencies,
              [acdYear]: {
                ...studentCompetencies[acdYear],
                [competency]: {
                  score:
                    (competencyScore * competencyCount +
                      studentRubricData[student.id][competency]) /
                    (competencyCount + 1),
                  number: competencyCount + 1
                }
              }
            };
          });
          
          if (myRubrics.hasOwnProperty(acdYear)) {
            myRubrics = {
              ...myRubrics,
              [acdYear]: [...myRubrics[acdYear], [key]]
            };
          } else {
            myRubrics = {
              ...myRubrics,
              [acdYear]: [key]
            };
          }
          
          
          
          firestore
            .update("students/" + student.id, {
              myRubrics: myRubrics,
              allCompetencies: allCompetencies,
              competencies: studentCompetencies
            })
            .then(() => {
              myRubrics = props.teacherData.myRubrics;
              if (myRubrics.hasOwnProperty(acdYear)) {
                myRubrics = {
                  ...myRubrics,
                  [acdYear]: [...myRubrics[acdYear], key]
                };
              } else {
                myRubrics = {
                  ...myRubrics,
                  [acdYear]: [key]
                };
              }

              firestore.update("teachers/8HuuLwmrU1xrltwrCByE", {
                myRubrics: myRubrics
              });
            });
        });
        competencies.forEach(competency => {
          classAllCompetencies = {
            ...classAllCompetencies,
            [competency]:
              classAllCompetencies[competency] / props.studentData.length
          };
        });

        let classroomCompetencies = currentClassroomData[0].competencies;
        Object.keys(classAllCompetencies).forEach(competency => {
          let competencyScore = classroomCompetencies.hasOwnProperty(acdYear)
            ? classroomCompetencies[acdYear].hasOwnProperty(competency)
              ? classroomCompetencies[acdYear][competency].score
              : 0
            : 0;
          let competencyCount = classroomCompetencies.hasOwnProperty(acdYear)
            ? classroomCompetencies[acdYear].hasOwnProperty(competency)
              ? classroomCompetencies[acdYear][competency].number
              : 0
            : 0;

          classroomCompetencies = {
            ...classroomCompetencies,
            [acdYear]: {
              ...classroomCompetencies[acdYear],
              [competency]: {
                score:
                  (competencyScore * competencyCount +
                    classAllCompetencies[competency]) /
                  (competencyCount + 1),
                number: competencyCount + 1
              }
            }
          };
        });
        firestore
          .update("classrooms/" + classID, {
            competencies: classroomCompetencies,
            allCompetencies: classAllCompetencies
          })
          .then(() => {
            dispatch({
              type: "ASSESSMENT_SUBMIT_SUCESS"
            });
          });
      });
  };
}
