export const UPDATE_DATASETS = "UPDATE_DATASETS"
export const UPDATE_DATA = "UPDATE_DATA"
export const SELECT_DATASET = "SELECT_DATASET"
export const SHIFT_SETUP = "SHIFT_SETUP"
export const UPDATE_SELECTED_SAMPLE = "UPDATE_SELECTED_SAMPLE"
export const UPDATE_MARKER_LOADING = "UPDATE_MARKER_LOADING"

export function updateDatasets(datasets) {
    return {
        type: UPDATE_DATASETS,
        datasets
    }
}

export function updateData(data) {
    return {
        type: UPDATE_DATA,
        data
    }
}

export function selectDataset(selectedDataset, selectedSubset) {
    return {
        type: SELECT_DATASET,
        selectedDataset,
        selectedSubset
    }
}

export function updateSelectedSample(sample) {
    return {
        type: UPDATE_SELECTED_SAMPLE,
        sample
    }
}

export function updateMarkerLoading(loading) {
    return {
        type: UPDATE_MARKER_LOADING,
        loading: loading
    }
}

export function shiftSetup() {
    return {
        type: SHIFT_SETUP
    }
}
