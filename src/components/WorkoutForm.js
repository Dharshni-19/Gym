import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {

    const { dispatch } = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const addWorkout = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, reps, load })
        })
        const data = await response.json()

        if (!response.ok) {
            console.log(data,'emptyfields',emptyFields)
            setError(data.error)
            setEmptyFields(data.emptyFields)
            console.log(data.error)
        }
        else if (response.ok) {
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            console.log('workout added')
            dispatch({ type: 'CREATE_WORKOUT', payload: data })
        }
    }

    return (
        <div className="workout-form">
            <h3>Workout form</h3>
            <form onSubmit={(e) => addWorkout(e)}>
                <label>Workout title:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? 'error' : ''}
                    value={title} />
                <label>Reps:</label>
                <input
                    type="number"
                    onChange={(e) => setReps(e.target.value)}
                    className={emptyFields.includes('reps') ? 'error' : ''}
                    value={reps} />
                <label>Load(in kgs):</label>
                <input
                    type="number"
                    onChange={(e) => setLoad(e.target.value)}
                    className={emptyFields.includes('load') ? 'error' : ''}
                    value={load} />
                <button>Add workout</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default WorkoutForm;