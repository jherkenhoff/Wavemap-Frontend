import { combineReducers } from "redux"
import { UPDATE_DATASETS, UPDATE_DEVICE_INFO, UPDATE_SELECTED_DATASET, UPDATE_MEASUREMENT_RUNNING, CONNECTION_CHANGE, UPDATE_DEVICE_SETUP } from "actions"

function datasets(state = [], action) {
    switch (action.type) {
        case UPDATE_DATASETS:
            return action.datasets

        default:
            return state
    }
}

function selectedDataset(state = null, action) {
    switch (action.type) {
        case UPDATE_SELECTED_DATASET:
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

function isConnected(state = false, action) {
    switch (action.type) {
        case CONNECTION_CHANGE:
            return action.connected

        default:
            return state
    }
}

function deviceSetup(state = {}, action) {
    switch (action.type) {
        case UPDATE_DEVICE_SETUP:
            return action.deviceSetup

        default:
            return state
    }
}

function measurementStatus(state = {isRunning: false}, action) {
    switch (action.type) {
        case UPDATE_MEASUREMENT_RUNNING:
            return {
                isRunning: action.running
            }

        default:
            return state
    }
}



const rootReducer = combineReducers({
    datasets,
    selectedDataset,
    deviceInfo,
    isConnected,
    deviceSetup,
    measurementStatus
})

export default rootReducer
