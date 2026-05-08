require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Question = require('../models/Question');

const subjects = [
    {en: "I", vi: "Tôi", p: true, be: "am", pastBe: "was", do: "do", did: "did"},
    {en: "He", vi: "Anh ấy", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "She", vi: "Cô ấy", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "They", vi: "Họ", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "We", vi: "Chúng tôi", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "My brother", vi: "Anh trai tôi", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "The students", vi: "Các học sinh", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "Mary", vi: "Mary", p: false, be: "is", pastBe: "was", do: "does", did: "did"},
    {en: "My parents", vi: "Bố mẹ tôi", p: true, be: "are", pastBe: "were", do: "do", did: "did"},
    {en: "John", vi: "John", p: false, be: "is", pastBe: "was", do: "does", did: "did"}
];

const verbs = [
    {v: "play", vs: "plays", ving: "playing", v2: "played", v3: "played", en: "tennis", vi: "quần vợt"},
    {v: "work", vs: "works", ving: "working", v2: "worked", v3: "worked", en: "late", vi: "muộn"},
    {v: "study", vs: "studies", ving: "studying", v2: "studied", v3: "studied", en: "maths", vi: "môn toán"},
    {v: "watch", vs: "watches", ving: "watching", v2: "watched", v3: "watched", en: "TV", vi: "TV"},
    {v: "cook", vs: "cooks", ving: "cooking", v2: "cooked", v3: "cooked", en: "dinner", vi: "bữa tối"},
    {v: "read", vs: "reads", ving: "reading", v2: "read", v3: "read", en: "a book", vi: "một cuốn sách"},
    {v: "clean", vs: "cleans", ving: "cleaning", v2: "cleaned", v3: "cleaned", en: "the room", vi: "căn phòng"},
    {v: "listen", vs: "listens", ving: "listening", v2: "listened", v3: "listened", en: "to music", vi: "nhạc"},
    {v: "travel", vs: "travels", ving: "travelling", v2: "travelled", v3: "travelled", en: "abroad", vi: "nước ngoài"},
    {v: "visit", vs: "visits", ving: "visiting", v2: "visited", v3: "visited", en: "friends", vi: "bạn bè"}
];

const adverbs = [
    {en: "never", vi: "không bao giờ"}, {en: "always", vi: "luôn luôn"}, {en: "usually", vi: "thường xuyên"},
    {en: "often", vi: "thường"}, {en: "sometimes", vi: "thỉnh thoảng"}, {en: "rarely", vi: "hiếm khi"},
    {en: "occasionally", vi: "đôi khi"}, {en: "never", vi: "không bao giờ"}, {en: "always", vi: "luôn luôn"}, {en: "often", vi: "thường"}
];

const timeExpr = [
    {en: "on weekends", vi: "vào cuối tuần"}, {en: "in the morning", vi: "vào buổi sáng"}, 
    {en: "at night", vi: "vào ban đêm"}, {en: "every day", vi: "mỗi ngày"}, 
    {en: "on Sundays", vi: "vào Chủ nhật"}, {en: "after school", vi: "sau giờ học"},
    {en: "in the evening", vi: "vào buổi tối"}, {en: "at the weekend", vi: "vào cuối tuần"},
    {en: "every week", vi: "mỗi tuần"}, {en: "on Mondays", vi: "vào các ngày thứ Hai"}
];

const pastTime = [
    {en: "yesterday", vi: "hôm qua"}, {en: "last week", vi: "tuần trước"}, {en: "last month", vi: "tháng trước"},
    {en: "last year", vi: "năm ngoái"}, {en: "two days ago", vi: "hai ngày trước"}, {en: "this morning", vi: "sáng nay"},
    {en: "in 2010", vi: "vào năm 2010"}, {en: "last night", vi: "tối qua"}, {en: "a few days ago", vi: "vài ngày trước"}, {en: "last summer", vi: "mùa hè năm ngoái"}
];

const futureTime = [
    {en: "tomorrow", vi: "ngày mai"}, {en: "next week", vi: "tuần tới"}, {en: "next month", vi: "tháng tới"},
    {en: "next year", vi: "năm tới"}, {en: "this weekend", vi: "cuối tuần này"}, {en: "tonight", vi: "tối nay"},
    {en: "in two days", vi: "trong hai ngày tới"}, {en: "soon", vi: "sớm thôi"}, {en: "later", vi: "lát nữa"}, {en: "next summer", vi: "mùa hè tới"}
];

