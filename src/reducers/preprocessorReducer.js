import { CHANGE_PREPROCESSOR_TYPE } from "actions"


const initialState = {
    type: "AVERAGE"
}

export default function preprocessorReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PREPROCESSOR_TYPE:
            return { ...state,
                markerDataIndex: action.dataIndex
            }

        default:
            return state
    }
}
