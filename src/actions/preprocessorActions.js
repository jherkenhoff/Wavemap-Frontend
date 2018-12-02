export const CHANGE_PREPROCESSOR_TYPE = "CHANGE_PREPROCESSOR_TYPE"

/*
 * action creators
 */
export function changePreprocessorType(preprocessorType) {
    return {
        type: CHANGE_PREPROCESSOR_TYPE,
        preprocessorType
    }
}
