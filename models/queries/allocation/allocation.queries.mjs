function allocationQueries() {
  const updateLab = (event_name, data) => {
    let placeholders = ''
    for (let i = 0; i < data.pids.length - 1; i++) placeholders += ', ?'
    return `UPDATE ${event_name}_projects SET lab = ? WHERE pid IN (?${placeholders});`;
  }

  const allocate = (event_name, pids, jids, slots) => {
    let placeholders = ''
    slots = slots.map(slot => `"${slot}"`)
    for (let i = 1; i < pids.length; i++) placeholders += `, ('${pids[i]}', '${jids[0]}',  '', '[${slots}]', CURRENT_TIMESTAMP(), '${event_name}')`
    placeholders = jids.length === 1 && pids.length === 1 ? '' : placeholders
    return `INSERT INTO allocations VALUES ('${pids[0]}', '${jids[0]}', '', '[${slots}]', CURRENT_TIMESTAMP(), '${event_name}')${placeholders};`
  }

  const deallocate = (event_name, pids, jids) => {
    let placeholders = ''
    for (let i = 1; i < pids.length; i++) placeholders += `,'${pids[i]}'`
    return `DELETE FROM allocations WHERE (pid IN  ('${pids[0]}'${placeholders}) AND jid = '${jids[0]}' AND event_name = '${event_name}');`
  }

  const getLabs = (event_name) => `SELECT pid,title,lab FROM ${event_name}_projects;`

  return {
    updateLab,
    allocate,
    deallocate,
    getLabs
  }
}

export { allocationQueries };
