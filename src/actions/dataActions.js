export const UPDATE_DATASETS = "UPDATE_DATASETS"
export const UPDATE_DATA = "UPDATE_DATA"
export const SELECT_DATASET = "SELECT_DATASET"
export const SELECT_SUBSET = "SELECT_SUBSET"
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

export function selectDataset(selected) {
    return {
        type: SELECT_DATASET,
        selected
    }
}

export function selectSubset(selected) {
    return {
        type: SELECT_SUBSET,
        selected
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
