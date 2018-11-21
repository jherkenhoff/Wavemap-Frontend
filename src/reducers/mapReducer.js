import { ADD_FREQ_FILTER } from "actions"

const initialState = {
    filters: [
        {
            type: "BANDPASS",
            min: 5e3,
            max: 10e4
        },

        {
            type: "BANDPASS",
            min: 5e6,
            max: 10e7
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
