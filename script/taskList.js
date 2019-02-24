const XLSX = require('xlsx');

const getTasksList = (sheet) => {
  return XLSX.utils.sheet_to_json(sheet)
    .map(task => {
      const newTasks = {};
      newTasks['name'] = task['task'].trim();
      newTasks['link'] = task['link'] || '';
      newTasks['status'] = task['Status'];
      return newTasks;
    });
};

module.exports = getTasksList;
