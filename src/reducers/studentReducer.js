import initialState from './initialState'

export default function studentReducer(state=initialState.students, action){
    switch(action.type){
        case "LOAD_STUDENT_SUCCESS": return {
            ...state,
            studentData: action.studentData
        }
        default: return state
    }
}