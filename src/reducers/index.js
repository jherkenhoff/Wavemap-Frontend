import { combineReducers } from "redux"
import { UPDATE_DATASETS, UPDATE_DEVICE_INFO, UPDATE_SELECTED_DATASET } from "actions"

function datasets(state = [], action) {
    switch (action.type) {
        case UPDATE_DATASETS:
            return action.datasets

        default:
            return state
    }
}

function selectedDataset(state = -1, action) {
    switch (action.type) {
        case UPDATE_SELECTED_DATASET:
            console.log(action)
            return action.selected

        default:
            return state
    }
}

function deviceInfo(state = {}, action) {
    switch (action.type) {
        case UPDATE_DEVICE_INFO:
            return action.deviceInfo

        default:
            return state
    }
}

const rootReducer = combineReducers({
    datasets,
    selectedDataset,
    deviceInfo
})

export default rootReducer
