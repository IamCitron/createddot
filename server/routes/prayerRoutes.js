const express = require('express')
const {
    createPrayer,
    getPrayers,
    getPrayer,
    deletePrayer,
    updatePrayer,
    updatePrayerCount,
    updatePrayerStatus,
} = require('../controllers/prayerController')

const router = express.Router()

// GET all prayers
router.get('/', getPrayers)

// GET single prayers
router.get('/:id', getPrayer)

// POST new prayer
router.post('/', createPrayer)

// DELETE prayer
router.delete('/:id', deletePrayer)

// PATCH prayer
router.patch('/:id', updatePrayer)

// updatePrayerCount
router.patch('/:id', updatePrayerCount)

// updatePrayerStatus
router.patch('/:id', updatePrayerStatus)



module.exports = router