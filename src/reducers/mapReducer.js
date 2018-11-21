import { CHANGE_FREQ_FILTER, DELETE_FREQ_FILTER, ADD_FREQ_FILTER } from "actions"


import uuid from "uuid"

const initialState = {
    filters: [
        {id: uuid.v1(), min: 5e3, max: 10e4},
        {id: uuid.v1(), min: 5e6,max: 10e7}
    ]
}

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_FREQ_FILTER:
            return { ...state,
                    filters: state.filters.map( (filter) => filter.id === action.id ?
                        {...filter, min: action.min, max: action.max} : filter
                    )
            }

        case DELETE_FREQ_FILTER:
            return { ...state,
                    filters: state.filters.filter( (filter) => filter.id != action.id )
            }

        case ADD_FREQ_FILTER:
            console.log({ ...state,
                    filters: [...state.filters, {
                        id: action.id,
                        min: action.min,
                        max: action.max
                    }]
            });
            return { ...state,
                    filters: [...state.filters, {
                        id: action.id,
                        min: action.min,
                        max: action.max
                    }]
            }



        default:
            return state
    }
}
