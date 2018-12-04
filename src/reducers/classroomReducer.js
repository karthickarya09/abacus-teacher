import initialState from './initialState'

export default function classroomReducer(state=initialState.classrooms, action){
    switch(action.type){
        case "LOAD_CLASSROOMS_SUCCESS": return {
            ...state,
            classroomData: action.classroomData
        }
        default: return state
    }
}