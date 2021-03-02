export default function checkCollision({ player, map }) {
  if (!player || !Array.isArray(player.position) || !map || !Array.isArray(map.path)) return false;

  for (let i = 0; i < map.path.length; i++)
    if (map.path[i][0] === player.position[0] && map.path[i][1] === player.position[1])
      return false;

  return true;
}
