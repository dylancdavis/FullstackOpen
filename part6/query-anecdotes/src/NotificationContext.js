import { createContext, useContext, useReducer } from "react"

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload
		case "CLEAR":
			return ''
		default:
			return state
	}
}

export const NotificationContextProvider = props => {
	const reducer = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={reducer}>
			{props.children}
		</NotificationContext.Provider>
	)
}


export const useNotificationValue = () => {
	return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
	return useContext(NotificationContext)[1]
}

export default NotificationContext