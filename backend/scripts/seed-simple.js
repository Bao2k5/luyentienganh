require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Base template for 50 questions (same grammar, different contexts)
const baseQuestions = [
    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        templates: [
            { text: "I _______ play tennis on weekends.", contexts: ["play tennis", "go swimming", "study English", "watch movies", "cook dinner", "read books", "exercise", "play games", "visit friends", "do yoga"] },
            { text: "She _______ late for work.", contexts: ["late for work", "tired in the morning", "busy on Mondays", "happy at work", "stressed at work", "early for meetings", "late for class", "ready on time", "absent from work", "punctual"] },
            { text: "How often _______ to the gym?", contexts: ["to the gym", "to the library", "to the cinema", "to the park", "to the mall", "to the beach", "to the museum", "to the café", "to the market", "to the pool"] },
            { text: "The sun _______ in the east.", contexts: ["in the east", "every morning", "at dawn", "daily", "regularly", "naturally", "always", "without fail", "predictably", "consistently"] },
            { text: "I _______ a text message at the moment.", contexts: ["a text message", "an email", "a report", "my homework", "a letter", "an essay", "a document", "a presentation", "notes", "an article"] },
            { text: "She normally works in the office, but she _______ at home this week.", contexts: ["at home", "remotely", "from home", "online", "at the café", "at the library", "at a co-working space", "from her laptop", "flexibly", "independently"] },
            { text: "I _______ what you mean. (stative verb)", contexts: ["what you mean", "the answer", "your name", "this word", "the truth", "the reason", "the solution", "the problem", "the difference", "the way"] }
        ],
        options: [
            { A: "never", B: "don't never", C: "am never", D: "never am" },
            { A: "is always", B: "always is", C: "be always", D: "always be" },
            { A: "do you go", B: "are you going", C: "you go", D: "goes you" },
            { A: "rise", B: "rises", C: "is rising", D: "rising" },
            { A: "send", B: "sends", C: "am sending", D: "sended" },
            { A: "works", B: "is working", C: "work", D: "worked" },
            { A: "am knowing", B: "knows", C: "know", D: "knowing" }
        ],
        correctAnswers: ["A", "A", "A", "B", "C", "B", "C"],
        explanations: [
            "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước động từ.",
            "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
            "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
            "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ số ít nên động từ thêm 's'. Đáp án B đúng.",
            "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
            "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
            "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng."
        ],
        unit: "Unit 1"
    }
];

// For now, let's just add setNumber to all existing questions
// This is a simpler approach - we'll manually update seed.js

console.log("This script is a template. Please run the main seed.js after adding setNumber to all questions.");
console.log("Total questions needed: 500 (50 questions × 10 sets)");
