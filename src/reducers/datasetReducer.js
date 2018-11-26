import { UPDATE_DATASETS } from "actions"


const initialState = []

export default function datasetReducer(state = initialState, action) {
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
