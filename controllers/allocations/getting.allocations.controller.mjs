function getAllocationController(allocationServices, emailServices, eventsServices, judgeServices) {
  async function getLabs(req, res, next) {
    try {
        const { event_name } = req.params
        const labs = await allocationServices.getLabs(event_name);
        res.status(200).json(labs)
    }   catch (error) {
        next(error);
    }
}

    return {
        getLabs
    }
  }
  
  export default getAllocationController;
  