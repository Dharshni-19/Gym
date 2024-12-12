import { createContext, useReducer } from "react"

//creates a context object i.e global state
export const WorkoutContext = createContext()

//reducer function to maintain global state
const workoutReducer = (state, action) => {
    switch (action.type) {

        case 'CREATE_WORKOUT':
            //adding new workout in the action payload
            return { workouts: [action.payload, ...state.workouts] }

        case 'GET_WORKOUTS':
            //gets all the workouts in action payload
            return { workouts: action.payload }

        case 'DELETE_WORKOUT':
            //deletes a specific workout
            return { workouts: state.workouts.filter(workout => workout._id !== action.payload._id) }

        default:
            //called for all the other default cases
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )

}
