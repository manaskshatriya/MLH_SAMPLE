import adminServices from './admin/admin.database.services.mjs';
import eventsServices from './events/events.database.services.mjs';
import filesServices from './files/files.database.services.mjs';
import judgesServices from './judges/judges.database.services.mjs';
import allocationServices from './allocations/allocations.database.services.mjs';

function databaseService(db) {
    return {
        adminServices: adminServices(db),
        eventsServices: eventsServices(db),
        filesServices: filesServices(db),
        judgesServices: judgesServices(db),
        allocationServices: allocationServices(db),
    }
}

export default databaseService;