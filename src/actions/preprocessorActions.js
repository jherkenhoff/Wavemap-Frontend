export const SELECT_PREPROCESSOR = "SELECT_PREPROCESSOR"

/*
 * action creators
 */
export function selectPreprocessor(preprocessor) {
    return {
        type: SELECT_PREPROCESSOR,
        preprocessor
    }
}
