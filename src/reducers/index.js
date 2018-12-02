import { UPDATE_DATASETS, CHANGE_FREQ_FILTER, DELETE_FREQ_FILTER, ADD_FREQ_FILTER, UPDATE_DATA, SELECT_DATASET, SELECT_SUBSET, SET_MARKER_POSITION, TOGGLE_FILTER, CHANGE_PREPROCESSOR_TYPE, UPDATE_SELECTED_SAMPLE } from "actions"

import uuid from "uuid"

const initialState = {
    datasets: [],
    setup: {
        selectedDataset: undefined,
        selectedSubset: undefined,
        filters: []
    },
    data: [],
    selectedSample: {},
    markerDataIndex: undefined
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DATASETS:
            return { ...state,
                datasets: action.datasets
            }

        case UPDATE_DATA:
            return { ...state,
                data: action.data
            }

        case SELECT_DATASET:
            return { ...state,
                setup: {
                    ...state.setup,
                    selectedDataset: action.selected
                }
            }

        case SELECT_SUBSET:
            return { ...state,
                setup: {
                    ...state.setup,
                    selectedSubset: action.selected
                }
            }

        case CHANGE_FREQ_FILTER:
            return { ...state,
                setup: {
                    ...state.setup,
                    filters: state.setup.filters.map( (filter) => filter.id === action.id ?
                        {...filter, min: action.min, max: action.max} : filter)
                }
            }

        case DELETE_FREQ_FILTER:
            return { ...state,
                setup: {
                    ...state.setup,
                    filters: state.setup.filters.filter( (filter) => filter.id != action.id )
                }
            }

        case ADD_FREQ_FILTER:
            return { ...state,
                    setup: {
                        ...state.setup,
                        filters: [...state.setup.filters, {
                            id: action.id,
                            min: action.min,
                            max: action.max,
                            active: true
                        }]
                    }
            }

        case TOGGLE_FILTER:
            console.log(state);
            return { ...state,
                    setup: {
                        ...state.setup,
                        filters: state.setup.filters.map( (filter) => (filter.id == action.id)? {...filter, active: !filter.active}:filter )
                    }
            }

        case SET_MARKER_POSITION:
            return { ...state,
                markerDataIndex: action.dataIndex
            }

        case UPDATE_SELECTED_SAMPLE:
            return { ...state,
                selectedSample: action.sample
            }


        default:
            return state
    }
}
