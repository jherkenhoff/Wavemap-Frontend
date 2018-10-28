export const UPDATE_DEVICE_INFO = "UPDATE_DEVICE_INFO"
export const UPDATE_DATASETS = "UPDATE_DATASETS"
export const UPDATE_SELECTED_DATASET = "UPDATE_SELECTED_DATASET"
export const ADD_DATASET = "ADD_DATASET"
export const SELECT_DATASET = "SELECT_DATASET"

/*
 * other constants
 */

export const SamplingModes = {
    SECONDS: 'SECONDS',
    METERS: 'METERS',
    CRAZY: 'CRAZY'
}

/*
 * action creators
 */
export function updateDeviceInfo(deviceInfo) {
    return { type: UPDATE_DEVICE_INFO, deviceInfo }
}

export function updateDatasets(datasets) {
    return { type: UPDATE_DATASETS, datasets }
}

export function updateSelectedDataset(selected) {
    return { type: UPDATE_SELECTED_DATASET, selected }
}

export function addDataset(name) {
    return (dispatch, getState, socket) => {
        socket.emit("add_dataset", name)
    }
}

export function selectDataset(selected) {
    return (dispatch, getState, socket) => {
        socket.emit("select_dataset", selected)
    }
}

export function getDeviceInfo() {
    return (dispatch, getState, socket) => {
        socket.emit("get_device_info")
    }
}

export function getDatasets() {
    return (dispatch, getState, socket) => {
        socket.emit("get_datasets")
    }
}

export function getSelectedDataset() {
    return (dispatch, getState, socket) => {
        socket.emit("get_selected_dataset")
    }
}