// Helper to shuffle options and correctly assign correctAnswer (A, B, C, D)
function createQuestion(text, tText, correctOption, correctTrans, wrongOptions, wrongTransList, exp, unit, orderIndex, setNumber) {
    const opts = [
        { text: correctOption, trans: correctTrans, isCorrect: true },
        { text: wrongOptions[0], trans: wrongTransList[0], isCorrect: false },
        { text: wrongOptions[1], trans: wrongTransList[1], isCorrect: false },
        { text: wrongOptions[2], trans: wrongTransList[2], isCorrect: false }
    ];
    
    // Optional: shuffle opts here if you want randomized positions. For simplicity, we keep A as correct to match the original unless specified.
    // Actually, keeping A as correct is what the original did, but randomizing is better! Let's shuffle!
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }

    let correctLetter = 'A';
    const finalOptions = {};
    const finalTrans = {};
    const letters = ['A', 'B', 'C', 'D'];
    
    opts.forEach((o, index) => {
        finalOptions[letters[index]] = o.text;
        finalTrans[letters[index]] = o.trans;
        if (o.isCorrect) correctLetter = letters[index];
    });

    let cleanUnit = unit.split(':')[0].trim();
    return {
        questionText: text,
        options: finalOptions,
        correctAnswer: correctLetter,
        explanation: exp,
        vietnameseTranslation: tText,
        optionTranslations: finalTrans,
        unit: cleanUnit,
        orderIndex: orderIndex,
        setNumber: setNumber
    };
}

const allQuestions = [];

