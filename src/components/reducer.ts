import { initialValues, StateInterface } from "./Context"

export default (state = initialValues , action: any): StateInterface => {
    switch (action.type) {
        case 'SET_FORM_NAME':
            return {
                ...state,
                form: { ...state.form , name: action.payload }
            }
        case 'SET_FORM_DESCRIPTION': 
            return {
                ...state,
                form: {...state.form , description: action.payload}
            }
        case 'SET_FORM_VALUES': 
            return {
                ...state,
                form: action.payload
            }
        case 'SET_PROJECTID' :
            return {
                ...state,
                projectId: action.payload
            }
        default: 
            return state
    }
}