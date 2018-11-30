import initialState from './initialState'

export default function rubricReducer(state=initialState.currentRubric, action){
    switch(action.type){
        case "LOAD_RUBRIC_SUCCESS": return {
            ...state,
            rubricData: action.rubricData
        }
        default: return state
    }
}