for (let setIdx = 1; setIdx <= 10; setIdx++) {
    const i = setIdx - 1; // 0 to 9 index for arrays

    const s = subjects[i];
    const v = verbs[i];
    const adv = adverbs[i];
    const t = timeExpr[i];
    const pt = pastTime[i];
    const ft = futureTime[i];

    // Q1: Adverb before main verb
    allQuestions.push(createQuestion(
        `${s.en} _______ ${v.v} ${v.en} ${t.en}.`,
        `${s.vi} _______ ${v.v} ${v.vi} ${t.vi}.`,
        adv.en, adv.vi,
        [`don't ${adv.en}`, `am ${adv.en}`, `${adv.en} am`], ["sai cấu trúc", "sai cấu trúc", "sai cấu trúc"],
        "Adverbs of frequency (never, always, usually...) đứng TRƯỚC động từ thường. Cấu trúc: S + adverb + V.",
        "Unit 1: Adverbs of Frequency", 1, setIdx
    ));

    // Q2: Adverb after to be
    allQuestions.push(createQuestion(
        `${s.en} _______ late for school.`,
        `${s.vi} _______ muộn học.`,
        `${s.be} ${adv.en}`, `${adv.vi}`,
        [`${adv.en} ${s.be}`, `be ${adv.en}`, `${adv.en} be`], ["sai vị trí", "sai động từ be", "sai cấu trúc"],
        "Adverbs of frequency đứng SAU động từ 'to be'. Cấu trúc: S + be + adverb.",
        "Unit 1: Adverbs of Frequency", 2, setIdx
    ));

    // Q3: How often
    allQuestions.push(createQuestion(
        `How _______ do you ${v.v} ${v.en}?`,
        `Bạn có _______ ${v.vi} không?`,
        "often", "thường xuyên",
        ["many", "much", "long"], ["nhiều (đếm được)", "nhiều (không đếm được)", "bao lâu"],
        "Dùng 'How often...?' để hỏi về tần suất.",
        "Unit 1: Adverbs of Frequency", 3, setIdx
    ));

    // Q4: Present Simple (truth)
    const truths = ["Water _______ at 100°C.", "The sun _______ in the east.", "Ice _______ at 0°C.", "Wood _______ on water.", "Plants _______ light to grow.", "Earth _______ around the sun.", "A magnet _______ iron.", "Birds _______ feathers.", "Fish _______ in water.", "Humans _______ oxygen."];
    const truthV = [{v:"boils", vi:"sôi"}, {v:"rises", vi:"mọc"}, {v:"melts", vi:"tan chảy"}, {v:"floats", vi:"nổi"}, {v:"need", vi:"cần"}, {v:"goes", vi:"quay"}, {v:"attracts", vi:"hút"}, {v:"have", vi:"có"}, {v:"live", vi:"sống"}, {v:"breathe", vi:"hít thở"}];
    const tV = truthV[i];
    allQuestions.push(createQuestion(
        truths[i],
        `Sự thật hiển nhiên: ${truths[i].replace("_______", tV.vi)}`,
        tV.v, tV.vi,
        [tV.v.replace('s',''), `is ${tV.v}`, `${tV.v}ed`], ["nguyên thể", "đang", "quá khứ"],
        "Sự thật hiển nhiên dùng thì Hiện tại đơn.",
        "Unit 1: Present Simple", 4, setIdx
    ));

    // Q5: Present Simple (schedule)
    allQuestions.push(createQuestion(
        `The train _______ at 9 AM ${t.en}.`,
        `Chuyến tàu _______ lúc 9 giờ sáng ${t.vi}.`,
        "leaves", "rời đi",
        ["leave", "is leaving", "left"], ["nguyên thể", "đang rời đi", "đã rời đi"],
        "Lịch trình tàu xe dùng thì Hiện tại đơn. 'The train' là ngôi thứ 3 số ít nên động từ thêm 's'.",
        "Unit 1: Present Simple", 5, setIdx
    ));

    // Q6: Present Continuous
    allQuestions.push(createQuestion(
        `${s.en} _______ a text message at the moment.`,
        `${s.vi} _______ một tin nhắn văn bản vào lúc này.`,
        `${s.be} sending`, `đang gửi`,
        ["send", "sends", "sending"], ["gửi", "gửi (số ít)", "đang gửi (thiếu be)"],
        "Dấu hiệu 'at the moment' dùng thì Hiện tại tiếp diễn. Cấu trúc: S + am/is/are + V-ing.",
        "Unit 1: Present Continuous", 6, setIdx
    ));

    // Q7: Stative verb
    allQuestions.push(createQuestion(
        `${s.en} _______ what you mean.`,
        `${s.vi} _______ ý của bạn.`,
        s.p ? "know" : "knows", "biết",
        [`${s.be} knowing`, "knew", "was knowing"], ["đang biết (sai)", "đã biết", "đã đang biết"],
        "'Know' là động từ trạng thái (stative verb), KHÔNG dùng ở thì tiếp diễn.",
        "Unit 1: Present Continuous", 7, setIdx
    ));

    // Q8: Past Simple
    allQuestions.push(createQuestion(
        `${pt.en}, ${s.en} _______ ${v.en}.`,
        `${pt.vi}, ${s.vi} _______ ${v.vi}.`,
        v.v2, `đã ${v.vi}`,
        [v.v, v.vs, `${s.pastBe} ${v.ving}`], ["hiện tại", "hiện tại số ít", "quá khứ tiếp diễn"],
        `Dấu hiệu '${pt.en}' dùng thì Quá khứ đơn.`,
        "Unit 2: Past Simple", 8, setIdx
    ));

    // Q9: Past Simple Negative
    allQuestions.push(createQuestion(
        `${s.en} _______ like the film. It was very bad.`,
        `${s.vi} _______ bộ phim. Nó rất tệ.`,
        "didn't", "đã không",
        ["don't", "doesn't", "wasn't"], ["không", "không (số ít)", "đã không phải"],
        "Câu phủ định quá khứ đơn với động từ thường dùng trợ động từ 'didn't' + V(nguyên thể).",
        "Unit 2: Past Simple", 9, setIdx
    ));

    // Q10: Past Simple Question
    allQuestions.push(createQuestion(
        `_______ you enjoy the party ${pt.en}?`,
        `Bạn _______ thích bữa tiệc ${pt.vi} không?`,
        "Did", "Quá khứ",
        ["Do", "Were", "Are"], ["Hiện tại", "Quá khứ (to-be)", "Hiện tại (to-be)"],
        "Câu hỏi dạng Yes/No quá khứ đơn dùng trợ động từ 'Did' + S + V(nguyên thể).",
        "Unit 2: Past Simple", 10, setIdx
    ));

    // Q11: Past Simple Spelling
    allQuestions.push(createQuestion(
        `${s.en} _______ for the exam ${pt.en}.`,
        `${s.vi} _______ cho bài kiểm tra ${pt.vi}.`,
        "studied", "đã học",
        ["studies", "studys", "study"], ["học", "sai chính tả", "nguyên thể"],
        "Động từ tận cùng bằng phụ âm + y (study), đổi y thành ied -> studied.",
        "Unit 2: Past Simple", 11, setIdx
    ));

    // Q12: Wh- Question (What)
    const whQ = ["email address", "phone number", "name", "favorite color", "job", "hobby", "address", "favorite food", "goal", "dream"];
    allQuestions.push(createQuestion(
        `_______ is your ${whQ[i]}?`,
        `${whQ[i]} của bạn là _______?`,
        "What", "Cái gì",
        ["Where", "Who", "When"], ["Ở đâu", "Ai", "Khi nào"],
        "Hỏi về thông tin dùng 'What' (Cái gì).",
        "Unit 2: Making Questions", 12, setIdx
    ));

    // Q13: Wh- Question (Where)
    const places = ["London", "Paris", "New York", "Tokyo", "Berlin", "Sydney", "Rome", "Madrid", "Seoul", "Beijing"];
    allQuestions.push(createQuestion(
        `_______ did your parents go? - To ${places[i]}.`,
        `Bố mẹ bạn đã đi _______? - Đến ${places[i]}.`,
        "Where", "Ở đâu",
        ["When", "Why", "Who"], ["Khi nào", "Tại sao", "Ai"],
        `Câu trả lời chỉ nơi chốn 'To ${places[i]}' nên dùng từ để hỏi 'Where' (Ở đâu).`,
        "Unit 2: Making Questions", 13, setIdx
    ));

    // Q14: Can Request
    allQuestions.push(createQuestion(
        `_______ you help me with this?`,
        `Bạn _______ giúp tôi việc này được không?`,
        "Can", "Có thể",
        ["Are", "Do", "Have"], ["Là/đang", "Làm", "Có"],
        "Yêu cầu giúp đỡ dùng 'Can' hoặc 'Could'.",
        "Unit 2: Making Questions", 14, setIdx
    ));

    // Q15: Past Continuous
    allQuestions.push(createQuestion(
        `${s.en} _______ waiting for a long time.`,
        `${s.vi} _______ chờ đợi một thời gian dài.`,
        s.pastBe, `đã (${s.isPlural?'số nhiều':'số ít'})`,
        [s.pastBe==='was'?'were':'was', "are", "did"], ["sai số lượng", "hiện tại", "đã làm"],
        `Chủ ngữ '${s.en}' dùng '${s.pastBe}' trong thì Quá khứ tiếp diễn.`,
        "Unit 3: Past Continuous", 15, setIdx
    ));

    // Q16: Past Continuous Interrupted
    allQuestions.push(createQuestion(
        `He called while ${s.en} _______ lunch.`,
        `Anh ấy đã gọi trong khi ${s.vi} _______ bữa trưa.`,
        `${s.pastBe} making`, "đang làm (quá khứ)",
        ["made", "make", `${s.be} making`], ["đã làm", "làm", "đang làm (hiện tại)"],
        "Hành động đang diễn ra trong quá khứ bị gián đoạn: Dùng thì Quá khứ tiếp diễn sau 'while'.",
        "Unit 3: Past Continuous", 16, setIdx
    ));

    // Q17: when vs while
    allQuestions.push(createQuestion(
        `I was making lunch _______ he called.`,
        `Tôi đang làm bữa trưa _______ anh ấy gọi.`,
        "when", "khi",
        ["while", "during", "so"], ["trong khi", "trong suốt", "vì vậy"],
        "Dùng 'when' trước hành động gián đoạn ở thì Quá khứ đơn.",
        "Unit 3: Past Continuous", 17, setIdx
    ));

    // Q18: Indefinite Affirmative
    allQuestions.push(createQuestion(
        `I want to eat _______. I'm hungry.`,
        `Tôi muốn ăn _______. Tôi đang đói.`,
        "something", "thứ gì đó",
        ["anything", "nothing", "everything"], ["bất cứ thứ gì", "không có gì", "mọi thứ"],
        "Trong câu khẳng định, dùng đại từ bất định 'something'.",
        "Unit 3: Indefinite Pronouns", 18, setIdx
    ));

    // Q19: Indefinite Negative
    allQuestions.push(createQuestion(
        `I didn't eat _______ ${pt.en}.`,
        `Tôi đã không ăn _______ ${pt.vi}.`,
        "anything", "bất cứ thứ gì",
        ["something", "nothing", "everything"], ["thứ gì đó", "không có gì", "mọi thứ"],
        "Trong câu phủ định, dùng đại từ bất định 'anything'.",
        "Unit 3: Indefinite Pronouns", 19, setIdx
    ));

    // Q20: Indefinite Negative meaning
    allQuestions.push(createQuestion(
        `There's _______ to drink.`,
        `Chẳng có _______ để uống cả.`,
        "nothing", "không có gì",
        ["anything", "something", "everything"], ["bất cứ thứ gì", "thứ gì đó", "mọi thứ"],
        "'Nothing' mang nghĩa phủ định (= not anything), nên động từ 'is' chia ở dạng khẳng định.",
        "Unit 3: Indefinite Pronouns", 20, setIdx
    ));

    // Q21: Everyone
    allQuestions.push(createQuestion(
        `_______ was happy at the party.`,
        `_______ đều vui vẻ tại bữa tiệc.`,
        "Everyone", "Mọi người",
        ["Anyone", "All", "Some"], ["Bất cứ ai", "Tất cả (cần số nhiều)", "Một vài"],
        "Đại từ 'Everyone' dùng với động từ số ít 'was' và mang nghĩa khẳng định.",
        "Unit 3: Indefinite Pronouns", 21, setIdx
    ));

    // Q22: going to
    allQuestions.push(createQuestion(
        `${s.en} _______ buy a new phone.`,
        `${s.vi} _______ mua một chiếc điện thoại mới.`,
        `${s.be} going to`, "dự định",
        ["will to", "going to", `${s.be} going`], ["sai cấu trúc", "thiếu to-be", "thiếu to"],
        "Nói về một kế hoạch, dự định (đã quyết định trước) dùng cấu trúc 'be going to'.",
        "Unit 4: Future Plans", 22, setIdx
    ));

    // Q23: going to negative
    allQuestions.push(createQuestion(
        `${s.en} _______ to work ${ft.en}.`,
        `${s.vi} _______ đi làm ${ft.vi}.`,
        `${s.be === 'am' ? 'am not' : s.be + "n't"} going`, "không dự định",
        [`${s.be === 'am' ? 'am not' : s.be + "n't"} going to`, "not going to", "won't going to"], ["thừa to", "thiếu to-be", "sai cấu trúc"],
        "Dùng hiện tại tiếp diễn hoặc 'be going to' diễn tả kế hoạch. Ở đây câu có 'to work' rồi nên chọn 'isn't going'.",
        "Unit 4: Future Plans", 23, setIdx
    ));

    // Q24: won't promise
    allQuestions.push(createQuestion(
        `Can I tell you a secret? - Sure, I _______ tell anyone.`,
        `Tôi có thể kể cho bạn một bí mật không? - Chắc chắn rồi, tôi _______ nói với ai đâu.`,
        "won't", "sẽ không",
        ["don't", "not", "am not going to"], ["không", "không", "không dự định"],
        "Lời hứa (Promise) dùng 'will / won't'.",
        "Unit 4: Will/Won't", 24, setIdx
    ));

    // Q25: will offer
    allQuestions.push(createQuestion(
        `I've got a lot of work. - I _______ help you.`,
        `Tôi có nhiều việc quá. - Tôi _______ giúp bạn.`,
        "will", "sẽ",
        ["am going to", "do", "am"], ["dự định", "làm", "đang"],
        "Đề nghị giúp đỡ (Offer) dùng 'will'.",
        "Unit 4: Will/Won't", 25, setIdx
    ));

    // Q26: will spontaneous
    allQuestions.push(createQuestion(
        `It's cold in here. - Yes, you're right. I _______ close the window.`,
        `Ở đây lạnh quá. - Ừ, bạn nói đúng. Tôi _______ đóng cửa sổ lại.`,
        "will", "sẽ",
        ["am going to", "do", "am closing"], ["dự định", "làm", "đang đóng"],
        "Quyết định đột ngột lúc nói (Spontaneous Decision) dùng 'will'.",
        "Unit 4: Will/Won't", 26, setIdx
    ));

    // Q27: If conditional No future
    allQuestions.push(createQuestion(
        `If I _______ time, I'll email you.`,
        `Nếu tôi _______ thời gian, tôi sẽ email cho bạn.`,
        "have", "có",
        ["will have", "had", "am having"], ["sẽ có", "đã có", "đang có"],
        "KHÔNG dùng thì tương lai ('will') trong mệnh đề 'If'.",
        "Unit 4: Future Plans", 27, setIdx
    ));

    // Q28: Future Plans going to
    allQuestions.push(createQuestion(
        `I'm _______ watch the football tonight.`,
        `Tôi _______ xem bóng đá tối nay.`,
        "going to", "dự định",
        ["going", "go to", "will"], ["đang đi", "đi tới", "sẽ"],
        "Kế hoạch đã định trước: am/is/are + going to + V.",
        "Unit 4: Future Plans", 28, setIdx
    ));

    // Q29: Zero Conditional
    allQuestions.push(createQuestion(
        `If you heat water to 100°C, it _______.`,
        `Nếu bạn đun nước đến 100 độ C, nó _______.`,
        "boils", "sôi (số ít)",
        ["boil", "will boil", "is boiling"], ["sôi", "sẽ sôi", "đang sôi"],
        "Câu điều kiện loại 0 (sự thật hiển nhiên): If + present simple, present simple.",
        "Unit 5: Conditionals", 29, setIdx
    ));

    // Q30: Zero Conditional machine
    allQuestions.push(createQuestion(
        `If the power is low, the red light _______.`,
        `Nếu nguồn điện yếu, đèn đỏ _______.`,
        "flashes", "nhấp nháy",
        ["flashing", "will flash", "flash"], ["đang nhấp nháy", "sẽ nhấp nháy", "nhấp nháy (nguyên thể)"],
        "Câu điều kiện loại 0: quy luật của máy móc.",
        "Unit 5: Conditionals", 30, setIdx
    ));

    // Q31: First conditional won't
    allQuestions.push(createQuestion(
        `If it rains, we _______ go out.`,
        `Nếu trời mưa, chúng ta _______ ra ngoài.`,
        "won't", "sẽ không",
        ["don't", "aren't", "didn't"], ["không", "không phải/đang", "đã không"],
        "Câu điều kiện loại 1: If + present simple, will/won't + V.",
        "Unit 5: Conditionals", 31, setIdx
    ));

    // Q32: First conditional see
    allQuestions.push(createQuestion(
        `If I _______ Dina, I'll give her your message.`,
        `Nếu tôi _______ Dina, tôi sẽ nhắn lại lời của bạn cho cô ấy.`,
        "see", "gặp",
        ["will see", "saw", "am seeing"], ["sẽ gặp", "đã gặp", "đang gặp"],
        "Câu điều kiện loại 1: Mệnh đề If dùng hiện tại đơn.",
        "Unit 5: Conditionals", 32, setIdx
    ));

    // Q33: Comparative short
    allQuestions.push(createQuestion(
        `My house is _______ than yours.`,
        `Nhà của tôi thì _______ hơn nhà của bạn.`,
        "bigger", "to hơn",
        ["big", "biggest", "more big"], ["to", "to nhất", "to hơn (sai cấu trúc)"],
        "So sánh hơn của tính từ ngắn 'big' là 'bigger'.",
        "Unit 5: Comparatives", 33, setIdx
    ));

    // Q34: Superlative long
    allQuestions.push(createQuestion(
        `This is the _______ car in the showroom.`,
        `Đây là chiếc xe _______ nhất trong phòng trưng bày.`,
        "most expensive", "đắt nhất",
        ["expensive", "more expensive", "expensivest"], ["đắt tiền", "đắt hơn", "đắt nhất (sai cấu trúc)"],
        "So sánh nhất của tính từ dài 'expensive' là 'most expensive'.",
        "Unit 5: Comparatives", 34, setIdx
    ));

    // Q35: Comparative less
    allQuestions.push(createQuestion(
        `The place I live in is _______ crowded than the city centre.`,
        `Nơi tôi sống thì _______ đông đúc hơn trung tâm thành phố.`,
        "less", "ít hơn",
        ["least", "little", "few"], ["ít nhất", "ít", "một vài"],
        "So sánh ít hơn dùng 'less' + tính từ dài + than.",
        "Unit 5: Comparatives", 35, setIdx
    ));

    // Q36: Present perfect Have
    allQuestions.push(createQuestion(
        `_______ you ever been to Japan?`,
        `Bạn đã _______ đến Nhật Bản chưa?`,
        "Have", "Hiện tại hoàn thành",
        ["Do", "Did", "Are"], ["Hiện tại", "Quá khứ", "Hiện tại (to-be)"],
        "Hỏi về trải nghiệm dùng thì Hiện tại hoàn thành: Have/Has + S + V3/ed.",
        "Unit 6: Present Perfect", 36, setIdx
    ));

    // Q37: Present perfect never
    allQuestions.push(createQuestion(
        `I've _______ seen Star Wars.`,
        `Tôi _______ xem phim Star Wars.`,
        "never", "chưa bao giờ",
        ["ever", "always", "sometimes"], ["đã từng", "luôn luôn", "thỉnh thoảng"],
        "Trong câu khẳng định mang nghĩa chưa từng làm gì, dùng 'never'.",
        "Unit 6: Present Perfect", 37, setIdx
    ));

    // Q38: Present perfect ever
    allQuestions.push(createQuestion(
        `This is the best food I have _______ eaten.`,
        `Đây là món ăn ngon nhất mà tôi _______ ăn.`,
        "ever", "từng",
        ["never", "always", "just"], ["chưa bao giờ", "luôn luôn", "vừa mới"],
        "'Ever' thường dùng với cấu trúc so sánh nhất (the best).",
        "Unit 6: Present Perfect", 38, setIdx
    ));

    // Q39: Verb + ing
    allQuestions.push(createQuestion(
        `She practises _______ the piano every day.`,
        `Cô ấy luyện tập _______ piano mỗi ngày.`,
        "playing", "việc chơi (V-ing)",
        ["play", "to play", "played"], ["chơi", "để chơi", "đã chơi"],
        "Sau động từ 'practise' dùng V-ing.",
        "Unit 6: Verb Patterns", 39, setIdx
    ));

    // Q40: Verb + to
    allQuestions.push(createQuestion(
        `We need _______ early.`,
        `Chúng ta cần _______ sớm.`,
        "to leave", "rời đi (có to)",
        ["leave", "leaving", "left"], ["rời đi", "rời đi (V-ing)", "đã rời đi"],
        "Sau động từ 'need' dùng to-infinitive.",
        "Unit 6: Verb Patterns", 40, setIdx
    ));

    // Q41: Persuade sb to
    allQuestions.push(createQuestion(
        `He persuaded me _______ with him.`,
        `Anh ấy đã thuyết phục tôi _______ cùng anh ấy.`,
        "to go", "đi (có to)",
        ["go", "going", "went"], ["đi", "đi (V-ing)", "đã đi"],
        "Cấu trúc: persuade + object + to + V.",
        "Unit 6: Verb Patterns", 41, setIdx
    ));

    // Q42: Start to/ing
    allQuestions.push(createQuestion(
        `I started _______ English three years ago.`,
        `Tôi đã bắt đầu _______ tiếng Anh ba năm trước.`,
        "Both B & C", "Cả B và C đều đúng",
        ["learn", "to learn", "learning"], ["học", "học (có to)", "học (V-ing)"],
        "Động từ 'start' có thể đi kèm với cả to V hoặc V-ing mà nghĩa không thay đổi.",
        "Unit 6: Verb Patterns", 42, setIdx
    ));

    // Q43: Relative who
    allQuestions.push(createQuestion(
        `The person _______ inspires me is my mother.`,
        `Người _______ truyền cảm hứng cho tôi là mẹ tôi.`,
        "who", "người",
        ["which", "where", "when"], ["vật", "nơi chốn", "thời gian"],
        "Đại từ quan hệ 'who' thay thế cho danh từ chỉ người.",
        "Unit 6: Relative Clauses", 43, setIdx
    ));

    // Q44: Relative which
    allQuestions.push(createQuestion(
        `I found a book _______ I love.`,
        `Tôi đã tìm thấy một cuốn sách _______ tôi yêu thích.`,
        "which", "vật",
        ["who", "where", "when"], ["người", "nơi chốn", "thời gian"],
        "Đại từ quan hệ 'which' (hoặc that) thay thế cho danh từ chỉ vật.",
        "Unit 6: Relative Clauses", 44, setIdx
    ));

    // Q45: Relative where
    allQuestions.push(createQuestion(
        `Look, there's the hotel _______ we stayed.`,
        `Nhìn kìa, đó là khách sạn _______ chúng ta đã ở.`,
        "where", "nơi chốn",
        ["which", "who", "when"], ["vật", "người", "thời gian"],
        "Đại từ quan hệ 'where' thay thế cho nơi chốn.",
        "Unit 6: Relative Clauses", 45, setIdx
    ));

    // Q46: Personality
    const pers = [{e:"serious",v:"nghiêm túc",q:"doesn't often laugh"}, {e:"confident",v:"tự tin",q:"is always sure"}, {e:"friendly",v:"thân thiện",q:"is kind and helpful"}, {e:"honest",v:"trung thực",q:"always tells the truth"}, {e:"patient",v:"kiên nhẫn",q:"is calm with children"}, {e:"reliable",v:"đáng tin cậy",q:"keeps promises"}, {e:"creative",v:"sáng tạo",q:"makes new things"}, {e:"professional",v:"chuyên nghiệp",q:"works hard"}, {e:"serious",v:"nghiêm túc",q:"is very focused"}, {e:"confident",v:"tự tin",q:"speaks well"}];
    allQuestions.push(createQuestion(
        `He is a strong and _______ person and ${pers[i].q}.`,
        `Anh ấy là một người mạnh mẽ, _______ và ${pers[i].q}.`,
        pers[i].e, pers[i].v,
        ["friendly", "creative", "patient"], ["thân thiện", "sáng tạo", "kiên nhẫn"],
        `Từ vựng Unit 1: '${pers[i].e}' phù hợp với ngữ cảnh câu.`,
        "Vocabulary: Personality", 46, setIdx
    ));

    // Q47: Subjects
    const subj = [{e:"drama",v:"kịch"}, {e:"art",v:"mỹ thuật"}, {e:"biology",v:"sinh học"}, {e:"maths",v:"toán"}, {e:"physics",v:"vật lý"}, {e:"history",v:"lịch sử"}, {e:"geography",v:"địa lý"}, {e:"chemistry",v:"hóa học"}, {e:"IT",v:"tin học"}, {e:"PE",v:"thể dục"}];
    allQuestions.push(createQuestion(
        `We're studying a lot in our _______ class.`,
        `Chúng tôi đang học rất nhiều trong lớp _______ của chúng tôi.`,
        subj[i].e, subj[i].v,
        ["music", "english", "french"], ["âm nhạc", "tiếng anh", "tiếng pháp"],
        `Từ vựng Unit 2: '${subj[i].e}' là một môn học.`,
        "Vocabulary: School Subjects", 47, setIdx
    ));

    // Q48: Food
    allQuestions.push(createQuestion(
        `She's a _______, so she doesn't eat meat or fish.`,
        `Cô ấy là _______, nên cô ấy không ăn thịt hay cá.`,
        "vegetarian", "người ăn chay",
        ["vegan", "allergy", "raw"], ["người ăn chay thuần", "dị ứng", "sống"],
        "Từ vựng Unit 3: 'vegetarian' là người ăn chay.",
        "Vocabulary: Food", 48, setIdx
    ));

    // Q49: Motivation
    allQuestions.push(createQuestion(
        `I like the _______ of learning a new language.`,
        `Tôi thích _______ của việc học một ngôn ngữ mới.`,
        "challenge", "thử thách",
        ["prize", "reward", "praise"], ["giải thưởng", "phần thưởng", "lời khen"],
        "Từ vựng Unit 4: 'challenge' nghĩa là thử thách.",
        "Vocabulary: Motivation", 49, setIdx
    ));

    // Q50: Extreme Adj
    allQuestions.push(createQuestion(
        `The views from the mountain are _______.`,
        `Cảnh nhìn từ ngọn núi thì _______.`,
        "spectacular", "ngoạn mục",
        ["awful", "tiny", "filthy"], ["tệ hại", "nhỏ bé", "bẩn thỉu"],
        "Từ vựng Unit 5: 'spectacular' là ngoạn mục, tuyệt đẹp.",
        "Vocabulary: Extreme Adjectives", 50, setIdx
    ));
}

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Question.deleteMany({});
        console.log('Cleared existing questions');

        await Question.insertMany(allQuestions);
        console.log(`Successfully seeded ${allQuestions.length} unique diverse questions`);

        await mongoose.connection.close();
        console.log('Database connection closed');
        
        fs.writeFileSync('./seed-all-500.js', `// Generated file\nconst questions = ${JSON.stringify(allQuestions, null, 2)};\nmodule.exports = questions;`);
        console.log('Also wrote to seed-all-500.js for backup');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
