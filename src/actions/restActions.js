import { updateDatasets, updateData, updateSelectedSample, updateMarkerLoading, shiftSetup } from "./dataActions"
import { setMarkerPosition } from "./mapActions"

export const UPDATE_PROGRESS = "UPDATE_PROGRESS"

const restServerDomain = "http://dl0ht-2.fk4.hs-bremen.de:33680" //location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

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
        const { selectedDataset, selectedSubset } = getState().newSetup

        let req = new XMLHttpRequest();
        req.open('GET', restServerDomain + "/api/v1/datasets/" + selectedDataset + "/subsets/" + selectedSubset + "/preprocessed?preprocessor=average", true);
        req.onprogress = (e) => dispatch(updateProgress(true, 30+e.loaded/e.total*70, "Downloading data"));
        req.onloadstart = () => dispatch(updateProgress(true, 30, "Preprocessing data"));
        req.onreadystatechange = (e) => {
            if (e.target.readyState == 4) {
                dispatch(updateData(JSON.parse(e.target.response)))
                dispatch(updateProgress(false, 100, "Done"));
                dispatch(shiftSetup())
            } else {
                console.error(e);
            }
        };
        req.send();
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

        const { newSetup, currentSetup } = getState();

        fetch(restServerDomain + "/api/v1/datasets/" + newSetup.selectedDataset + "/subsets/" + newSetup.selectedSubset + "/samples/" + sample_id)
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

function updateProgress(loading, percent, text) {
    return {
        type: UPDATE_PROGRESS,
        progress: {
            loading,
            percent,
            text
        }
    }
}
