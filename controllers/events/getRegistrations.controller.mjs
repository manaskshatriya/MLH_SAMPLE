import { AppError } from "../../utils/index.js";
import { projectDomains } from "../../static/eventsData.mjs";

function getRegistrationsController(
  eventsServices,
  filesServices,
  docServices
) {
  async function getUserRegistration(req, res, next) {
    try {
      const { event_name } = req.params;
      const { email } = req.query;
      const user_email = await eventsServices.getUserRegistration(
        event_name,
        email
      );
      if (!user_email)
        throw new AppError(
          404,
          "fail",
          `Email ${user_email} not registered for ${event_name}`
        );
      res.status(302).json(user);
    } catch (err) {
      next(err);
    }
  }

  async function getRegistration(req, res, next) {
    try {
      const results = await eventsServices.getTicketDetails(req.query.ticket);
      if (!results)
        throw new AppError(
          404,
          "fail",
          "Invalid ticket, registration does not exist"
        );
      if (results.step_no === 4)
        throw new AppError(400, "fail", "Registration under verification");
      if (results.step_no !== 5)
        throw new AppError(400, "fail", "Registration steps incomplete");
      if (results.step_no === 5) res.status(302).json(results);
    } catch (err) {
      next(err);
    }
  }

  async function getRegistrations(req, res, next) {
    try {
      const results = await eventsServices.getRegistrations(
        req.params.event_name
      );
      if (!results) throw new AppError(404, "fail", "No registrations found");
      res.status(302).json(results);
    } catch (err) {
      next(err);
    }
  }

  async function getTicketDetails(req, res, next) {
    try {
      const { ticket } = req.signedCookies;
      const results = await eventsServices.getTicketDetails(ticket);
      if (!results)
        throw new AppError(404, "fail", "Invalid ticket exists in cookie");
      delete results["pid"];
      delete results["payment_id"];
      delete results["date"];
      res.status(302).json(results);
    } catch (err) {
      next(err);
    }
  }

  async function getPaymentDetails(req, res, next) {
    try {
      const results = await eventsServices.getPaymentDetails(
        req.query.pid,
        req.params.event_name
      );
      if (!results)
        throw new AppError(
          404,
          "fail",
          "Invalid pid, registration does not exist"
        );
      res.status(302).json(results);
    } catch (err) {
      next(err);
    }
  }

  async function getUserIDFile(req, res, next) {
    try {
      const results = await filesServices.checkFile(req.query.email);
      if (!results)
        throw new AppError(404, "fail", "No file exist for this email");
      res.status(302).json({ data: results.file });
    } catch (err) {
      next(err);
    }
  }

  async function getPendingPayments(req, res, next) {
    try {
      const results = await eventsServices.getPendingPayments(
        req.params.event_name
      );
      if (!results) throw new AppError(404, "fail", "No pending payments");
      const filteredResults = results.map((item) => ({
        email: item.step_2[0].email,
        ticket: item.ticket,
        payment_id: item.payment_id,
        date: item.date,
      }));
      res.status(302).json(filteredResults);
    } catch (err) {
      next(err);
    }
  }

  async function getSynopsis(req, res, next) {
    try {
      const event_name = req.params.event_name;
      const projects = await eventsServices.getProjects(event_name);
      let results = {};
      Object.entries(projectDomains).forEach(domain => {
        results[domain[1]] = projects.filter(
          (project) => project.domain === domain[0]
        )
      })
      const pdfDoc = docServices.synopsisPDF(results);

      docServices.sendPDF(res, "synopsis", pdfDoc);
    } catch (err) {
      next(err);
    }
  }

  return {
    getUserRegistration,
    getRegistration,
    getRegistrations,
    getTicketDetails,
    getPaymentDetails,
    getUserIDFile,
    getPendingPayments,
    getSynopsis,
  };
}

export default getRegistrationsController;
