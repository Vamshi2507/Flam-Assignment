const rooms = {};

function getRoom(id) {
  if (!rooms[id]) rooms[id] = { users: [] };
  return rooms[id];
}

module.exports = { getRoom, rooms };
