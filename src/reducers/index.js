import { UPDATE_DATASETS, CHANGE_FREQ_FILTER, DELETE_FREQ_FILTER, ADD_FREQ_FILTER, UPDATE_DATA, SELECT_DATASET, SELECT_SUBSET, SET_MARKER_POSITION, TOGGLE_FILTER, CHANGE_PREPROCESSOR_TYPE, UPDATE_SELECTED_SAMPLE, UPDATE_MARKER_LOADING, UPDATE_PROGRESS, SHIFT_SETUP } from "actions"

import uuid from "uuid"

const initialState = {
    datasets: [],
    newSetup: {
        selectedDataset: undefined,
        selectedSubset: undefined,
        filters: []
    },
    currentSetup: {
        selectedDataset: undefined,
        selectedSubset: undefined,
        filters: []
    },
    data: [],
    marker: {
        loading: false,
        sample: undefined
    },
    progress: {
        loading: false,
        percent: 0,
        text: ""
    },
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
                newSetup: {
                    ...state.newSetup,
                    selectedDataset: action.selectedDataset,
                    selectedSubset: action.selectedSubset
                }
            }

        case CHANGE_FREQ_FILTER:
            return { ...state,
                newSetup: {
                    ...state.newSetup,
                    filters: state.newSetup.filters.map( (filter) => filter.id === action.id ?
                        {...filter, min: action.min, max: action.max} : filter)
                }
            }

        case DELETE_FREQ_FILTER:
            return { ...state,
                newSetup: {
                    ...state.newSetup,
                    filters: state.newSetup.filters.filter( (filter) => filter.id != action.id )
                }
            }

        case ADD_FREQ_FILTER:
            return { ...state,
                    newSetup: {
                        ...state.newSetup,
                        filters: [...state.newSetup.filters, {
                            id: action.id,
                            min: action.min,
                            max: action.max,
                            active: true
                        }]
                    }
            }

        case TOGGLE_FILTER:
            return { ...state,
                    newSetup: {
                        ...state.newSetup,
                        filters: state.newSetup.filters.map( (filter) => (filter.id == action.id)? {...filter, active: !filter.active}:filter )
                    }
            }

        case SET_MARKER_POSITION:
            return { ...state,
                markerDataIndex: action.dataIndex
            }

        case UPDATE_SELECTED_SAMPLE:
            return { ...state,
                marker: {
                    ...state.marker,
                    sample: action.sample
                }
            }

        case UPDATE_MARKER_LOADING:
            return { ...state,
                marker: {
                    ...state.marker,
                    loading: action.loading
                }
            }

        case UPDATE_PROGRESS:
            return { ...state,
                    progress: action.progress
            }

        case SHIFT_SETUP:
            return { ...state,
                    currentSetup: state.newSetup
            }



        default:
            return state
    }
}
