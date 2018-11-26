import { updateDatasets, updateData } from "./dataActions"

const restServerDomain = "http://" + document.domain + ":5000"

export function fetchDatasets() {
    return (dispatch) => {
        fetch(restServerDomain + "/api/v1/datasets")
            .then( (resp) => resp.json() )
            .then( (data) => {
                dispatch(updateDatasets(data))
            })
            .catch( (error) => {
                console.error(error);
            })
    }
}

export function fetchData(dataset_id, subset_id) {
    return (dispatch) => {
        fetch(restServerDomain + "/api/v1/datasets/" + dataset_id + "/subsets/" + subset_id + "/preprocessed")
            .then( (resp) => resp.json() )
            .then( (data) => {
                dispatch(updateData(data))
            })
            .catch( (error) => {
                console.error(error);
            })
    }
}
