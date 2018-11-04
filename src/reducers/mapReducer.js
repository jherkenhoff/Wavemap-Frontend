import { ADD_FREQ_FILTER } from "actions"

const initialState = {
    filters: [
        {
            type: "BANDPASS",
            min: 10,
            max: 18
        }
    ]
}

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FREQ_FILTER:
            return { ...state, filter: [
                    ...state.filter,
                    action.filter
                ]
            }

        default:
            return state
    }
}
