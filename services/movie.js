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
    let url = `https://www.showtimes.com.tw/events/byProgram/${progId}?date=${date}`;
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

function getAnswer(intent) {
  switch (intent.replace('[回應]', '')) {
    case '影城':
      return Object.keys(showTime);
    case '時段':
      return null;
    case '結果':
      return null;
  }
}

function main() {
  getPlayList('2').then((playList) => console.log(playList.payload.programs.map(program => program.name)), (err) => {
    console.log(err);
  })

  const program = getProgramEvent('1410').then(program => console.log(program))
}

module.exports = { getAnswer }