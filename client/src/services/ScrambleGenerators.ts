import ThreeByThreeScramble from "./ThreeByThreeScramble.service.ts";
import TwoByTwoScramble from "./TwoByTwoScramble.service.ts";
import FourByFourScramble from "./FourByFourScramble.ts";

const scrambleGenerators: Record<string, () => string> = {
    "2x2x2": TwoByTwoScramble,
    "3x3x3": ThreeByThreeScramble,
    "4x4x4": FourByFourScramble,
    // "5x5x5": FiveByFiveScramble,
    // "6x6x6": SixBySixScramble,
};

export default scrambleGenerators;
