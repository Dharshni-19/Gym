const mongoose = require('mongoose')

const Workout = require('../models/workoutModel')

const getWorkouts = async (req, res) => {
    try {
        const allWorkouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(allWorkouts)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.json({ "message": "getting workouts" })
}

const getWorkout = async (req, res) => {
    const { id } = req.params

    //check if mongo db id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    try {
        const workout = await Workout.find({ _id: id })
        if (!workout) {
            return res.status(404).json({ error: 'No such workout' })
        }
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.json({ "message": "getting workout" + ' ' + req.params.id })
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields', emptyFields })
    }

    try {
        const workoutAdded = await Workout.create({ title, reps, load })
        res.status(200).json(workoutAdded)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.json({ "message": "adding workout" })
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    //check if mongo db id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' })
    }

    try {
        const deletedWorkout = await Workout.findOneAndDelete({ _id: id })
        res.status(200).json(deletedWorkout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.json({ "message": "deleting workout" })
}

const updateWorkout = async (req, res) => {
    const { id } = req.params
    const { title, reps, load } = req.body

    //check if mongo db id is valid or not
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such workout' })
    }

    try {
        const updatedWorkout = await Workout.findOneAndUpdate({ _id: id }, { title, reps, load })
        res.status(200).json({ updatedWorkout })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
    // res.json({ "message": "updating workout" })
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}