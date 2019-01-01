const MAX_BUTTON_SLOT = 4;

// TODO 存到 mongodb
var user_actions = {}

function templateMapper(dataArray) {
  return {
    "type": "template",
    "altText": "選擇影城",
    "template": {
      "type": "buttons",
      "thumbnailImageUrl": "https:example.com/bot/images/image.jpg",
      "imageAspectRatio": "rectangle",
      "imageSize": "cover",
      "imageBackgroundColor": "#FFFFFF",
      "title": "Menu",
      "text": "Please select",
      "defaultAction": {
        "type": "uri",
        "label": "View detail",
        "uri": "http:example.com/page/123"
      },
      "actions": [
        {
          "type": "postback",
          "label": "Buy",
          "data": "action=buy&itemid=123"
        },
        {
          "type": "postback",
          "label": "Add to cart",
          "data": "action=add&itemid=123"
        },
        {
          "type": "postback",
          "label": "其他",
          "uri": "action=another"
        }
      ]
    }
  }
}

function getButtonTemplate(actions, title = '標題', text = '文字', altText = '替代文字') {
  return {
    type: 'template',
    altText: altText,
    template: {
      type: 'buttons',
      // thumbnailImageUrl: buttonsImageURL,
      title: title,
      text: text,
      actions: getAvaliableActions(actions),
    },
  }
}

function getAvaliableActions(actions) {
  // TODO: 把剩下的 action 存到 temp actions
  let avaliableActions = actions;
  if (actions.length > MAX_BUTTON_SLOT) {
    avaliableActions = actions.splice(0, 3);
    avaliableActions.append(getAnotherAction())
  }
  return avaliableActions;
}

function getButtonActions(actions) {
  return actions.map(action => {
    return { label: action, type: 'postback', data: action }
  });
}

function getAnotherAction() {
  return { label: '其他', type: 'postback', data: 'another' }
}

module.exports = { getButtonTemplate }
