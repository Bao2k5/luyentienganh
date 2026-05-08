import React from 'react';
import { CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

// Complete wrong-answer explanations for all 50 grammar topics
const WRONG_ANSWER_TIPS = {
    1:  "❌ Sai vì trạng từ tần suất (never/always/usually...) phải đứng TRƯỚC động từ thường. Không đặt sau động từ hoặc dùng phủ định kép.",
    2:  "❌ Sai vì trạng từ tần suất phải đứng SAU động từ 'to be' (is/am/are/was/were). Không đặt trước.",
    3:  "❌ Sai vì 'How often' là cụm hỏi về tần suất — dùng 'often', không phải 'many/much/long'.",
    4:  "❌ Sai vì diễn đạt sự thật hiển nhiên dùng Hiện tại đơn. Chủ ngữ số ít → thêm -s/-es vào động từ.",
    5:  "❌ Sai vì lịch trình cố định (tàu xe, giờ học) dùng Hiện tại đơn, không phải tiếp diễn hay quá khứ.",
    6:  "❌ Sai vì 'at the moment' là dấu hiệu của Hiện tại tiếp diễn. Cấu trúc: am/is/are + V-ing.",
    7:  "❌ Sai vì đây là động từ trạng thái (stative verb: know/want/love/believe...). Loại này KHÔNG BAO GIỜ dùng dạng -ing.",
    8:  "❌ Sai vì 'Yesterday' là dấu hiệu của Quá khứ đơn. Dùng dạng quá khứ (went/saw/ate...), không phải hiện tại hay tiếp diễn.",
    9:  "❌ Sai vì câu phủ định quá khứ đơn dùng 'didn't'. Sau 'didn't', động từ ở dạng NGUYÊN MẪU (không thêm -ed/-s).",
    10: "❌ Sai vì câu hỏi Yes/No quá khứ đơn dùng 'Did'. Sau 'Did', động từ ở dạng NGUYÊN MẪU.",
    11: "❌ Sai vì động từ tận cùng bằng phụ âm + y (study, copy...) phải đổi y → i rồi thêm -ed. VD: study→studied. Không dùng 'studyed' hay 'studying'.",
    12: "❌ Sai vì câu trả lời là thông tin/sự vật (email, tên, nghề...) → hỏi bằng 'What'. Không dùng Where/Who/When.",
    13: "❌ Sai vì câu trả lời chỉ nơi chốn → hỏi bằng 'Where'. Không dùng When/Why/Who.",
    14: "❌ Sai vì đưa ra yêu cầu lịch sự dùng 'Can' hoặc 'Could'. Không dùng 'Are/Do/Have' ở đây.",
    15: "❌ Sai vì diễn tả hành động đang xảy ra tại thời điểm cụ thể trong quá khứ → Quá khứ tiếp diễn: was/were + V-ing. Nhớ chia đúng was/were.",
    16: "❌ Sai vì hành động đang diễn ra (bị gián đoạn) dùng Quá khứ tiếp diễn (was/were + V-ing). Hành động gián đoạn dùng Quá khứ đơn.",
    17: "❌ Sai vì 'when' đứng trước hành động ngắn xen vào (Quá khứ đơn). 'While' đứng trước hành động đang kéo dài (Quá khứ tiếp diễn).",
    18: "❌ Sai vì câu khẳng định dùng 'something/someone/somewhere'. Không dùng 'anything' trong câu khẳng định thông thường.",
    19: "❌ Sai vì câu phủ định và nghi vấn dùng 'anything/anyone/anywhere'. 'Something' chỉ dùng trong câu khẳng định.",
    20: "❌ Sai vì 'nothing/no one/nowhere' đã mang nghĩa phủ định. Động từ phải chia ở dạng khẳng định (not 'isn't nothing').",
    21: "❌ Sai vì 'Everyone/Everything' luôn đi với động từ số ÍT. VD: Everyone IS, not Everyone ARE.",
    22: "❌ Sai vì kế hoạch đã định trước dùng 'be going to'. Cấu trúc: am/is/are + going to + V nguyên mẫu.",
    23: "❌ Sai vì phủ định của 'be going to' là: am not / isn't / aren't + going to. Không dùng 'not going to' một mình.",
    24: "❌ Sai vì lời hứa dùng 'will/won't'. 'Be going to' chỉ diễn tả kế hoạch, không phải cam kết.",
    25: "❌ Sai vì đề nghị giúp đỡ tự phát dùng 'will'. 'Be going to' là kế hoạch đã định, không phải đề nghị ngay lúc đó.",
    26: "❌ Sai vì quyết định đột ngột ngay lúc nói dùng 'will'. 'Be going to' là kế hoạch đã nghĩ từ trước.",
    27: "❌ Sai vì mệnh đề điều kiện 'If' KHÔNG BAO GIỜ dùng 'will'. Phải dùng Hiện tại đơn trong mệnh đề If.",
    28: "❌ Sai vì cấu trúc là 'am/is/are + going to + V'. Thiếu 'going' hoặc thiếu 'to' đều sai.",
    29: "❌ Sai vì câu điều kiện loại 0 (sự thật hiển nhiên): If + HTĐ, HTĐ. Cả hai vế đều là Hiện tại đơn, không dùng 'will'.",
    30: "❌ Sai vì câu điều kiện loại 0 chỉ quy luật máy móc: If + HTĐ, HTĐ. Không dùng 'will' ở vế kết quả.",
    31: "❌ Sai vì câu điều kiện loại 1 phủ định dùng 'won't + V' ở vế chính. Không dùng 'don't/didn't/aren't'.",
    32: "❌ Sai vì mệnh đề 'If' (loại 1) dùng Hiện tại đơn. Không được dùng 'will', 'would', hay quá khứ đơn trong mệnh đề If.",
    33: "❌ Sai vì so sánh hơn của tính từ ngắn (1 âm tiết): chỉ thêm '-er'. Không dùng 'more'. VD: big→bigger, NOT more big.",
    34: "❌ Sai vì so sánh nhất của tính từ dài (≥2 âm tiết): dùng 'the most + tính từ'. Không thêm '-est'. VD: the most expensive.",
    35: "❌ Sai vì 'less' dùng để so sánh ít hơn với tính từ dài. 'Least' là so sánh nhất. 'Little/few' không dùng trong cấu trúc này.",
    36: "❌ Sai vì hỏi về trải nghiệm dùng Hiện tại hoàn thành: Have/Has + ever + V3. Không dùng 'Do/Did/Are'.",
    37: "❌ Sai vì câu khẳng định mang nghĩa 'chưa bao giờ' dùng 'never'. 'Ever' chỉ dùng trong câu hỏi hoặc 'the best I've ever...'.",
    38: "❌ Sai vì cấu trúc 'the best... I have ever...' cần 'ever'. 'Never/always/just' không hợp ngữ nghĩa ở đây.",
    39: "❌ Sai vì sau 'practise/enjoy/finish/mind/avoid/suggest' phải là V-ing. Không dùng 'to V' hay nguyên mẫu.",
    40: "❌ Sai vì sau 'need/want/decide/hope/plan/agree/offer' phải là 'to + V'. Không dùng 'V-ing'.",
    41: "❌ Sai vì cấu trúc 'persuade/ask/tell/want + sb + to V' cần 'to V' sau tân ngữ. Không dùng V-ing hay nguyên mẫu không có 'to'.",
    42: "❌ Sai vì 'start' có thể đi với cả 'to V' và 'V-ing' với nghĩa tương đương. Đáp án đúng là cả hai đều chấp nhận được.",
    43: "❌ Sai vì 'who' thay thế danh từ chỉ NGƯỜI. Không dùng 'which' cho người, không dùng 'where' hay 'when' ở đây.",
    44: "❌ Sai vì 'which' thay thế danh từ chỉ VẬT/ĐỒ VẬT. Không dùng 'who' cho vật.",
    45: "❌ Sai vì 'where' thay thế danh từ chỉ NƠI CHỐN. Không dùng 'which' hay 'when' cho nơi chốn.",
    46: "❌ Sai vì phải đọc ngữ cảnh câu để chọn đúng tính từ miêu tả tính cách. VD: 'keeps promises' → reliable, không phải honest.",
    47: "❌ Sai vì phải ghép đúng nội dung học với tên môn. VD: 'numbers & equations' → Maths, không phải Physics.",
    48: "❌ Sai vì cần đọc định nghĩa: 'doesn't eat meat' = vegetarian; 'no animal products' = vegan. Hai khái niệm khác nhau.",
    49: "❌ Sai vì các từ Motivation có nghĩa khác nhau: challenge (thử thách), reward (phần thưởng), prize (giải thưởng), punish (phạt).",
    50: "❌ Sai vì tính từ cực cấp (spectacular, awful, freezing, tiny...) KHÔNG đi với 'very'. Chúng đã mang nghĩa cực độ rồi.",
};

const DIFF_BADGE = {
    easy:   { label: '🟢 Dễ',        cls: 'bg-green-100 text-green-700' },
    medium: { label: '🟡 Trung bình', cls: 'bg-yellow-100 text-yellow-700' },
    hard:   { label: '🔴 Khó',        cls: 'bg-red-100 text-red-700' },
};

const QuestionReview = ({ questions }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    Chi Tiết Đáp Án
                </h2>
                <p className="text-gray-500 text-sm">
                    Xem lại {questions.length} câu hỏi với giải thích đầy đủ — bản dịch, đáp án đúng/sai, lưu ý lỗi thường gặp
                </p>
            </div>

            <div className="space-y-6">
                {questions.map((q, index) => {
                    const isCorrect = q.isCorrect;
                    const studentAnswer = q.studentAnswer;
                    const correctAnswer = q.correctAnswer;
                    const diff = DIFF_BADGE[q.difficulty] || DIFF_BADGE.medium;
                    const wrongTip = WRONG_ANSWER_TIPS[q.orderIndex];

                    return (
                        <div
                            key={index}
                            className={`border-2 rounded-xl overflow-hidden ${
                                isCorrect ? 'border-green-300' : 'border-red-300'
                            }`}
                        >
                            {/* Question Header Bar */}
                            <div className={`px-5 py-3 flex items-center gap-3 flex-wrap ${
                                isCorrect ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                                {isCorrect
                                    ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                }
                                <span className="bg-primary text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    Câu {index + 1}
                                </span>
                                <span className="bg-white border border-gray-300 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                    {q.unit}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${diff.cls}`}>
                                    {diff.label}
                                </span>
                                <span className={`ml-auto text-sm font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                    {isCorrect ? '✓ Đúng' : '✗ Sai'}
                                </span>
                            </div>

                            <div className="p-5 space-y-4">
                                {/* Question Text + Vietnamese Translation */}
                                <div>
                                    <p className="text-lg text-gray-800 font-semibold leading-relaxed mb-1">
                                        {q.questionText}
                                    </p>
                                    {q.vietnameseTranslation && (
                                        <p className="text-blue-600 text-sm italic">
                                            🇻🇳 {q.vietnameseTranslation}
                                        </p>
                                    )}
                                </div>

                                {/* Options A/B/C/D */}
                                <div className="grid grid-cols-1 gap-2">
                                    {['A', 'B', 'C', 'D'].map((opt) => {
                                        const isCorrectOpt = correctAnswer === opt;
                                        const isWrongChosen = studentAnswer === opt && !isCorrectOpt;
                                        const viTrans = q.optionTranslations?.[opt];

                                        let cls = 'border-gray-200 bg-white text-gray-700';
                                        let badge = null;
                                        if (isCorrectOpt) {
                                            cls = 'border-green-500 bg-green-50 text-green-900';
                                            badge = <span className="ml-auto text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">✓ Đúng</span>;
                                        } else if (isWrongChosen) {
                                            cls = 'border-red-500 bg-red-50 text-red-900';
                                            badge = <span className="ml-auto text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">✗ Bạn chọn</span>;
                                        }

                                        return (
                                            <div key={opt} className={`border-2 rounded-lg px-4 py-2.5 ${cls}`}>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-sm w-5 flex-shrink-0">{opt}.</span>
                                                    <span className="text-sm flex-1">{q.options[opt]}</span>
                                                    {badge}
                                                </div>
                                                {viTrans && (
                                                    <p className="text-xs text-blue-600 italic ml-7 mt-0.5">
                                                        🇻🇳 {viTrans}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Why correct is correct */}
                                <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-r-lg">
                                    <p className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1">
                                        <AlertCircle className="w-3.5 h-3.5" />
                                        Giải thích đáp án {correctAnswer}:
                                    </p>
                                    <p className="text-sm text-blue-900 leading-relaxed">
                                        {q.explanation}
                                    </p>
                                </div>

                                {/* Why student's wrong answer is wrong */}
                                {!isCorrect && studentAnswer && wrongTip && (
                                    <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded-r-lg">
                                        <p className="text-xs font-bold text-red-800 mb-1 flex items-center gap-1">
                                            <XCircle className="w-3.5 h-3.5" />
                                            Tại sao đáp án {studentAnswer} sai:
                                        </p>
                                        <p className="text-sm text-red-900 leading-relaxed">
                                            {wrongTip}
                                        </p>
                                    </div>
                                )}

                                {/* Common Mistake Warning */}
                                {q.commonMistake && (
                                    <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-lg">
                                        <p className="text-sm text-amber-900 font-medium leading-relaxed">
                                            {q.commonMistake}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    💡 Lời khuyên để cải thiện:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1.5">
                    <li>• Xem lại từng câu sai — đọc kỹ phần <strong>"Tại sao sai"</strong> và <strong>"Giải thích đáp án đúng"</strong></li>
                    <li>• Ghi nhớ các <strong>lưu ý lỗi thường gặp</strong> (ô màu vàng) — đây là những bẫy hay gặp nhất</li>
                    <li>• Chú ý bản dịch tiếng Việt của từng đáp án để hiểu rõ nghĩa</li>
                    <li>• Làm lại bộ đề hoặc thử bộ đề khó hơn để củng cố</li>
                </ul>
            </div>
        </div>
    );
};

export default QuestionReview;
