import { sendCookie, randomID } from "../../utils/index.js";
import { groupLinks, roles } from "../../static/adminData.mjs";

function creationsJudgesController(judgesServices, emailService) {
  async function insertJudge(req, res, next) {
    try {
      const { event_name } = req.params;
      const jid = "INC-J" + randomID(7);
      const password = randomID(8);
      await judgesServices.insertJudge({
        ...req.body,
        jid,
        password,
        events: [event_name],
        roles: [roles[6]],
      });
      // await emailService.judgeRegistrationEmail({
      //   ...req.body,
      //   jid,
      //   events: [event_name],
      //   password,
      //   group_link: groupLinks.get(event_name),
      // });
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  async function evaluateProject(req, res, next) {
    try {
      const { event_name } = req.params;
      const { pid, jid } = req.body;
    //   const isExist = await judgesServices.existingAllocation(pid, jid);
    //   if (isExist === 0) {
    //     req.body.slots = "1";
    //     await judgesServices.allocateProject(event_name, req.body);
    //   }
      await judgesServices.evaluateProject(event_name, req.body);
      res.status(201).end();
    } catch (err) {
      next(err);
    }
  }

  return {
    insertJudge,
    evaluateProject,
  };
}

export default creationsJudgesController;
