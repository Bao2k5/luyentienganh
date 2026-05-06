// Script to generate all 500 questions for 10 sets with different contexts

const set1Questions = require('./set1-daily-life');
const set2Questions = require('./set2-school-learning');
const set3Questions = require('./set3-family-friends');
const set4Questions = require('./set4-travel-entertainment');
const set5Questions = require('./set5-work-career');
const set6Questions = require('./set6-health-sports');
const set7Questions = require('./set7-technology-internet');
const set8Questions = require('./set8-environment-nature');
const set9Questions = require('./set9-culture-society');
const set10Questions = require('./set10-mixed-contexts');

const allQuestions = [
    ...set1Questions,
    ...set2Questions,
    ...set3Questions,
    ...set4Questions,
    ...set5Questions,
    ...set6Questions,
    ...set7Questions,
    ...set8Questions,
    ...set9Questions,
    ...set10Questions
];

module.exports = allQuestions;
