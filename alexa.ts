import { fetchSkills } from './app/fetchSkills';
import { interval } from './config';

const tasks: [string, number][] = [
    ['Business-and-Finance', 16],
    ['Connected-Car', 2],
    ['education-reference', 1],
    ['Food-and-Drink', 20],
    ['games-trivia-accessories', 1],
    ['Health-and-Fitness', 24],
    ['lifestyle', 10],
    ['Local', 17],
    ['Movies-and-TV', 13],
    ['Music-and-Audio', 20],
    ['News', 1],
    ['novelty-humor', 1],
    ['Productivity', 10],
    ['Shopping', 4],
    ['Smart-Home', 23],
    ['Social', 11],
    ['Sports', 23],
    ['Travel-and-Transportation', 14],
    ['Utilities', 15],
    ['Weather', 21],
    ['Other', 419]
]

let timeout = 0;

tasks.forEach(([type, pages], idx) => {
    setTimeout(() => {
        fetchSkills(type, pages)
    }, timeout);
    timeout += pages * interval;
});
