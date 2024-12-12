import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const { workouts, dispatch } = useWorkoutContext()

    useEffect(() => {
        //since useEffect cannot be made async
        //creating an async function inside it
        // console.log("tis is hit")
        const getWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const data = await response.json()

            if (response.ok) {
                // setWorkouts(data)
                dispatch({ type: "GET_WORKOUTS", payload: data })
                console.log('data', data)
            }
        }
        getWorkouts()
    }, [dispatch])

    return (
        <div className="home">
            {/* Home is heres */}
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;