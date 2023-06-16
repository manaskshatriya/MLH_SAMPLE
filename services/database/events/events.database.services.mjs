import { eventsQueries, ticketQueries } from "../../../models/index.js";
import { AppError } from "../../../utils/index.js";
import { eventsName } from "../../../static/eventsData.mjs";

function eventsServices(db) {
  async function getUserRegistration(event_name, email) {
    try {
      const [results] = await db
        .execute(eventsQueries.checkUserRegistration(event_name), [email])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getRegistrations(event_name) {
    try {
      const [results] = await db
        .execute(eventsQueries.getRegistrations(), [event_name])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getTicketDetails(ticket) {
    try {
      const [[results]] = await db
        .execute(ticketQueries.checkTicket, [ticket])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function getMembersFromTicket(ticket) {
    try {
      const [[results]] = await db
        .execute(ticketQueries.getMembers, [ticket])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getPaymentDetails(pid, event_name) {
    try {
      const [results] = await db
        .execute(
          { sql: ticketQueries.getPayment, namedPlaceholders: true },
          { pid, event_name: event_name[0].toUpperCase() }
        )
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function insertTicket(data) {
    try {
      const [results] = await db
        .execute(
          { sql: ticketQueries.insertTicket, namedPlaceholders: true },
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

  async function editStepData(ticket, step_no, data) {
    try {
      const [results] = await db
        .execute(ticketQueries.editStepData(step_no), [data, step_no, ticket])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function editPaymentAndStep(data, updated_step) {
    try {
      const [results] = await db
        .execute(ticketQueries.editPaymentAndStep, [
          updated_step,
          data.payment_id,
          data.ticket,
        ])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function completeRegistration(event_name, data) {
    try {
      const {
        step_1: {
          title,
          domain,
          project_type,
          guide_name,
          guide_email,
          guide_phone,
          hod_email,
          sponsored,
          company,
          nda,
          abstract,
          demo,
          reason_of_demo,
        },
        step_2,
        step_3: {
          college,
          year,
          country,
          state,
          district,
          city,
          locality,
          mode,
          reason_of_mode,
          referral,
        },
        ticket,
        payment_id,
      } = data;
      let dataArray = [];
      switch (event_name) {
        case eventsName[0]:
          switch (step_2.length) {
            case 2:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                mode,
                reason_of_mode,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                college,
                country,
                state,
                district,
                city,
                locality,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 3:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                mode,
                reason_of_mode,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                college,
                country,
                state,
                district,
                city,
                locality,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 4:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                mode,
                reason_of_mode,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                step_2[3].name,
                step_2[3].email,
                step_2[3].phone,
                step_2[3].gender,
                college,
                country,
                state,
                district,
                city,
                locality,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 5:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                mode,
                reason_of_mode,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                step_2[3].name,
                step_2[3].email,
                step_2[3].phone,
                step_2[3].gender,
                step_2[4].name,
                step_2[4].email,
                step_2[4].phone,
                step_2[4].gender,
                college,
                country,
                state,
                district,
                city,
                locality,
                referral,
                ticket,
                payment_id,
              ];
              break;
          }
          break;

        case eventsName[1]:
          switch (step_2.length) {
            case 2:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                demo,
                reason_of_demo,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 3:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                demo,
                reason_of_demo,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 4:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                demo,
                reason_of_demo,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                step_2[3].name,
                step_2[3].email,
                step_2[3].phone,
                step_2[3].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 5:
              dataArray = [
                title,
                domain,
                project_type,
                guide_name,
                guide_email,
                guide_phone,
                hod_email,
                sponsored,
                company,
                nda,
                abstract,
                demo,
                reason_of_demo,
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                step_2[2].name,
                step_2[2].email,
                step_2[2].phone,
                step_2[2].gender,
                step_2[3].name,
                step_2[3].email,
                step_2[3].phone,
                step_2[3].gender,
                step_2[4].name,
                step_2[4].email,
                step_2[4].phone,
                step_2[4].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;
          }
          break;

        case eventsName[2]:
          switch (step_2.length) {
            case 1:
              dataArray = [
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;

            case 2:
              dataArray = [
                step_2[0].name,
                step_2[0].email,
                step_2[0].phone,
                step_2[0].gender,
                step_2[1].name,
                step_2[1].email,
                step_2[1].phone,
                step_2[1].gender,
                college,
                year,
                country,
                state,
                district,
                city,
                locality,
                mode,
                reason_of_mode,
                referral,
                ticket,
                payment_id,
              ];
              break;
          }
          break;
      }
      // console.log(data);
      // console.log(eventsQueries.completeRegistration(event_name, step_2.length));
      // console.log(dataArray);
      const [[results]] = await db
        .execute(
          eventsQueries.completeRegistration(event_name, step_2.length),
          dataArray
        )
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getPendingPayments(event_name) {
    try {
      const [results] = await db
        .execute(ticketQueries.getPendingPayments, [
          event_name[0].toUpperCase(),
        ])
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function getProjects(event_name) {
    try {
      const [results] = await db
        .execute(eventsQueries.getProjects(event_name))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results;
    } catch (err) {
      throw err;
    }
  }

  async function getProject(event_name, pid) {
    try {
      pid = pid.map(id => `'${id}'`).join(",")
      const [results] = await db
        .execute(eventsQueries.getProject({ event_name, pid }))
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results;
    } catch (err) {
      throw err;
    }
  }

  async function updateProject(data) {
    try {
      const [results] = await db
        .execute(
          { sql: eventsQueries.updateProject(data), namedPlaceholders: true },
          data
        )
        .catch((err) => {
          console.log(err);

          throw new AppError(400, "fail", err.sqlMessage);
        });

      return results[0];
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function insertPICT(data) {
    try {
      const {
        title,
        abstract,
        domain,
        guide_email,
        guide_name,
        project_type,
        name,
        phone,
        email,
      } = data;
      let dataArray = [];
      switch (name.length) {
        case 1:
          dataArray = [
            title,
            domain,
            project_type,
            guide_name,
            guide_email,
            abstract,
            name[0],
            email[0],
            phone[0],
          ];
          break;

        case 2:
          dataArray = [
            title,
            domain,
            project_type,
            guide_name,
            guide_email,
            abstract,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
          ];
          break;

        case 3:
          dataArray = [
            title,
            domain,
            project_type,
            guide_name,
            guide_email,
            abstract,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
          ];
          break;

        case 4:
          dataArray = [
            title,
            domain,
            project_type,
            guide_name,
            guide_email,
            abstract,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
            name[3],
            email[3],
            phone[3],
          ];
          break;

        case 5:
          dataArray = [
            title,
            domain,
            project_type,
            guide_name,
            guide_email,
            abstract,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
            name[3],
            email[3],
            phone[3],
            name[4],
            email[4],
            phone[4],
          ];
          break;
      }
      const [[results]] = await db
        .execute(eventsQueries.insertPICT(name.length), dataArray)
        .catch((err) => {

          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  async function insertImpetusPICT(data) {
    try {
      const {
        title,
        abstract,
        domain,
        year,
        project_type,
        name,
        phone,
        email,
      } = data;
      let dataArray = [];
      switch (name.length) {
        case 1:
          dataArray = [
            title,
            domain,
            project_type,
            abstract,
            year,
            name[0],
            email[0],
            phone[0],
          ];
          break;

        case 2:
          dataArray = [
            title,
            domain,
            project_type,
            abstract,
            year,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
          ];
          break;

        case 3:
          dataArray = [
            title,
            domain,
            project_type,
            abstract,
            year,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
          ];
          break;

        case 4:
          dataArray = [
            title,
            domain,
            project_type,
            abstract,
            year,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
            name[3],
            email[3],
            phone[3],
          ];
          break;

        case 5:
          dataArray = [
            title,
            domain,
            project_type,
            abstract,
            year,
            name[0],
            email[0],
            phone[0],
            name[1],
            email[1],
            phone[1],
            name[2],
            email[2],
            phone[2],
            name[3],
            email[3],
            phone[3],
            name[4],
            email[4],
            phone[4],
          ];
          break;
      }
      const [[results]] = await db
        .execute(eventsQueries.insertImpetusPICT(name.length), dataArray)
        .catch((err) => {
          throw new AppError(400, "fail", err.sqlMessage);
        });
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  return {
    getUserRegistration,
    getRegistrations,
    getTicketDetails,
    getMembersFromTicket,
    getPaymentDetails,
    insertTicket,
    editStepData,
    editPaymentAndStep,
    completeRegistration,
    getPendingPayments,
    getProjects,
    getProject,
    updateProject,
    insertPICT,
    insertImpetusPICT,
  };
}

export default eventsServices;
