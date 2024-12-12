import { useWorkoutContext } from "../hooks/useWorkoutContext"

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()

    const handleDelete = async () => {
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const data = await response.json()

        if (response.ok) {
            console.log("workout deleted")
            dispatch({ type: "DELETE_WORKOUT", payload: data })
        }
    }

    return (
        <div className="workout-details">
            <h3>{workout.title}</h3>
            <p><strong>No. of reps:</strong> {workout.reps}</p>
            <p><strong>Load in kgs:</strong> {workout.load}</p>
            {/* <p>{workout.createdAt}</p> */}
            <p><small>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</small></p>
            <span onClick={handleDelete}><i className="fa-regular fa-trash-can"></i></span>
        </div>
    );
}

export default WorkoutDetails;