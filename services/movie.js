'use strict';

const request = require('request');
const components = require('../components/buttonTemplate')

const showTime = {
  '欣欣': '2',
  '今日': '4',
  '東南亞': '8',
  '板橋': '6',
  '樹林': '54',
  '土城': '55',
  '台中站前': '53',
  '台中文心': '56',
  '嘉義': '9',
  '基隆': '5',
  '花蓮': '3',
  '台東': '7'
}

const getDefaultDate = () => new Date().toISOString().replace(/-/g, '/').substring(0, 10)

var userData = { "uuid": { "影城": "欣欣", "時段": "上午" } }

function getPlayList(corpId, date = getDefaultDate()) {
  return new Promise((resolve, reject) => {
    let url = `https://api.showtimes.com.tw/1/events/listForCorporation/${corpId}?date=${date}`;
    request.get({ url, json: true }, (err, resp, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    });
  });
}

function getProgramEvent(progId, date = getDefaultDate()) {
  return new Promise((resolve, reject) => {
    let url = `https://capi.showtimes.com.tw/1/events/listForProgram/${progId}?date=${date}`;
    request.get({ url, json: true }, (err, resp, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    });
  });
}

function getProgramDetail(progId) {
  return new Promise((resolve, reject) => {
    let url = `https://capi.showtimes.com.tw/1/programs/${progId}`;
    request.get({ url, json: true }, (err, resp, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    })
  })
}

function getTimeSlot(timestamp) {
  let hour = new Date(timestamp).getUTCHours();
  switch (true) {
    case (hour <= 3):
      return '晚上';
    case (hour <= 12):
      return '上午';
    case (hour <= 18):
      return '下午';
    default:
      return '晚上';
  }
}

function getProgramDetailByTheaterNameTimeSlot(theaterName, timeSlot) {
  return new Promise((resolve, reject) => {
    getPlayList(showTime[theaterName])
      .then(playList => playList.payload.events.filter(event => getTimeSlot(event.startedAt) == timeSlot))
      .then(events => Array.from(new Set(events.map(event => event.programId))))
      .then(programsId => programsId[Math.floor(Math.random() * programsId.length)])
      .then(programId => getProgramDetail(programId))
      .then(programDetail => resolve(programDetail))
      .catch(err => reject(err));
  });
}




function getAnswer(intent, userId, entity) {
  switch (intent.replace('[回應]', '')) {
    case '影城':
      return Object.keys(showTime);
    case '時段':
      userData[userId]["影城"] = entity;
      return ['上午', '下午', '晚上'];
  }
  switch (intent.replace('[輸出]', '')) {
    case '結果':
      return getProgramDetailByTheaterIdTimeSlot(userData[userId]["影城"], entity).then(programDetail => programDetail.name);
  }
  return null;
}


function main() {
  const program = getProgramEvent('1410').then(program => console.log(program))
}

module.exports = { getAnswer }