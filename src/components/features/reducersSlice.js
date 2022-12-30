import { createSlice } from "@reduxjs/toolkit";

export const reducersSlice = createSlice({
    name: "reducerList",
    initialState: { reducerList: {}},
    reducers: {
        add: (state, action) => {
            // console.log(",,,,,,,,,,,,,," + action.payload.key);
            // console.log("8888888888888   " + JSON.stringify(state.reducerList));
            state.reducerList = action.payload.trackerList;
        }
    }
});

export const { add } = reducersSlice.actions

export default reducersSlice.reducer