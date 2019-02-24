const path = require('path');
const fs = require('fs');
const { getrPairs, getMentorsGit } = require('./pairs');
const getTaskList = require('./taskList');
const getScore = require('./score');
const XLSX = require('xlsx');

const workbook_pairs = XLSX.readFile(path.join(__dirname, '_data/Mentor-students pairs.xlsx'));
const sheet_pairs = workbook_pairs.Sheets['pairs'];
const sheet_nameToGit = workbook_pairs.Sheets['second_name-to_github_account'];

const workbook_taskList = XLSX.readFile(path.join(__dirname, '_data/Tasks.xlsx'));
const sheet_taskList = workbook_taskList.Sheets['Sheet1'];

const workbook_score = XLSX.readFile(path.join(__dirname, '_data/Mentor score.xlsx'));
const sheet_score = workbook_score.Sheets['Form Responses 1'];

console.log('Data parsing...');

const pairs = getrPairs(sheet_pairs);
const mentorsGit = getMentorsGit(sheet_nameToGit);
const taskList = getTaskList(sheet_taskList);
const score = getScore(sheet_score);

const getJSON = (pairs, mentorsGit, taskList, score) => {
  const json = Object.assign([], mentorsGit);
  json.map(mentor => {
    const students = pairs.filter(pair => pair['interviewer'] === mentor['name']);
    const mentorScore = score.filter(item => item['gitMentor'] === mentor['gitLink']);
    mentor['count'] = students.length;
    mentor['taskList'] = taskList;
    mentor['students'] = students.map(item => {
      const student = {};
      student['gitName'] = item['student github'];
      student['gitLink'] = 'https://github.com/' + item['student github'];
      student['taskList'] = mentorScore.filter(item => item['gitStudent'] === student['gitLink'])
        .map(item => {
          const task = {};
          task['name'] = item['task'];
          task['score'] = item['score'];
          task['PR'] = item['PR'];
          task['timeStamp'] = item['timeStamp'];
          return task;
        });
      return student;
    });
  });
  return json;
};

const dataScore = getJSON(pairs, mentorsGit, taskList, score);
const dataScoreFile = JSON.stringify(dataScore, 0, 2);
fs.writeFile(path.join(__dirname, '../public/dataScore.json'), dataScoreFile, 'utf8', () => {
  console.log('Data parse done!');
});
