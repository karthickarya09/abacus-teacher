import {combineReducers} from 'redux'
import teacherData from './teacherReducer'
import classroomData from './classroomReducer'
import rubricData from './rubricReducer'
import studentData from './studentReducer'
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
    teacherData,
    classroomData,
    rubricData,
    studentData,
    firestore: firestoreReducer
})

export default rootReducer

