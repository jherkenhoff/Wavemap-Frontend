import { updateDeviceInfo, updateDatasets, updateSelectedDataset, connectionChange, getDeviceInfo, getDatasets, getSelectedDataset, getDeviceSetup, updateDeviceSetup, updateMeasurementRunning, newSample } from "actions"

export default function setupSocket(socket, dispatch) {

    socket.on("connect", () => {
        dispatch(getDeviceInfo())
        dispatch(getDatasets())
        dispatch(getSelectedDataset())
        dispatch(getDeviceSetup())

        dispatch(connectionChange(true))
    })

    socket.on("disconnect", () => {
        dispatch(connectionChange(false))
    })

    socket.on("update_device_info", (msg) => {
        dispatch(updateDeviceInfo(msg))
    })

    socket.on("update_datasets", (msg) => {
        dispatch(updateDatasets(msg))
    })

    socket.on("update_selected_dataset", (msg) => {
        dispatch(updateSelectedDataset(msg))
    })

    socket.on("update_device_setup", (msg) => {
        dispatch(updateDeviceSetup(msg))
    })

    socket.on("update_measurement_running", (running) => {
        dispatch(updateMeasurementRunning(running))
    })

    socket.on("new_sample", (sample) => {
        dispatch(newSample(sample))
    })



}
