import {Router} from 'express'
import ExecutionRoutes from './execution.route'

const router = Router();

router.use("/execute", ExecutionRoutes)

export default router;