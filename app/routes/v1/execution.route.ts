import express from 'express'
import { executeCode } from '../../controllers/v1/execution.controller';
const router = express.Router();

router.route("/").post(executeCode)

export default router;