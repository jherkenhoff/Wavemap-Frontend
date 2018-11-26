export const UPDATE_DATASETS = "UPDATE_DATASETS"
export const UPDATE_DATA = "UPDATE_DATA"

/*
 * action creators
 */
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
