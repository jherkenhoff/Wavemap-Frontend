import { updateDatasets, updateData, updateSelectedSample } from "./dataActions"
import { setMarkerPosition } from "./mapActions"

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
        fetch(restServerDomain + "/api/v1/datasets/" + dataset_id + "/subsets/" + subset_id + "/preprocessed?preprocessor=average")
            .then( (resp) => resp.json() )
            .then( (data) => {
                dispatch(updateData(data))
            })
            .catch( (error) => {
                console.error(error);
            })
    }
}

export function setMarker(sample_id) {
    console.log(sample_id);
    return (dispatch, getState) => {
        dispatch(setMarkerPosition(sample_id))

        const { setup } = getState();

        fetch(restServerDomain + "/api/v1/datasets/" + setup.selectedDataset + "/subsets/" + setup.selectedSubset + "/samples/" + sample_id)
            .then( (resp) => resp.json() )
            .then( (data) => {
                console.log(data);
                dispatch(updateSelectedSample(data))
            })
            .catch( (error) => {
                console.error(error);
            })
    }
}
