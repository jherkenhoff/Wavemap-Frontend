import { combineReducers } from "redux"
import liveReducer from "./liveReducer"
import mapReducer from "./mapReducer"


const rootReducer = combineReducers({
    liveState: liveReducer,
    mapState: mapReducer
})

export default rootReducer
