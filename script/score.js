const XLSX = require('xlsx');

const getScore = (sheet) => {
  return XLSX.utils.sheet_to_json(sheet, {raw: false})
  .map(score => {
    const newScore = {};
    newScore['gitMentor'] = score['Ссылка на GitHub ментора в формате: https://github.com/nickname'];
    newScore['gitStudent'] = score['Ссылка на GitHub студента в формате: https://github.com/nickname'].toLowerCase();
    newScore['task'] = score['Таск'];
    newScore['score'] = score['Оценка'];
    newScore['PR'] = (score['Ссылка на Pull Request'].indexOf('pull') + 1) ? true : false;
    newScore['timeStamp'] = score['Timestamp'];
    return newScore;
  });
};

module.exports = getScore;
