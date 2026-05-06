require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question');

// Helper function to create question with setNumber
const createQuestion = (questionText, options, correctAnswer, explanation, unit, orderIndex, setNumber) => ({
    questionText,
    options,
    correctAnswer,
    explanation,
    unit,
    orderIndex,
    setNumber
});

const questions = [
    // ============================================
    // SET 1: DAILY LIFE CONTEXT (50 questions)
    // ============================================

    // UNIT 1: Adverbs of Frequency & Present Tenses (7 questions)
    createQuestion(
        "I _______ play tennis on weekends.",
        { A: "never", B: "don't never", C: "am never", D: "never am" },
        "A",
        "Trạng từ tần suất (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V. Đáp án A đúng vì 'never' đứng trước 'play'.",
        "Unit 1", 1, 1
    ),
    createQuestion(
        "She _______ late for work.",
        { A: "is always", B: "always is", C: "be always", D: "always be" },
        "A",
        "Trạng từ tần suất đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb. Đáp án A đúng: 'is always'.",
        "Unit 1", 2, 1
    ),
    createQuestion(
        "How often _______ to the gym?",
        { A: "do you go", B: "are you going", C: "you go", D: "goes you" },
        "A",
        "Câu hỏi về tần suất dùng 'How often' với thì hiện tại đơn. Cấu trúc: How often + do/does + S + V? Đáp án A đúng.",
        "Unit 1", 3, 1
    ),
    createQuestion(
        "The sun _______ in the east.",
        { A: "rise", B: "rises", C: "is rising", D: "rising" },
        "B",
        "Sự thật hiển nhiên, quy luật tự nhiên dùng thì hiện tại đơn. Chủ ngữ 'the sun' là số ít nên động từ thêm 's'. Đáp án B đúng.",
        "Unit 1", 4, 1
    ),
    createQuestion(
        "I _______ a text message at the moment.",
        { A: "send", B: "sends", C: "am sending", D: "sended" },
        "C",
        "Hành động đang xảy ra ngay lúc nói (at the moment) dùng thì hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing. Đáp án C đúng.",
        "Unit 1", 5, 1
    ),
    createQuestion(
        "She normally works in the office, but she _______ at home this week.",
        { A: "works", B: "is working", C: "work", D: "worked" },
        "B",
        "Hành động tạm thời (this week) không phải thói quen lâu dài dùng thì hiện tại tiếp diễn. Đáp án B đúng: 'is working'.",
        "Unit 1", 6, 1
    ),
    createQuestion(
        "I _______ what you mean. (stative verb)",
        { A: "am knowing", B: "knows", C: "know", D: "knowing" },
        "C",
        "Động từ trạng thái (stative verbs) như 'know' KHÔNG dùng ở thì tiếp diễn. Dùng thì hiện tại đơn. Đáp án C đúng.",
        "Unit 1", 7, 1
    ),

    // UNIT 2: Past Simple & Making Questions (7 questions)
    createQuestion(
        "Last year, we _______ to Mexico on holiday.",
        { A: "go", B: "goes", C: "went", D: "going" },
        "C",
        "Hành động đã xảy ra và kết thúc trong quá khứ (last year) dùng thì quá khứ đơn. 'Go' có dạng quá khứ bất quy tắc là 'went'. Đáp án C đúng.",
        "Unit 2", 8, 1
    ),
    createQuestion(
        "I _______ the film. It was very bad.",
        { A: "didn't like", B: "don't liked", C: "didn't liked", D: "not liked" },
        "A",
        "Phủ định thì quá khứ đơn: S + didn't + V (infinitive). Sau 'didn't' động từ giữ nguyên mẫu. Đáp án A đúng.",
        "Unit 2", 9, 1
    ),
    createQuestion(
        "_______ the party last night?",
        { A: "Did you enjoy", B: "Do you enjoyed", C: "Did you enjoyed", D: "Were you enjoy" },
        "A",
        "Câu hỏi thì quá khứ đơn: Did + S + V (infinitive)? Sau 'Did' động từ giữ nguyên mẫu. Đáp án A đúng.",
        "Unit 2", 10, 1
    ),
    createQuestion(
        "Where _______ to school?",
        { A: "did your parents go", B: "your parents went", C: "did your parents went", D: "do your parents went" },
        "A",
        "Câu hỏi với từ để hỏi (Where) + did + S + V (infinitive)? Đáp án A đúng.",
        "Unit 2", 11, 1
    ),
    createQuestion(
        "They _______ happy yesterday.",
        { A: "was", B: "were", C: "are", D: "is" },
        "B",
        "Thì quá khứ đơn với động từ 'to be': They (số nhiều) + were. Đáp án B đúng.",
        "Unit 2", 12, 1
    ),
    createQuestion(
        "She _______ her homework and went to bed.",
        { A: "finish", B: "finishes", C: "finished", D: "finishing" },
        "C",
        "Động từ 'finish' kết thúc bằng phụ âm + -y, nhưng trước 'y' là nguyên âm 'i' nên chỉ thêm '-ed'. Đáp án C đúng: 'finished'.",
        "Unit 2", 13, 1
    ),
    createQuestion(
        "_______ is your email address?",
        { A: "What", B: "Who", C: "Where", D: "When" },
        "A",
        "Hỏi về thông tin cụ thể (email address) dùng 'What'. Đáp án A đúng.",
        "Unit 2", 14, 1
    ),

    // UNIT 3: Past Continuous & Indefinite Pronouns (7 questions)
    createQuestion(
        "He called while I _______ lunch.",
        { A: "made", B: "was making", C: "make", D: "am making" },
        "B",
        "Hành động đang diễn ra trong quá khứ (was making) bị gián đoạn bởi hành động khác (called). Dùng thì quá khứ tiếp diễn. Đáp án B đúng.",
        "Unit 3", 15, 1
    ),
    createQuestion(
        "They _______ for a long time yesterday.",
        { A: "wait", B: "waited", C: "were waiting", D: "are waiting" },
        "C",
        "Hành động kéo dài trong quá khứ (for a long time) dùng thì quá khứ tiếp diễn. Đáp án C đúng: 'were waiting'.",
        "Unit 3", 16, 1
    ),
    createQuestion(
        "I want to eat _______. I'm hungry.",
        { A: "anything", B: "something", C: "nothing", D: "everything" },
        "B",
        "Câu khẳng định dùng 'something' (cái gì đó). Đáp án B đúng.",
        "Unit 3", 17, 1
    ),
    createQuestion(
        "I didn't eat _______ this morning.",
        { A: "something", B: "anything", C: "nothing", D: "everything" },
        "B",
        "Câu phủ định dùng 'anything' (bất kỳ cái gì). Đáp án B đúng.",
        "Unit 3", 18, 1
    ),
    createQuestion(
        "_______ was happy at the party.",
        { A: "Everyone", B: "Anyone", C: "Someone", D: "No one" },
        "A",
        "'Everyone' (mọi người) dùng với động từ số ít 'was'. Đáp án A đúng.",
        "Unit 3", 19, 1
    ),
    createQuestion(
        "There's _______ to drink. (negative meaning)",
        { A: "something", B: "anything", C: "nothing", D: "everything" },
        "C",
        "'Nothing' có nghĩa phủ định (không có gì). Đáp án C đúng: 'There's nothing to drink' = 'There isn't anything to drink'.",
        "Unit 3", 20, 1
    ),
    createQuestion(
        "I don't mind where we eat. _______ is OK.",
        { A: "Somewhere", B: "Anywhere", C: "Nowhere", D: "Everywhere" },
        "B",
        "'Anywhere' trong câu khẳng định có nghĩa 'bất kỳ đâu' (không quan trọng). Đáp án B đúng.",
        "Unit 3", 21, 1
    ),

    // UNIT 4: Future - be going to & will (7 questions)
    createQuestion(
        "I _______ buy a new phone next month.",
        { A: "will", B: "am going to", C: "going to", D: "will to" },
        "B",
        "Kế hoạch đã quyết định trước dùng 'be going to'. Cấu trúc: S + am/is/are + going to + V. Đáp án B đúng.",
        "Unit 4", 22, 1
    ),
    createQuestion(
        "She _______ work tomorrow. (negative)",
        { A: "isn't going to", B: "won't going to", C: "not going to", D: "doesn't going to" },
        "A",
        "Phủ định của 'be going to': S + am/is/are + not + going to + V. Đáp án A đúng.",
        "Unit 4", 23, 1
    ),
    createQuestion(
        "Can I tell you a secret? - Sure, I _______ tell anyone.",
        { A: "will", B: "won't", C: "am not going to", D: "don't" },
        "B",
        "Lời hứa (promise) dùng 'will/won't'. Đáp án B đúng: 'I won't tell anyone' (Tôi sẽ không nói với ai).",
        "Unit 4", 24, 1
    ),
    createQuestion(
        "I've got a lot of work. - I _______ help you.",
        { A: "am going to", B: "will", C: "going to", D: "won't" },
        "B",
        "Đề nghị giúp đỡ (offer) dùng 'will'. Đáp án B đúng: 'I'll help you'.",
        "Unit 4", 25, 1
    ),
    createQuestion(
        "It's cold in here. - Yes, you're right. I _______ close the window.",
        { A: "am going to", B: "will", C: "going to", D: "won't" },
        "B",
        "Quyết định đột ngột lúc nói (spontaneous decision) dùng 'will'. Đáp án B đúng.",
        "Unit 4", 26, 1
    ),
    createQuestion(
        "If I _______ time, I'll email you the photos.",
        { A: "will have", B: "have", C: "am having", D: "had" },
        "B",
        "KHÔNG dùng future form trong mệnh đề 'if'. Dùng thì hiện tại đơn. Đáp án B đúng: 'If I have time'.",
        "Unit 4", 27, 1
    ),
    createQuestion(
        "_______ you help me with this box?",
        { A: "Will", B: "Are", C: "Do", D: "Shall" },
        "A",
        "Yêu cầu giúp đỡ dùng 'Will you...?'. Đáp án A đúng.",
        "Unit 4", 28, 1
    ),

    // UNIT 5: Conditionals & Comparatives (7 questions)
    createQuestion(
        "If you heat water to 100°C, it _______.",
        { A: "will boil", B: "boils", C: "boil", D: "boiled" },
        "B",
        "Câu điều kiện loại 0 (zero conditional) diễn tả sự thật hiển nhiên: If + present simple, present simple. Đáp án B đúng.",
        "Unit 5", 29, 1
    ),
    createQuestion(
        "If I see Dina, I _______ her your message.",
        { A: "give", B: "will give", C: "gave", D: "giving" },
        "B",
        "Câu điều kiện loại 1 (first conditional): If + present simple, will + V. Đáp án B đúng.",
        "Unit 5", 30, 1
    ),
    createQuestion(
        "If it rains, we _______ go out.",
        { A: "won't", B: "don't", C: "didn't", D: "aren't" },
        "A",
        "Câu điều kiện loại 1 phủ định: If + present simple, won't + V. Đáp án A đúng.",
        "Unit 5", 31, 1
    ),
    createQuestion(
        "My house is _______ than yours.",
        { A: "big", B: "bigger", C: "biggest", D: "more big" },
        "B",
        "So sánh hơn với tính từ 1 âm tiết: adj + -er + than. Đáp án B đúng: 'bigger than'.",
        "Unit 5", 32, 1
    ),
    createQuestion(
        "This is the _______ book I've ever read.",
        { A: "more interesting", B: "most interesting", C: "interestinger", D: "interestingest" },
        "B",
        "So sánh nhất với tính từ nhiều âm tiết: the + most + adj. Đáp án B đúng: 'the most interesting'.",
        "Unit 5", 33, 1
    ),
    createQuestion(
        "She is _______ than her sister.",
        { A: "happy", B: "happyer", C: "happier", D: "more happy" },
        "C",
        "So sánh hơn với tính từ 2 âm tiết kết thúc -y: đổi -y thành -ier. Đáp án C đúng: 'happier'.",
        "Unit 5", 34, 1
    ),
    createQuestion(
        "Today is _______ than yesterday.",
        { A: "good", B: "better", C: "best", D: "more good" },
        "B",
        "So sánh hơn bất quy tắc: good → better → best. Đáp án B đúng.",
        "Unit 5", 35, 1
    ),

    // UNIT 6: Present Perfect & Verb Patterns & Relative Clauses (10 questions)
    createQuestion(
        "_______ you ever been to Japan?",
        { A: "Did", B: "Have", C: "Do", D: "Are" },
        "B",
        "Hỏi về kinh nghiệm dùng Present Perfect với 'ever': Have/Has + S + ever + V3? Đáp án B đúng.",
        "Unit 6", 36, 1
    ),
    createQuestion(
        "I _______ seen Star Wars.",
        { A: "have never", B: "have ever", C: "never have", D: "ever have" },
        "A",
        "'Never' (chưa bao giờ) dùng trong câu khẳng định với Present Perfect: S + have/has + never + V3. Đáp án A đúng.",
        "Unit 6", 37, 1
    ),
    createQuestion(
        "This is the best food I _______ eaten.",
        { A: "ever", B: "have ever", C: "never", D: "have never" },
        "B",
        "Ngoại lệ: dùng 'ever' với câu so sánh nhất. Cấu trúc: This is the best... I have ever + V3. Đáp án B đúng.",
        "Unit 6", 38, 1
    ),
    createQuestion(
        "She practises _______ the piano every day.",
        { A: "play", B: "to play", C: "playing", D: "played" },
        "C",
        "Động từ 'practise' theo sau bởi V-ing. Đáp án C đúng: 'practises playing'.",
        "Unit 6", 39, 1
    ),
    createQuestion(
        "We need _______ soon.",
        { A: "leave", B: "to leave", C: "leaving", D: "left" },
        "B",
        "Động từ 'need' theo sau bởi to + infinitive. Đáp án B đúng: 'need to leave'.",
        "Unit 6", 40, 1
    ),
    createQuestion(
        "I started _______ English three years ago.",
        { A: "learn", B: "to learn", C: "learning", D: "Both B and C" },
        "D",
        "Động từ 'start' có thể theo sau bởi cả to + infinitive hoặc V-ing mà không đổi nghĩa. Đáp án D đúng.",
        "Unit 6", 41, 1
    ),
    createQuestion(
        "The person _______ inspires me is my teacher.",
        { A: "who", B: "which", C: "where", D: "when" },
        "A",
        "Đại từ quan hệ 'who' thay thế cho người. Đáp án A đúng: 'The person who inspires me'.",
        "Unit 6", 42, 1
    ),
    createQuestion(
        "I found a book _______ I love.",
        { A: "who", B: "which", C: "where", D: "when" },
        "B",
        "Đại từ quan hệ 'which' thay thế cho vật. Đáp án B đúng: 'a book which I love'.",
        "Unit 6", 43, 1
    ),
    createQuestion(
        "Look, there's the hotel _______ we stayed.",
        { A: "who", B: "which", C: "where", D: "when" },
        "C",
        "Đại từ quan hệ 'where' thay thế cho nơi chốn. Đáp án C đúng: 'the hotel where we stayed'.",
        "Unit 6", 44, 1
    ),
    createQuestion(
        "June is the month _______ I go on holiday.",
        { A: "who", B: "which", C: "where", D: "when" },
        "D",
        "Đại từ quan hệ 'when' thay thế cho thời gian. Đáp án D đúng: 'the month when I go on holiday'.",
        "Unit 6", 45, 1
    ),

    // VOCABULARY (5 questions)
    createQuestion(
        "He is very _______ and is always sure that he is right.",
        { A: "confident", B: "creative", C: "patient", D: "honest" },
        "A",
        "'Confident' (tự tin) là tính từ miêu tả người luôn chắc chắn về bản thân. Đáp án A đúng.",
        "Vocabulary", 46, 1
    ),
    createQuestion(
        "In yesterday's _______ lesson, we learned about the heart.",
        { A: "chemistry", B: "biology", C: "physics", D: "geography" },
        "B",
        "'Biology' (sinh học) là môn học về cơ thể sống, bao gồm tim (heart). Đáp án B đúng.",
        "Vocabulary", 47, 1
    ),
    createQuestion(
        "I have an _______ to nuts.",
        { A: "allergy", B: "dish", C: "serve", D: "prepare" },
        "A",
        "'Allergy' (dị ứng) là danh từ chỉ phản ứng của cơ thể với một chất nào đó. Đáp án A đúng: 'allergy to nuts'.",
        "Vocabulary", 48, 1
    ),
    createQuestion(
        "The prize is a return flight to New York. (synonym)",
        { A: "punishment", B: "reward", C: "challenge", D: "purpose" },
        "B",
        "'Prize' (giải thưởng) đồng nghĩa với 'reward' (phần thưởng). Đáp án B đúng.",
        "Vocabulary", 49, 1
    ),
    createQuestion(
        "It's _______ outside. I need a coat! (extreme adjective for 'very cold')",
        { A: "cold", B: "freezing", C: "cool", D: "chilly" },
        "B",
        "'Freezing' là extreme adjective (tính từ cực cấp) của 'cold', có nghĩa 'lạnh cóng'. Đáp án B đúng.",
        "Vocabulary", 50, 1
    ),
