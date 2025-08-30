import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dashboards:[],
    selectedDashboard:{}
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectDashboard(state, action) {
        const {payload} = action
        state.selectedDashboard = payload
        sessionStorage.setItem("selectedDashboard", JSON.stringify(payload))
    },
    setDashboards(state, action){
        const {payload} = action
        state.dashboards = payload
    }
  },
});

// Export actions and reducer
export const { setDashboards, selectDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
