const Prayer = require('../models/prayerModel')
const mongoose = require('mongoose')

// get all prayers
const getPrayers = async (req, res) => {
    const prayers = await Prayer.find({}).sort({createdAt: -1})

    res.status(200).json(prayers)
}


// get single prayer
const getPrayer = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'ID not valid'})
    }

    const prayer = await Prayer.findById(id)

    if (!prayer) {
        return res.status(404).json({err: 'No such prayer'})
    }
    res.status(200).json(prayer)
}



// create new prayer
const createPrayer = async (req, res) => {
    const {title, content} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
        return res.status(400).json({ error: `New Prayer needs a Title`, emptyFields })
    }
    if (!content) {
        emptyFields.push('content')
        return res.status(400).json({ error: `New Prayer needs Content`, emptyFields })
    }

    // add to db
    try {
        const prayer = await Prayer.create({title, content})
        res.status(200).json(prayer)
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// delete single prayer
const deletePrayer = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'ID not valid'})
    }

    const prayer = await Prayer.findOneAndDelete({_id: id})

    if (!prayer) {
        return res.status(404).json({err: 'No such prayer'})
    }

    res.status(200).json(prayer)
}



// update single prayer
const updatePrayer = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'ID not valid'})
    }

    const prayer = await Prayer.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!prayer) {
        return res.status(404).json({err: 'No such prayer'})
    }

    res.status(200).json(prayer)
}


module.exports = {
    createPrayer,
    getPrayers,
    getPrayer,
    deletePrayer,
    updatePrayer,
}