export const ADD_FREQ_FILTER = "ADD_FREQ_FILTER"
export const DELETE_FREQ_FILTER = "DELETE_FREQ_FILTER"
export const CHANGE_FREQ_FILTER = "CHANGE_FREQ_FILTER"
export const TOGGLE_FILTER = "TOGGLE_FILTER"
export const SET_MARKER_POSITION = "SET_MARKER_POSITION"

import uuid from "uuid"

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

export function toggleFreqFilter(id) {
    return {
        type: TOGGLE_FILTER,
        id: id
    }
}

export function setMarkerPosition(dataIndex) {
    return {
        type: SET_MARKER_POSITION,
        dataIndex: dataIndex
    }
}
