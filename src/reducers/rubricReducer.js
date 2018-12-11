import initialState from "./initialState";

export default function rubricReducer(
  state = initialState.currentRubric,
  action
) {
  switch (action.type) {
    case "ADD_TEMPLATE_SUCCESS": {
      return {
        ...state,
        rubricData: action.templateData
      };
    }
    default:
      return state;
  }
}
