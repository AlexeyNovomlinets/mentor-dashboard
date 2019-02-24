const XLSX = require('xlsx');

const getrPairs = (sheet) => {
  return XLSX.utils.sheet_to_json(sheet)
    .filter(pair => pair['interviewer'] !== undefined);
};

const getMentorsGit = (sheet) => {
  return XLSX.utils.sheet_to_json(sheet)
    .filter(mentor => mentor['Count'] !== undefined)
    .map(mentor => {
      const newMentor = {};
      const gitName = mentor['GitHub'].split('');
      newMentor['name'] = mentor['Name'] + ' ' + mentor['Surname'];
      gitName.splice(0, 19);
      newMentor['gitName'] = gitName.join('');
      newMentor['gitLink'] = mentor['GitHub'];
      newMentor['city'] = mentor['City'];
      return newMentor;
    });
};

module.exports = { getrPairs, getMentorsGit };
