export default function checkFinish({ player, map }) {
  if (!player || !Array.isArray(player.position) || !map || !Array.isArray(map.finish))
    return false;

  return player.position[0] === map.finish[0] && player.position[1] === map.finish[1];
}
