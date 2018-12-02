import { CHANGE_FREQ_FILTER, DELETE_FREQ_FILTER, ADD_FREQ_FILTER, SELECT_DATASET, SELECT_SUBSET, TOGGLE_FILTER, CHANGE_PREPROCESSOR_TYPE } from "actions"

const initialState = {
    selectedDataset: undefined,
    selectedSubset: undefined,
    filters: [],
    preprocessor: {
        type: "AVERAGE"
    }
}

export default function setupReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_DATASETS:
            return { ...state, datasets: action.datasets}

        case UPDATE_SELECTED_DATASET:
            return { ...state, selectedDataset: action.selected}

        case UPDATE_DEVICE_INFO:
            return { ...state, deviceInfo: action.deviceInfo}

        case CONNECTION_CHANGE:
            return { ...state, isConnected: action.isConnected}

        case UPDATE_DEVICE_SETUP:
            return { ...state, deviceSetup: action.deviceSetup}

        case UPDATE_MEASUREMENT_RUNNING:
            return { ...state, measurementStatus:
                {
                    ...state.measurementStatus, isRunning: action.running
                }
            }

        case NEW_SAMPLE:
            return { ...state, liveSamples: [
                ...state.liveSamples, action.sample
            ]}

        default:
            return state
    }
}
