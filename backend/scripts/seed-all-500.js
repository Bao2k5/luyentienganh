require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

const questions = [

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ play tennis on weekends.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 1,
        setNumber: 1
    },
    {
        questionText: "She _______ late for work.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 2,
        setNumber: 1
    },
    {
        questionText: "How often _______ to the gym?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 3,
        setNumber: 1
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 4,
        setNumber: 1
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 5,
        setNumber: 1
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 6,
        setNumber: 1
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 7,
        setNumber: 1
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Mexico on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 8,
        setNumber: 1
    },
    {
        questionText: "I _______ the film. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 9,
        setNumber: 1
    },
    {
        questionText: "_______ the party last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 10,
        setNumber: 1
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 11,
        setNumber: 1
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 12,
        setNumber: 1
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 13,
        setNumber: 1
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 14,
        setNumber: 1
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ lunch.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 15,
        setNumber: 1
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 16,
        setNumber: 1
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 17,
        setNumber: 1
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 18,
        setNumber: 1
    },
    {
        questionText: "_______ was happy at the party.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 19,
        setNumber: 1
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 20,
        setNumber: 1
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 21,
        setNumber: 1
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ buy a new phone next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 22,
        setNumber: 1
    },
    {
        questionText: "She _______ work tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 23,
        setNumber: 1
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 24,
        setNumber: 1
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 25,
        setNumber: 1
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 26,
        setNumber: 1
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 27,
        setNumber: 1
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 28,
        setNumber: 1
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 29,
        setNumber: 1
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 30,
        setNumber: 1
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 31,
        setNumber: 1
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 32,
        setNumber: 1
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 33,
        setNumber: 1
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 34,
        setNumber: 1
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 35,
        setNumber: 1
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 36,
        setNumber: 1
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 37,
        setNumber: 1
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 38,
        setNumber: 1
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 39,
        setNumber: 1
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 40,
        setNumber: 1
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 41,
        setNumber: 1
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 42,
        setNumber: 1
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 43,
        setNumber: 1
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 44,
        setNumber: 1
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 45,
        setNumber: 1
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 46,
        setNumber: 1
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 47,
        setNumber: 1
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 48,
        setNumber: 1
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 49,
        setNumber: 1
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 50,
        setNumber: 1
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ study math after school.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 51,
        setNumber: 2
    },
    {
        questionText: "She _______ late for class.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 52,
        setNumber: 2
    },
    {
        questionText: "How often _______ to the library?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 53,
        setNumber: 2
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 54,
        setNumber: 2
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 55,
        setNumber: 2
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 56,
        setNumber: 2
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 57,
        setNumber: 2
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to London on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 58,
        setNumber: 2
    },
    {
        questionText: "I _______ the lesson. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 59,
        setNumber: 2
    },
    {
        questionText: "_______ the exam last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 60,
        setNumber: 2
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 61,
        setNumber: 2
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 62,
        setNumber: 2
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 63,
        setNumber: 2
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 64,
        setNumber: 2
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ studying.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 65,
        setNumber: 2
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 66,
        setNumber: 2
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 67,
        setNumber: 2
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 68,
        setNumber: 2
    },
    {
        questionText: "_______ was happy at the exam.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 69,
        setNumber: 2
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 70,
        setNumber: 2
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 71,
        setNumber: 2
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ finish my project next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 72,
        setNumber: 2
    },
    {
        questionText: "She _______ attend class tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 73,
        setNumber: 2
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 74,
        setNumber: 2
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 75,
        setNumber: 2
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 76,
        setNumber: 2
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 77,
        setNumber: 2
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 78,
        setNumber: 2
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 79,
        setNumber: 2
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 80,
        setNumber: 2
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 81,
        setNumber: 2
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 82,
        setNumber: 2
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 83,
        setNumber: 2
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 84,
        setNumber: 2
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 85,
        setNumber: 2
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 86,
        setNumber: 2
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 87,
        setNumber: 2
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 88,
        setNumber: 2
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 89,
        setNumber: 2
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 90,
        setNumber: 2
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 91,
        setNumber: 2
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 92,
        setNumber: 2
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 93,
        setNumber: 2
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 94,
        setNumber: 2
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 95,
        setNumber: 2
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 96,
        setNumber: 2
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 97,
        setNumber: 2
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 98,
        setNumber: 2
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 99,
        setNumber: 2
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 100,
        setNumber: 2
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ visit relatives on holidays.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 101,
        setNumber: 3
    },
    {
        questionText: "She _______ busy with family.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 102,
        setNumber: 3
    },
    {
        questionText: "How often _______ to family gatherings?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 103,
        setNumber: 3
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 104,
        setNumber: 3
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 105,
        setNumber: 3
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 106,
        setNumber: 3
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 107,
        setNumber: 3
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Paris on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 108,
        setNumber: 3
    },
    {
        questionText: "I _______ the reunion. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 109,
        setNumber: 3
    },
    {
        questionText: "_______ the wedding last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 110,
        setNumber: 3
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 111,
        setNumber: 3
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 112,
        setNumber: 3
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 113,
        setNumber: 3
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 114,
        setNumber: 3
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ cooking.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 115,
        setNumber: 3
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 116,
        setNumber: 3
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 117,
        setNumber: 3
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 118,
        setNumber: 3
    },
    {
        questionText: "_______ was happy at the wedding.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 119,
        setNumber: 3
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 120,
        setNumber: 3
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 121,
        setNumber: 3
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ organize a party next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 122,
        setNumber: 3
    },
    {
        questionText: "She _______ meet friends tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 123,
        setNumber: 3
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 124,
        setNumber: 3
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 125,
        setNumber: 3
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 126,
        setNumber: 3
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 127,
        setNumber: 3
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 128,
        setNumber: 3
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 129,
        setNumber: 3
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 130,
        setNumber: 3
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 131,
        setNumber: 3
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 132,
        setNumber: 3
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 133,
        setNumber: 3
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 134,
        setNumber: 3
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 135,
        setNumber: 3
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 136,
        setNumber: 3
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 137,
        setNumber: 3
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 138,
        setNumber: 3
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 139,
        setNumber: 3
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 140,
        setNumber: 3
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 141,
        setNumber: 3
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 142,
        setNumber: 3
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 143,
        setNumber: 3
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 144,
        setNumber: 3
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 145,
        setNumber: 3
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 146,
        setNumber: 3
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 147,
        setNumber: 3
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 148,
        setNumber: 3
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 149,
        setNumber: 3
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 150,
        setNumber: 3
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ travel abroad during vacations.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 151,
        setNumber: 4
    },
    {
        questionText: "She _______ late for flights.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 152,
        setNumber: 4
    },
    {
        questionText: "How often _______ to the airport?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 153,
        setNumber: 4
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 154,
        setNumber: 4
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 155,
        setNumber: 4
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 156,
        setNumber: 4
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 157,
        setNumber: 4
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Thailand on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 158,
        setNumber: 4
    },
    {
        questionText: "I _______ the concert. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 159,
        setNumber: 4
    },
    {
        questionText: "_______ the festival last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 160,
        setNumber: 4
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 161,
        setNumber: 4
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 162,
        setNumber: 4
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 163,
        setNumber: 4
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 164,
        setNumber: 4
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ sightseeing.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 165,
        setNumber: 4
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 166,
        setNumber: 4
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 167,
        setNumber: 4
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 168,
        setNumber: 4
    },
    {
        questionText: "_______ was happy at the festival.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 169,
        setNumber: 4
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 170,
        setNumber: 4
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 171,
        setNumber: 4
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ book a trip next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 172,
        setNumber: 4
    },
    {
        questionText: "She _______ travel tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 173,
        setNumber: 4
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 174,
        setNumber: 4
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 175,
        setNumber: 4
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 176,
        setNumber: 4
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 177,
        setNumber: 4
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 178,
        setNumber: 4
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 179,
        setNumber: 4
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 180,
        setNumber: 4
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 181,
        setNumber: 4
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 182,
        setNumber: 4
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 183,
        setNumber: 4
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 184,
        setNumber: 4
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 185,
        setNumber: 4
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 186,
        setNumber: 4
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 187,
        setNumber: 4
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 188,
        setNumber: 4
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 189,
        setNumber: 4
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 190,
        setNumber: 4
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 191,
        setNumber: 4
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 192,
        setNumber: 4
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 193,
        setNumber: 4
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 194,
        setNumber: 4
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 195,
        setNumber: 4
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 196,
        setNumber: 4
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 197,
        setNumber: 4
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 198,
        setNumber: 4
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 199,
        setNumber: 4
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 200,
        setNumber: 4
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ work overtime on weekdays.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 201,
        setNumber: 5
    },
    {
        questionText: "She _______ busy at work.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 202,
        setNumber: 5
    },
    {
        questionText: "How often _______ to the office?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 203,
        setNumber: 5
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 204,
        setNumber: 5
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 205,
        setNumber: 5
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 206,
        setNumber: 5
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 207,
        setNumber: 5
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Singapore on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 208,
        setNumber: 5
    },
    {
        questionText: "I _______ the presentation. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 209,
        setNumber: 5
    },
    {
        questionText: "_______ the conference last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 210,
        setNumber: 5
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 211,
        setNumber: 5
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 212,
        setNumber: 5
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 213,
        setNumber: 5
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 214,
        setNumber: 5
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ working.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 215,
        setNumber: 5
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 216,
        setNumber: 5
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 217,
        setNumber: 5
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 218,
        setNumber: 5
    },
    {
        questionText: "_______ was happy at the conference.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 219,
        setNumber: 5
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 220,
        setNumber: 5
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 221,
        setNumber: 5
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ start a business next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 222,
        setNumber: 5
    },
    {
        questionText: "She _______ have a meeting tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 223,
        setNumber: 5
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 224,
        setNumber: 5
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 225,
        setNumber: 5
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 226,
        setNumber: 5
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 227,
        setNumber: 5
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 228,
        setNumber: 5
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 229,
        setNumber: 5
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 230,
        setNumber: 5
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 231,
        setNumber: 5
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 232,
        setNumber: 5
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 233,
        setNumber: 5
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 234,
        setNumber: 5
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 235,
        setNumber: 5
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 236,
        setNumber: 5
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 237,
        setNumber: 5
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 238,
        setNumber: 5
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 239,
        setNumber: 5
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 240,
        setNumber: 5
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 241,
        setNumber: 5
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 242,
        setNumber: 5
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 243,
        setNumber: 5
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 244,
        setNumber: 5
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 245,
        setNumber: 5
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 246,
        setNumber: 5
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 247,
        setNumber: 5
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 248,
        setNumber: 5
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 249,
        setNumber: 5
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 250,
        setNumber: 5
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ exercise regularly every morning.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 251,
        setNumber: 6
    },
    {
        questionText: "She _______ tired after training.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 252,
        setNumber: 6
    },
    {
        questionText: "How often _______ to the stadium?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 253,
        setNumber: 6
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 254,
        setNumber: 6
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 255,
        setNumber: 6
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 256,
        setNumber: 6
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 257,
        setNumber: 6
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Brazil on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 258,
        setNumber: 6
    },
    {
        questionText: "I _______ the match. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 259,
        setNumber: 6
    },
    {
        questionText: "_______ the tournament last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 260,
        setNumber: 6
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 261,
        setNumber: 6
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 262,
        setNumber: 6
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 263,
        setNumber: 6
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 264,
        setNumber: 6
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ training.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 265,
        setNumber: 6
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 266,
        setNumber: 6
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 267,
        setNumber: 6
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 268,
        setNumber: 6
    },
    {
        questionText: "_______ was happy at the tournament.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 269,
        setNumber: 6
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 270,
        setNumber: 6
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 271,
        setNumber: 6
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ join a gym next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 272,
        setNumber: 6
    },
    {
        questionText: "She _______ compete tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 273,
        setNumber: 6
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 274,
        setNumber: 6
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 275,
        setNumber: 6
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 276,
        setNumber: 6
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 277,
        setNumber: 6
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 278,
        setNumber: 6
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 279,
        setNumber: 6
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 280,
        setNumber: 6
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 281,
        setNumber: 6
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 282,
        setNumber: 6
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 283,
        setNumber: 6
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 284,
        setNumber: 6
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 285,
        setNumber: 6
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 286,
        setNumber: 6
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 287,
        setNumber: 6
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 288,
        setNumber: 6
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 289,
        setNumber: 6
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 290,
        setNumber: 6
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 291,
        setNumber: 6
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 292,
        setNumber: 6
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 293,
        setNumber: 6
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 294,
        setNumber: 6
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 295,
        setNumber: 6
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 296,
        setNumber: 6
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 297,
        setNumber: 6
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 298,
        setNumber: 6
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 299,
        setNumber: 6
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 300,
        setNumber: 6
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ code programs online.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 301,
        setNumber: 7
    },
    {
        questionText: "She _______ busy with tech.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 302,
        setNumber: 7
    },
    {
        questionText: "How often _______ to tech events?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 303,
        setNumber: 7
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 304,
        setNumber: 7
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 305,
        setNumber: 7
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 306,
        setNumber: 7
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 307,
        setNumber: 7
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Silicon Valley on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 308,
        setNumber: 7
    },
    {
        questionText: "I _______ the webinar. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 309,
        setNumber: 7
    },
    {
        questionText: "_______ the hackathon last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 310,
        setNumber: 7
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 311,
        setNumber: 7
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 312,
        setNumber: 7
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 313,
        setNumber: 7
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 314,
        setNumber: 7
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ programming.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 315,
        setNumber: 7
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 316,
        setNumber: 7
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 317,
        setNumber: 7
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 318,
        setNumber: 7
    },
    {
        questionText: "_______ was happy at the hackathon.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 319,
        setNumber: 7
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 320,
        setNumber: 7
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 321,
        setNumber: 7
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ build an app next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 322,
        setNumber: 7
    },
    {
        questionText: "She _______ launch tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 323,
        setNumber: 7
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 324,
        setNumber: 7
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 325,
        setNumber: 7
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 326,
        setNumber: 7
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 327,
        setNumber: 7
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 328,
        setNumber: 7
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 329,
        setNumber: 7
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 330,
        setNumber: 7
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 331,
        setNumber: 7
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 332,
        setNumber: 7
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 333,
        setNumber: 7
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 334,
        setNumber: 7
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 335,
        setNumber: 7
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 336,
        setNumber: 7
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 337,
        setNumber: 7
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 338,
        setNumber: 7
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 339,
        setNumber: 7
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 340,
        setNumber: 7
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 341,
        setNumber: 7
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 342,
        setNumber: 7
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 343,
        setNumber: 7
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 344,
        setNumber: 7
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 345,
        setNumber: 7
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 346,
        setNumber: 7
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 347,
        setNumber: 7
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 348,
        setNumber: 7
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 349,
        setNumber: 7
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 350,
        setNumber: 7
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ plant trees in nature.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 351,
        setNumber: 8
    },
    {
        questionText: "She _______ concerned about environment.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 352,
        setNumber: 8
    },
    {
        questionText: "How often _______ to the park?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 353,
        setNumber: 8
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 354,
        setNumber: 8
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 355,
        setNumber: 8
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 356,
        setNumber: 8
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 357,
        setNumber: 8
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Iceland on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 358,
        setNumber: 8
    },
    {
        questionText: "I _______ the documentary. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 359,
        setNumber: 8
    },
    {
        questionText: "_______ the eco-event last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 360,
        setNumber: 8
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 361,
        setNumber: 8
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 362,
        setNumber: 8
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 363,
        setNumber: 8
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 364,
        setNumber: 8
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ gardening.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 365,
        setNumber: 8
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 366,
        setNumber: 8
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 367,
        setNumber: 8
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 368,
        setNumber: 8
    },
    {
        questionText: "_______ was happy at the eco-event.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 369,
        setNumber: 8
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 370,
        setNumber: 8
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 371,
        setNumber: 8
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ start recycling next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 372,
        setNumber: 8
    },
    {
        questionText: "She _______ volunteer tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 373,
        setNumber: 8
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 374,
        setNumber: 8
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 375,
        setNumber: 8
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 376,
        setNumber: 8
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 377,
        setNumber: 8
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 378,
        setNumber: 8
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 379,
        setNumber: 8
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 380,
        setNumber: 8
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 381,
        setNumber: 8
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 382,
        setNumber: 8
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 383,
        setNumber: 8
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 384,
        setNumber: 8
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 385,
        setNumber: 8
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 386,
        setNumber: 8
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 387,
        setNumber: 8
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 388,
        setNumber: 8
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 389,
        setNumber: 8
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 390,
        setNumber: 8
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 391,
        setNumber: 8
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 392,
        setNumber: 8
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 393,
        setNumber: 8
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 394,
        setNumber: 8
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 395,
        setNumber: 8
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 396,
        setNumber: 8
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 397,
        setNumber: 8
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 398,
        setNumber: 8
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 399,
        setNumber: 8
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 400,
        setNumber: 8
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ attend cultural events at festivals.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 401,
        setNumber: 9
    },
    {
        questionText: "She _______ interested in culture.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 402,
        setNumber: 9
    },
    {
        questionText: "How often _______ to museums?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 403,
        setNumber: 9
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 404,
        setNumber: 9
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 405,
        setNumber: 9
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 406,
        setNumber: 9
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 407,
        setNumber: 9
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to Italy on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 408,
        setNumber: 9
    },
    {
        questionText: "I _______ the exhibition. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 409,
        setNumber: 9
    },
    {
        questionText: "_______ the ceremony last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 410,
        setNumber: 9
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 411,
        setNumber: 9
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 412,
        setNumber: 9
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 413,
        setNumber: 9
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 414,
        setNumber: 9
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ exploring culture.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 415,
        setNumber: 9
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 416,
        setNumber: 9
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 417,
        setNumber: 9
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 418,
        setNumber: 9
    },
    {
        questionText: "_______ was happy at the ceremony.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 419,
        setNumber: 9
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 420,
        setNumber: 9
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 421,
        setNumber: 9
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ learn traditions next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 422,
        setNumber: 9
    },
    {
        questionText: "She _______ celebrate tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 423,
        setNumber: 9
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 424,
        setNumber: 9
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 425,
        setNumber: 9
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 426,
        setNumber: 9
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 427,
        setNumber: 9
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 428,
        setNumber: 9
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 429,
        setNumber: 9
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 430,
        setNumber: 9
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 431,
        setNumber: 9
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 432,
        setNumber: 9
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 433,
        setNumber: 9
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 434,
        setNumber: 9
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 435,
        setNumber: 9
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 436,
        setNumber: 9
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 437,
        setNumber: 9
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 438,
        setNumber: 9
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 439,
        setNumber: 9
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 440,
        setNumber: 9
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 441,
        setNumber: 9
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 442,
        setNumber: 9
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 443,
        setNumber: 9
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 444,
        setNumber: 9
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 445,
        setNumber: 9
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 446,
        setNumber: 9
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 447,
        setNumber: 9
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 448,
        setNumber: 9
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 449,
        setNumber: 9
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 450,
        setNumber: 9
    }
