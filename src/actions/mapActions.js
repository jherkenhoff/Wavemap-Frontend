export const ADD_FREQ_FILTER = "ADD_FREQ_FILTER"
export const CHANGE_FREQUENCY_FILTER = "CHANGE_FREQUENCY_FILTER"

export const FILTER_TYPE = {
    BANDPASS: "BANDPASS",
    BANDSTOP: "BANDSTOP"
}

/*
 * action creators
 */
export function addFrequencyFilter(type=FILTER_TYPE.BANDPASS, min, max) {
    return { type: ADD_FREQ_FILTER,
        filter: {
            type: type,
            min: min,
            max: max
        }
    }
}

export function changeFrequencyFilter(type=FILTER_TYPE.BANDPASS, min, max) {
    return { type: ADD_FREQUENCY_FITLER,
        filter: {
            type: type,
            min: min,
            max: max
        }
    }
}
