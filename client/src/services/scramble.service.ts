export default function generateScramble(
  length: number
): { move: string; modifier: string }[] {
  function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  const moves = ["U", "D", "L", "R", "F", "B"];
  const modifiers = ["", "'", "2"];

  let scramble = [];

  let prevMove = "";
  for (let i = 0; i < length; i++) {
    let randomMove = moves[getRandomInt(moves.length)];
    while (randomMove === prevMove) {
      randomMove = moves[getRandomInt(moves.length)];
    }
    const randomModifier = modifiers[getRandomInt(modifiers.length)];

    scramble.push({ move: randomMove, modifier: randomModifier });
    prevMove = randomMove;
  }

  return scramble;
}
