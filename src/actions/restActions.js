import { updateDatasets, updateData, updateSelectedSample, updateMarkerLoading } from "./dataActions"
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

export function fetchData() {
    return (dispatch, getState) => {
        const { selectedDataset, selectedSubset } = getState().setup
        fetch(restServerDomain + "/api/v1/datasets/" + selectedDataset + "/subsets/" + selectedSubset + "/preprocessed?preprocessor=average")
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
    return (dispatch, getState) => {
        dispatch(setMarkerPosition(sample_id))
        if (sample_id == undefined) {
            dispatch(updateSelectedSample(undefined))
            return
        }

        dispatch(updateMarkerLoading(true))

        const { setup } = getState();

        fetch(restServerDomain + "/api/v1/datasets/" + setup.selectedDataset + "/subsets/" + setup.selectedSubset + "/samples/" + sample_id)
            .then( (resp) => resp.json() )
            .then( (data) => {
                dispatch(updateSelectedSample(data))
                dispatch(updateMarkerLoading(false))
            })
            .catch( (error) => {
                console.error(error);
            })
    }
}
