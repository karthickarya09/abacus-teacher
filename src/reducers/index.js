import {combineReducers} from 'redux'
import teacherData from './teacherReducer'
import classroomData from './classroomReducer'
import {firestoreReducer} from 'redux-firestore'

const rootReducer = combineReducers({
    teacherData,
    classroomData,
    firestore: firestoreReducer
})

export default rootReducer

