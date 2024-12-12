import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext)

  //if App is not nested properly
  if (!context) {
    throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
  }

  return context;
}
