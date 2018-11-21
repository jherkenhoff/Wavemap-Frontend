export const ADD_FREQ_FILTER = "ADD_FREQ_FILTER"
export const DELETE_FREQ_FILTER = "DELETE_FREQ_FILTER"
export const CHANGE_FREQ_FILTER = "CHANGE_FREQ_FILTER"

import uuid from "uuid"

export const FILTER_TYPE = {
    BANDPASS: "BANDPASS",
    BANDSTOP: "BANDSTOP"
}

/*
 * action creators
 */
export function addFreqFilter(min, max) {
    return {
        type: ADD_FREQ_FILTER,
        id: uuid.v1(),
        min: min,
        max: max
    }
}

export function changeFreqFilter(id, min, max) {
    return {
        type: CHANGE_FREQ_FILTER,
        id: id,
        min: min,
        max: max
    }
}

export function deleteFreqFilter(id) {
    return {
        type: DELETE_FREQ_FILTER,
        id: id
    }
}
