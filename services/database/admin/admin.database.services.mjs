import { adminQueries } from '../../../models/index.js';
import { AppError } from "../../../utils/index.js";

function adminServices(db) {
    async function findAdmin(username) {
        try {
            const [results] = await db.execute(adminQueries.findAdmin, [username]).catch(err => { throw new AppError(400, 'fail', err.sqlMessage) })
            return results[0]
        } catch (err) {
            throw new AppError(500, 'fail', err)
        }
    }

    return {
        findAdmin,
    }
}

export default adminServices;