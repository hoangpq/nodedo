const ws = new WebSocket('ws://localhost:4444');

ws.addEventListener('message', function ({ data }) {
  let result = JSON.parse(data);
  switch (result.action) {
    case 'registered':
      ws._id = result.payload.id;
      console.log(`Registered with id: ${ws._id}`);
      break;
    case 'message':
      console.log(result.payload.message);
      break;
  }
});

let $ = window.$;

$(function () {
  $('.room').bind('click', function (e) {
    e.stopPropagation();
    ws.send(JSON.stringify({
      action: 'join_room',
      room: $(this).attr('room')
    }));
  });
});
