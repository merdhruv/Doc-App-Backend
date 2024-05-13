const express = require('express')
const router = express.Router()

const fileController = require('../Controllers/filecontroller')
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/',  fileController.indexfile)
router.post('/show/:filename', fileController.showfile)
router.post('/addfile', upload.array('files'), fileController.addfile)
router.post('/update', fileController.updatefile)
router.post('/delete', fileController.destroyfile)


module.exports = router