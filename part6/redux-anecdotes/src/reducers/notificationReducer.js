import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		clearNotification(state, action) {
			return ''
		}
	}
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const doNotification = (text, displayTime = 5) => {
	return async (dispatch, getState) => {
		dispatch(setNotification(text))
		setTimeout(() => dispatch(clearNotification()), displayTime*1000)
	}
}