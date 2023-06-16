import { judgesQueries } from "../../../models/index.js";
import { AppError } from "../../../utils/index.js";
import { eventsName } from "../../../static/eventsData.mjs";

function judgesServices(db) {
  async function getJudge(data) {
    try {
      const [results] = await db
        .execute(judgesQueries.getJudge(data))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getJudges(event_name) {
    try {
      const [results] = await db
        .execute(judgesQueries.getJudges(event_name))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function insertJudge(data) {
    try {
      await db.execute(
        { sql: judgesQueries.insertJudge, namedPlaceholders: true },
        data
      );
      return;
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        if (err.sqlMessage.includes("PRIMARY")) return;
        throw new AppError(
          400,
          "fail",
          "Judge already exists for given email-phone combination"
        );
      }
      throw new AppError(400, "fail", err.sqlMessage);
    }
  }

  async function loginJudge(data) {
    try {
      const [results] = await db
        .execute(
          { sql: judgesQueries.loginJudge, namedPlaceholders: true },
          data
        )
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getAllocatedProjects(jid) {
    try {
      const [conceptsResults] = await db
        .execute(judgesQueries.getAllocatedProjects(jid, eventsName[0]))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      const [impetusResults] = await db
        .execute(judgesQueries.getAllocatedProjects(jid, eventsName[1]))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return { concepts: conceptsResults, impetus: impetusResults };
    } catch (err) {
      throw err;
    }
  }

  async function modifySlots(jid, slots, mode) {
    try {
      const [results] = await db.execute(judgesQueries.modifySlots(slots, jid, mode)).catch(err => {
        throw new AppError(400, 'fail', err.sqlMessage)
      })
      return results[0]
    } catch (err) {
      throw err
    }
  }

  async function evaluateProject(event_name, data) {
    try {
      switch (event_name) {
        case eventsName[1]:
          await db.execute({ sql: judgesQueries.insertImpetusEvaluation, namedPlaceholders: true }, data).catch(err => {
            console.log(err);
            throw new AppError(400, 'fail', err.sqlMessage)
          })
          break

        case eventsName[0]:
          await db.execute({ sql: judgesQueries.insertConceptsEvaluation, namedPlaceholders: true }, data).catch(err => {
            throw new AppError(400, 'fail', err.sqlMessage)
          })
          break

        default:
          throw new AppError(400, "fail", "Invalid event name")
      }
      return
    } catch (err) {
      throw err
    }
  }

  async function existingAllocation(pid, jid) {
    try {
      const [results] = await db.execute(judgesQueries.existingAllocation(pid, jid)).catch(err => {
        throw new AppError(400, 'fail', err.sqlMessage)
      })
      return results[0]
    } catch (err) {
      throw err
    }
  }

  return {
    getJudge,
    getJudges,
    insertJudge,
    loginJudge,
    getAllocatedProjects,
    modifySlots,
    evaluateProject,
    existingAllocation
  }
}

export default judgesServices;