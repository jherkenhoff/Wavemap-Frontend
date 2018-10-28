import { updateDeviceInfo, updateDatasets, updateSelectedDataset } from "actions"

export default function setupSocket(socket, dispatch) {

    socket.on("update_device_info", (msg) => {
        dispatch(updateDeviceInfo(msg))
    })

    socket.on("update_datasets", (msg) => {
        dispatch(updateDatasets(msg))
    })

    socket.on("update_selected_dataset", (msg) => {
        dispatch(updateSelectedDataset(msg))
    })

}