,

    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    {
        questionText: "I _______ do activities regularly.",
        options: {
            A: "never",
            B: "don't never",
            C: "am never",
            D: "never am"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        unit: "Unit 1",
        orderIndex: 451,
        setNumber: 10
    },
    {
        questionText: "She _______ busy with life.",
        options: {
            A: "is always",
            B: "always is",
            C: "be always",
            D: "always be"
        },
        correctAnswer: "A",
        explanation: "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        unit: "Unit 1",
        orderIndex: 452,
        setNumber: 10
    },
    {
        questionText: "How often _______ to various places?",
        options: {
            A: "do you go",
            B: "are you going",
            C: "you go",
            D: "goes you"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        unit: "Unit 1",
        orderIndex: 453,
        setNumber: 10
    },
    {
        questionText: "The sun _______ in the east.",
        options: {
            A: "rise",
            B: "rises",
            C: "is rising",
            D: "rising"
        },
        correctAnswer: "B",
        explanation: "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        unit: "Unit 1",
        orderIndex: 454,
        setNumber: 10
    },
    {
        questionText: "I _______ a text message at the moment.",
        options: {
            A: "send",
            B: "sends",
            C: "am sending",
            D: "sended"
        },
        correctAnswer: "C",
        explanation: "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 455,
        setNumber: 10
    },
    {
        questionText: "She normally works in the office, but she _______ at home this week.",
        options: {
            A: "works",
            B: "is working",
            C: "work",
            D: "worked"
        },
        correctAnswer: "B",
        explanation: "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        unit: "Unit 1",
        orderIndex: 456,
        setNumber: 10
    },
    {
        questionText: "I _______ what you mean. (stative verb)",
        options: {
            A: "am knowing",
            B: "knows",
            C: "know",
            D: "knowing"
        },
        correctAnswer: "C",
        explanation: "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        unit: "Unit 1",
        orderIndex: 457,
        setNumber: 10
    },

    // UNIT 2: Past Simple & Making Questions (7 questions)
    {
        questionText: "Last year, we _______ to different countries on holiday.",
        options: {
            A: "go",
            B: "goes",
            C: "went",
            D: "going"
        },
        correctAnswer: "C",
        explanation: "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        unit: "Unit 2",
        orderIndex: 458,
        setNumber: 10
    },
    {
        questionText: "I _______ the event. It was very bad.",
        options: {
            A: "didn't like",
            B: "don't liked",
            C: "didn't liked",
            D: "not liked"
        },
        correctAnswer: "A",
        explanation: "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 459,
        setNumber: 10
    },
    {
        questionText: "_______ the gathering last night?",
        options: {
            A: "Did you enjoy",
            B: "Do you enjoyed",
            C: "Did you enjoyed",
            D: "Were you enjoy"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 460,
        setNumber: 10
    },
    {
        questionText: "Where _______ to school?",
        options: {
            A: "did your parents go",
            B: "your parents went",
            C: "did your parents went",
            D: "do your parents went"
        },
        correctAnswer: "A",
        explanation: "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 461,
        setNumber: 10
    },
    {
        questionText: "They _______ happy yesterday.",
        options: {
            A: "was",
            B: "were",
            C: "are",
            D: "is"
        },
        correctAnswer: "B",
        explanation: "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        unit: "Unit 2",
        orderIndex: 462,
        setNumber: 10
    },
    {
        questionText: "She _______ her homework and went to bed.",
        options: {
            A: "finish",
            B: "finishes",
            C: "finished",
            D: "finishing"
        },
        correctAnswer: "C",
        explanation: "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        unit: "Unit 2",
        orderIndex: 463,
        setNumber: 10
    },
    {
        questionText: "_______ is your email address?",
        options: {
            A: "What",
            B: "Who",
            C: "Where",
            D: "When"
        },
        correctAnswer: "A",
        explanation: "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        unit: "Unit 2",
        orderIndex: 464,
        setNumber: 10
    },

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    {
        questionText: "He called while I _______ daily tasks.",
        options: {
            A: "made",
            B: "was making",
            C: "make",
            D: "am making"
        },
        correctAnswer: "B",
        explanation: "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 465,
        setNumber: 10
    },
    {
        questionText: "They _______ for a long time yesterday.",
        options: {
            A: "wait",
            B: "waited",
            C: "were waiting",
            D: "are waiting"
        },
        correctAnswer: "C",
        explanation: "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        unit: "Unit 3",
        orderIndex: 466,
        setNumber: 10
    },
    {
        questionText: "I want to eat _______. I'm hungry.",
        options: {
            A: "anything",
            B: "something",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 467,
        setNumber: 10
    },
    {
        questionText: "I didn't eat _______ this morning.",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "B",
        explanation: "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 468,
        setNumber: 10
    },
    {
        questionText: "_______ was happy at the gathering.",
        options: {
            A: "Everyone",
            B: "Anyone",
            C: "Someone",
            D: "No one"
        },
        correctAnswer: "A",
        explanation: "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        unit: "Unit 3",
        orderIndex: 469,
        setNumber: 10
    },
    {
        questionText: "There's _______ to drink. (negative meaning)",
        options: {
            A: "something",
            B: "anything",
            C: "nothing",
            D: "everything"
        },
        correctAnswer: "C",
        explanation: "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        unit: "Unit 3",
        orderIndex: 470,
        setNumber: 10
    },
    {
        questionText: "I don't mind where we eat. _______ is OK.",
        options: {
            A: "Somewhere",
            B: "Anywhere",
            C: "Nowhere",
            D: "Everywhere"
        },
        correctAnswer: "B",
        explanation: "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        unit: "Unit 3",
        orderIndex: 471,
        setNumber: 10
    },

    // UNIT 4: Future - be going to & will (7 questions)
    {
        questionText: "I _______ make plans next month.",
        options: {
            A: "will",
            B: "am going to",
            C: "going to",
            D: "will to"
        },
        correctAnswer: "B",
        explanation: "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 472,
        setNumber: 10
    },
    {
        questionText: "She _______ do things tomorrow. (negative)",
        options: {
            A: "isn't going to",
            B: "won't going to",
            C: "not going to",
            D: "doesn't going to"
        },
        correctAnswer: "A",
        explanation: "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 473,
        setNumber: 10
    },
    {
        questionText: "Can I tell you a secret? - Sure, I _______ tell anyone.",
        options: {
            A: "will",
            B: "won't",
            C: "am not going to",
            D: "don't"
        },
        correctAnswer: "B",
        explanation: "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        unit: "Unit 4",
        orderIndex: 474,
        setNumber: 10
    },
    {
        questionText: "I've got a lot of work. - I _______ help you.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        unit: "Unit 4",
        orderIndex: 475,
        setNumber: 10
    },
    {
        questionText: "It's cold in here. - Yes, you're right. I _______ close the window.",
        options: {
            A: "am going to",
            B: "will",
            C: "going to",
            D: "won't"
        },
        correctAnswer: "B",
        explanation: "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        unit: "Unit 4",
        orderIndex: 476,
        setNumber: 10
    },
    {
        questionText: "If I _______ time, I'll email you the photos.",
        options: {
            A: "will have",
            B: "have",
            C: "am having",
            D: "had"
        },
        correctAnswer: "B",
        explanation: "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        unit: "Unit 4",
        orderIndex: 477,
        setNumber: 10
    },
    {
        questionText: "_______ you help me with this box?",
        options: {
            A: "Will",
            B: "Are",
            C: "Do",
            D: "Shall"
        },
        correctAnswer: "A",
        explanation: "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        unit: "Unit 4",
        orderIndex: 478,
        setNumber: 10
    },

    // UNIT 5: Conditionals & Comparatives (7 questions)
    {
        questionText: "If you heat water to 100°C, it _______.",
        options: {
            A: "will boil",
            B: "boils",
            C: "boil",
            D: "boiled"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 479,
        setNumber: 10
    },
    {
        questionText: "If I see Dina, I _______ her your message.",
        options: {
            A: "give",
            B: "will give",
            C: "gave",
            D: "giving"
        },
        correctAnswer: "B",
        explanation: "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 480,
        setNumber: 10
    },
    {
        questionText: "If it rains, we _______ go out.",
        options: {
            A: "won't",
            B: "don't",
            C: "didn't",
            D: "aren't"
        },
        correctAnswer: "A",
        explanation: "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        unit: "Unit 5",
        orderIndex: 481,
        setNumber: 10
    },
    {
        questionText: "My house is _______ than yours.",
        options: {
            A: "big",
            B: "bigger",
            C: "biggest",
            D: "more big"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        unit: "Unit 5",
        orderIndex: 482,
        setNumber: 10
    },
    {
        questionText: "This is the _______ book I've ever read.",
        options: {
            A: "more interesting",
            B: "most interesting",
            C: "interestinger",
            D: "interestingest"
        },
        correctAnswer: "B",
        explanation: "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        unit: "Unit 5",
        orderIndex: 483,
        setNumber: 10
    },
    {
        questionText: "She is _______ than her sister.",
        options: {
            A: "happy",
            B: "happyer",
            C: "happier",
            D: "more happy"
        },
        correctAnswer: "C",
        explanation: "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        unit: "Unit 5",
        orderIndex: 484,
        setNumber: 10
    },
    {
        questionText: "Today is _______ than yesterday.",
        options: {
            A: "good",
            B: "better",
            C: "best",
            D: "more good"
        },
        correctAnswer: "B",
        explanation: "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        unit: "Unit 5",
        orderIndex: 485,
        setNumber: 10
    },

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    {
        questionText: "_______ you ever been to Japan?",
        options: {
            A: "Did",
            B: "Have",
            C: "Do",
            D: "Are"
        },
        correctAnswer: "B",
        explanation: "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 486,
        setNumber: 10
    },
    {
        questionText: "I _______ seen Star Wars.",
        options: {
            A: "have never",
            B: "have ever",
            C: "never have",
            D: "ever have"
        },
        correctAnswer: "A",
        explanation: "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        unit: "Unit 6",
        orderIndex: 487,
        setNumber: 10
    },
    {
        questionText: "This is the best food I _______ eaten.",
        options: {
            A: "ever",
            B: "have ever",
            C: "never",
            D: "have never"
        },
        correctAnswer: "B",
        explanation: "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        unit: "Unit 6",
        orderIndex: 488,
        setNumber: 10
    },
    {
        questionText: "She practises _______ the piano every day.",
        options: {
            A: "play",
            B: "to play",
            C: "playing",
            D: "played"
        },
        correctAnswer: "C",
        explanation: "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        unit: "Unit 6",
        orderIndex: 489,
        setNumber: 10
    },
    {
        questionText: "We need _______ soon.",
        options: {
            A: "leave",
            B: "to leave",
            C: "leaving",
            D: "left"
        },
        correctAnswer: "B",
        explanation: "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        unit: "Unit 6",
        orderIndex: 490,
        setNumber: 10
    },
    {
        questionText: "I started _______ English three years ago.",
        options: {
            A: "learn",
            B: "to learn",
            C: "learning",
            D: "Both B and C"
        },
        correctAnswer: "D",
        explanation: "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        unit: "Unit 6",
        orderIndex: 491,
        setNumber: 10
    },
    {
        questionText: "The person _______ inspires me is my teacher.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "A",
        explanation: "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        unit: "Unit 6",
        orderIndex: 492,
        setNumber: 10
    },
    {
        questionText: "I found a book _______ I love.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "B",
        explanation: "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        unit: "Unit 6",
        orderIndex: 493,
        setNumber: 10
    },
    {
        questionText: "Look, there's the hotel _______ we stayed.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "C",
        explanation: "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        unit: "Unit 6",
        orderIndex: 494,
        setNumber: 10
    },
    {
        questionText: "June is the month _______ I go on holiday.",
        options: {
            A: "who",
            B: "which",
            C: "where",
            D: "when"
        },
        correctAnswer: "D",
        explanation: "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        unit: "Unit 6",
        orderIndex: 495,
        setNumber: 10
    },

    // VOCABULARY (5 questions)
    {
        questionText: "He is very _______ and is always sure that he is right.",
        options: {
            A: "confident",
            B: "creative",
            C: "patient",
            D: "honest"
        },
        correctAnswer: "A",
        explanation: "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        unit: "Vocabulary",
        orderIndex: 496,
        setNumber: 10
    },
    {
        questionText: "In yesterday's _______ lesson, we learned about the heart.",
        options: {
            A: "chemistry",
            B: "biology",
            C: "physics",
            D: "geography"
        },
        correctAnswer: "B",
        explanation: "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 497,
        setNumber: 10
    },
    {
        questionText: "I have an _______ to nuts.",
        options: {
            A: "allergy",
            B: "dish",
            C: "serve",
            D: "prepare"
        },
        correctAnswer: "A",
        explanation: "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        unit: "Vocabulary",
        orderIndex: 498,
        setNumber: 10
    },
    {
        questionText: "The prize is a return flight to New York. (synonym)",
        options: {
            A: "punishment",
            B: "reward",
            C: "challenge",
            D: "purpose"
        },
        correctAnswer: "B",
        explanation: "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 499,
        setNumber: 10
    },
    {
        questionText: "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        options: {
            A: "cold",
            B: "freezing",
            C: "cool",
            D: "chilly"
        },
        correctAnswer: "B",
        explanation: "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        unit: "Vocabulary",
        orderIndex: 500,
        setNumber: 10
    }

];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connected to MongoDB');

        // Clear existing questions
        await Question.deleteMany({});
        console.log('Cleared existing questions');

        // Insert new questions
        await Question.insertMany(questions);
        console.log(`Successfully seeded ${questions.length} questions`);

        // Close connection
        await mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
