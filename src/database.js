import config from "./config";
import firebase from "firebase";

firebase.initializeApp(config);
let db = firebase.firestore();

async function initializeData() {
  let initialData = {};
  await getTeacherData().then(teacher => {
    initialData = teacher;
  });
  await getClassroomData(initialData.classrooms).then(classroom => {
    initialData.classrooms= classroom
  });
  return initialData;
}

async function getTeacherData() {
  let collection = db.collection("teachers");
  let teacher = {};
  await collection.get().then(snapshot => {
    snapshot.forEach(doc => {
      teacher = doc.data();
    });
  });
  return teacher;
}

async function getClassroomData(classrooms) {
  let classroomData = {};
  for(let i=0;i<classrooms.length;i++){
    let docRef = db.collection("classrooms").doc(classrooms[i]);
    await docRef.get().then(doc => {
        classroomData[classrooms[i]] = doc.data();
    });
  }
  return classroomData;
}

export default {
    initializeData: initializeData,
    getTeacherData: getTeacherData,
    getClassroomData: getClassroomData
}