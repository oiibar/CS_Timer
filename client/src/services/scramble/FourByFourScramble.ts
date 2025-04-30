export default function FourByFourScramble(): string {
    function getRandomInt(max: number): number {
        return Math.floor(Math.random() * max);
    }

    const faceMoves = ["U", "D", "L", "R", "F", "B"];
    const wideMoves = ["Uw", "Dw", "Lw", "Rw", "Fw", "Bw"];
    const modifiers = ["", "'", "2"];
    const scrambleLength = 45;
    const introLength = getRandomInt(3) + 20;

    let scramble = [];
    let prevMove = "";

    for (let i = 0; i < scrambleLength; i++) {
        const movePool = i < introLength ? faceMoves : [...faceMoves, ...wideMoves];
        let move = movePool[getRandomInt(movePool.length)];

        while (move[0] === prevMove[0]) {
            move = movePool[getRandomInt(movePool.length)];
        }

        const modifier = modifiers[getRandomInt(modifiers.length)];
        scramble.push(`${move}${modifier}`);
        prevMove = move;
    }

    return scramble.join(" ");
}
