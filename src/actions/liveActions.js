export const UPDATE_DEVICE_INFO = "UPDATE_DEVICE_INFO"
export const UPDATE_DATASETS = "UPDATE_DATASETS"
export const UPDATE_SELECTED_DATASET = "UPDATE_SELECTED_DATASET"
export const ADD_DATASET = "ADD_DATASET"
export const SELECT_DATASET = "SELECT_DATASET"
export const CONNECTION_CHANGE = "CONNECTION_CHANGE"
export const UPDATE_DEVICE_SETUP = "UPDATE_DEVICE_SETUP"
export const UPDATE_MEASUREMENT_RUNNING = "UPDATE_MEASUREMENT_RUNNING"
export const NEW_SAMPLE = "NEW_SAMPLE"


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

export function updateDeviceSetup(deviceSetup) {
    return { type: UPDATE_DEVICE_SETUP, deviceSetup }
}

export function connectionChange(isConnected) {
    return { type: CONNECTION_CHANGE, isConnected }
}

export function updateMeasurementRunning(running) {
    return { type: UPDATE_MEASUREMENT_RUNNING, running }
}

export function newSample(sample) {
    return { type: NEW_SAMPLE, sample }
}

export function startSingleSample() {
    return (dispatch, getState, socket) => {
        socket.emit("start_single_sample")
    }
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

export function getDeviceSetup() {
    return (dispatch, getState, socket) => {
        socket.emit("get_device_setup")
    }
}

export function changeMeasurementRunning(value) {
    return (dispatch, getState, socket) => {
        socket.emit("change_measurement_running", value)
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
