import multer from 'multer';

const storage = multer.memoryStorage()

const memberIDParser = multer({ storage, limits: { fileSize: 200000, files: 1 } }).single('member_id')

export { memberIDParser }