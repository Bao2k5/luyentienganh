import React from 'react';
import { CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

const QuestionReview = ({ questions }) => {
    // Helper function to get specific explanation for why a wrong answer is incorrect
    const getWrongAnswerExplanation = (question, wrongAnswer) => {
        const unit = question.unit;
        const correctAns = question.correctAnswer;
        const wrongAns = wrongAnswer;

        // Unit-specific wrong answer explanations
        if (unit === "Unit 1") {
            if (wrongAns === "B" && question.questionText.includes("never")) {
                return "Sai vì 'don't never' là double negative (phủ định kép) - không đúng ngữ pháp tiếng Anh.";
            }
            if (wrongAns === "C" && question.questionText.includes("never")) {
                return "Sai vì 'am never' chỉ dùng với động từ 'to be', không dùng với động từ thường 'play'.";
            }
            if (wrongAns === "B" && question.questionText.includes("always")) {
                return "Sai vì trạng từ tần suất phải đứng SAU 'to be', không đứng trước.";
            }
            if (wrongAns === "B" && question.questionText.includes("How often")) {
                return "Sai vì 'are you going' là thì hiện tại tiếp diễn, không dùng cho câu hỏi về tần suất.";
            }
            if (wrongAns === "A" && question.questionText.includes("sun")) {
                return "Sai vì chủ ngữ số ít (the sun) cần động từ thêm 's/es'.";
            }
            if (wrongAns === "A" && question.questionText.includes("at the moment")) {
                return "Sai vì 'at the moment' yêu cầu thì hiện tại tiếp diễn, không phải hiện tại đơn.";
            }
            if (wrongAns === "A" && question.questionText.includes("this week")) {
                return "Sai vì 'this week' chỉ hành động tạm thời, cần dùng thì hiện tại tiếp diễn.";
            }
            if (wrongAns === "A" && question.questionText.includes("stative verb")) {
                return "Sai vì 'am knowing' là sai - động từ trạng thái không dùng ở thì tiếp diễn.";
            }
        }

        if (unit === "Unit 2") {
            if (wrongAns === "A" && question.questionText.includes("Last year")) {
                return "Sai vì 'go' là hiện tại đơn, không phải quá khứ. Cần dùng 'went'.";
            }
            if (wrongAns === "B" && question.questionText.includes("didn't")) {
                return "Sai vì sau 'didn't' không được thêm '-ed' vào động từ.";
            }
            if (wrongAns === "C" && question.questionText.includes("didn't")) {
                return "Sai vì sau 'didn't' động từ phải ở dạng nguyên mẫu, không thêm '-ed'.";
            }
            if (wrongAns === "B" && question.questionText.includes("Did you")) {
                return "Sai vì 'Do' là hiện tại, không phải quá khứ. Cần dùng 'Did'.";
            }
            if (wrongAns === "C" && question.questionText.includes("Did you")) {
                return "Sai vì sau 'Did' động từ phải ở dạng nguyên mẫu, không thêm '-ed'.";
            }
            if (wrongAns === "A" && question.questionText.includes("They") && question.questionText.includes("yesterday")) {
                return "Sai vì 'was' dùng cho số ít (I, he, she, it), không dùng cho 'They'.";
            }
        }

        if (unit === "Unit 3") {
            if (wrongAns === "A" && question.questionText.includes("while")) {
                return "Sai vì 'made' là quá khứ đơn, không thể hiện hành động đang diễn ra bị gián đoạn.";
            }
            if (wrongAns === "B" && question.questionText.includes("for a long time")) {
                return "Sai vì 'waited' là quá khứ đơn, không nhấn mạnh hành động kéo dài.";
            }
            if (wrongAns === "A" && question.questionText.includes("want to eat")) {
                return "Sai vì 'anything' dùng trong câu phủ định hoặc câu hỏi, không dùng trong câu khẳng định.";
            }
            if (wrongAns === "A" && question.questionText.includes("didn't eat")) {
                return "Sai vì 'something' dùng trong câu khẳng định, không dùng trong câu phủ định.";
            }
            if (wrongAns === "B" && question.questionText.includes("was happy")) {
                return "Sai vì 'Anyone' thường dùng trong câu phủ định hoặc câu hỏi.";
            }
            if (wrongAns === "A" && question.questionText.includes("to drink")) {
                return "Sai vì 'something' có nghĩa khẳng định, không phù hợp với ngữ cảnh 'không có gì'.";
            }
        }

        if (unit === "Unit 4") {
            if (wrongAns === "A" && question.questionText.includes("next month")) {
                return "Sai vì 'will' dùng cho quyết định đột ngột, không phải kế hoạch đã định trước.";
            }
            if (wrongAns === "B" && question.questionText.includes("won't going to")) {
                return "Sai vì không có cấu trúc 'won't going to' - đây là sự nhầm lẫn giữa 'will' và 'be going to'.";
            }
            if (wrongAns === "A" && question.questionText.includes("secret")) {
                return "Sai vì 'will' là khẳng định, nhưng câu này cần phủ định 'won't' để hứa không nói.";
            }
            if (wrongAns === "A" && question.questionText.includes("help you")) {
                return "Sai vì 'am going to' dùng cho kế hoạch trước, không phải đề nghị giúp đỡ đột ngột.";
            }
            if (wrongAns === "A" && question.questionText.includes("close the window")) {
                return "Sai vì 'am going to' dùng cho kế hoạch trước, không phải quyết định đột ngột lúc nói.";
            }
            if (wrongAns === "A" && question.questionText.includes("If I")) {
                return "Sai vì KHÔNG bao giờ dùng 'will' trong mệnh đề 'if' của câu điều kiện loại 1.";
            }
        }

        if (unit === "Unit 5") {
            if (wrongAns === "A" && question.questionText.includes("100°C")) {
                return "Sai vì câu điều kiện loại 0 (sự thật hiển nhiên) dùng present simple ở cả 2 mệnh đề, không dùng 'will'.";
            }
            if (wrongAns === "A" && question.questionText.includes("see Dina")) {
                return "Sai vì mệnh đề chính của câu điều kiện loại 1 cần 'will', không phải present simple.";
            }
            if (wrongAns === "B" && question.questionText.includes("rains")) {
                return "Sai vì 'don't' là hiện tại đơn, không phải future. Cần dùng 'won't'.";
            }
            if (wrongAns === "A" && question.questionText.includes("than yours")) {
                return "Sai vì 'big' là dạng gốc, không phải so sánh hơn. Cần thêm '-er'.";
            }
            if (wrongAns === "D" && question.questionText.includes("than yours")) {
                return "Sai vì không có cấu trúc 'more big' - tính từ 1 âm tiết dùng '-er', không dùng 'more'.";
            }
            if (wrongAns === "A" && question.questionText.includes("ever read")) {
                return "Sai vì 'more interesting' là so sánh hơn, không phải so sánh nhất. Cần 'most'.";
            }
            if (wrongAns === "B" && question.questionText.includes("than her sister")) {
                return "Sai vì không có dạng 'happyer' - tính từ kết thúc -y phải đổi thành '-ier'.";
            }
            if (wrongAns === "A" && question.questionText.includes("than yesterday")) {
                return "Sai vì 'good' là dạng gốc, không phải so sánh hơn. Cần dùng 'better'.";
            }
        }

        if (unit === "Unit 6") {
            if (wrongAns === "A" && question.questionText.includes("ever been")) {
                return "Sai vì 'Did' dùng cho quá khứ đơn, không phải Present Perfect. Cần dùng 'Have'.";
            }
            if (wrongAns === "B" && question.questionText.includes("seen Star Wars")) {
                return "Sai vì 'ever' dùng trong câu hỏi, không dùng trong câu phủ định. Cần dùng 'never'.";
            }
            if (wrongAns === "A" && question.questionText.includes("best food")) {
                return "Sai vì thiếu 'have' - cần cấu trúc đầy đủ 'have ever eaten'.";
            }
            if (wrongAns === "B" && question.questionText.includes("practises")) {
                return "Sai vì 'practise' theo sau bởi V-ing, không phải 'to + infinitive'.";
            }
            if (wrongAns === "A" && question.questionText.includes("need")) {
                return "Sai vì 'need' theo sau bởi 'to + infinitive', không phải động từ nguyên mẫu.";
            }
            if (wrongAns === "C" && question.questionText.includes("started")) {
                return "Sai vì 'learning' đúng nhưng 'to learn' cũng đúng - cả 2 đều được chấp nhận.";
            }
            if (wrongAns === "B" && question.questionText.includes("person")) {
                return "Sai vì 'which' dùng cho vật, không dùng cho người. Cần dùng 'who'.";
            }
            if (wrongAns === "A" && question.questionText.includes("book")) {
                return "Sai vì 'who' dùng cho người, không dùng cho vật. Cần dùng 'which'.";
            }
            if (wrongAns === "B" && question.questionText.includes("hotel")) {
                return "Sai vì 'which' dùng cho vật, không dùng cho nơi chốn. Cần dùng 'where'.";
            }
            if (wrongAns === "B" && question.questionText.includes("month")) {
                return "Sai vì 'which' dùng cho vật, không dùng cho thời gian. Cần dùng 'when'.";
            }
        }

        // Default explanation if no specific match
        return `Đáp án ${wrongAns} không đúng theo ngữ pháp hoặc ngữ cảnh của câu.`;
    };

    // Helper function to get common mistakes for each unit
    const getCommonMistake = (question) => {
        const unit = question.unit;

        const commonMistakes = {
            "Unit 1": "⚠️ Lỗi thường gặp: Nhầm lẫn vị trí trạng từ tần suất với 'to be' và động từ thường. Nhớ: SAU 'to be', TRƯỚC động từ thường.",
            "Unit 2": "⚠️ Lỗi thường gặp: Thêm '-ed' vào động từ sau 'did/didn't'. Nhớ: Sau 'did/didn't' động từ luôn ở dạng nguyên mẫu.",
            "Unit 3": "⚠️ Lỗi thường gặp: Dùng 'something' trong câu phủ định hoặc 'anything' trong câu khẳng định. Nhớ: something (khẳng định), anything (phủ định/hỏi).",
            "Unit 4": "⚠️ Lỗi thường gặp: Nhầm lẫn giữa 'will' (quyết định đột ngột, lời hứa) và 'be going to' (kế hoạch trước). Và KHÔNG dùng 'will' trong mệnh đề 'if'.",
            "Unit 5": "⚠️ Lỗi thường gặp: Dùng 'more' với tính từ 1 âm tiết (sai: more big, đúng: bigger). Và nhầm lẫn giữa so sánh hơn (-er) và so sánh nhất (most).",
            "Unit 6": "⚠️ Lỗi thường gặp: Dùng 'ever' trong câu khẳng định (phải dùng 'never'). Và nhầm lẫn đại từ quan hệ: who (người), which (vật), where (nơi), when (thời gian).",
            "Vocabulary": "⚠️ Lưu ý: Chú ý ngữ cảnh và collocation (từ đi với từ) để chọn từ vựng chính xác."
        };

        return commonMistakes[unit] || "⚠️ Lưu ý: Đọc kỹ đề và chú ý ngữ cảnh câu.";
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    Chi Tiết Đáp Án - Chuẩn Đề Thi Thử
                </h2>
                <p className="text-gray-600">
                    Xem lại toàn bộ 50 câu hỏi với giải thích chi tiết cho từng đáp án
                </p>
            </div>

            <div className="space-y-8">
                {questions.map((q, index) => {
                    const isCorrect = q.isCorrect;
                    const studentAnswer = q.studentAnswer;
                    const correctAnswer = q.correctAnswer;

                    return (
                        <div
                            key={index}
                            className={`border-2 rounded-xl p-6 ${isCorrect
                                    ? 'border-green-300 bg-green-50'
                                    : 'border-red-300 bg-red-50'
                                }`}
                        >
                            {/* Question Header */}
                            <div className="flex items-start gap-4 mb-5">
                                {isCorrect ? (
                                    <div className="flex-shrink-0">
                                        <CheckCircle className="w-8 h-8 text-green-600" />
                                    </div>
                                ) : (
                                    <div className="flex-shrink-0">
                                        <XCircle className="w-8 h-8 text-red-600" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                                            Câu {index + 1}
                                        </span>
                                        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            {q.unit}
                                        </span>
                                        {isCorrect ? (
                                            <span className="text-green-700 font-semibold text-sm">
                                                ✓ Đúng
                                            </span>
                                        ) : (
                                            <span className="text-red-700 font-semibold text-sm">
                                                ✗ Sai
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-lg text-gray-800 font-medium leading-relaxed">
                                        {q.questionText}
                                    </p>
                                </div>
                            </div>

                            {/* Options */}
                            <div className="space-y-3 mb-5">
                                {['A', 'B', 'C', 'D'].map((option) => {
                                    const isStudentAnswer = studentAnswer === option;
                                    const isCorrectAnswer = correctAnswer === option;

                                    let bgColor = 'bg-white';
                                    let textColor = 'text-gray-700';
                                    let borderColor = 'border-gray-300';
                                    let label = '';

                                    if (isCorrectAnswer) {
                                        bgColor = 'bg-green-100';
                                        textColor = 'text-green-900';
                                        borderColor = 'border-green-500';
                                        label = '✓ Đáp án đúng';
                                    } else if (isStudentAnswer && !isCorrectAnswer) {
                                        bgColor = 'bg-red-100';
                                        textColor = 'text-red-900';
                                        borderColor = 'border-red-500';
                                        label = '✗ Bạn đã chọn';
                                    }

                                    return (
                                        <div
                                            key={option}
                                            className={`p-4 border-2 rounded-lg ${bgColor} ${borderColor} transition-all`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold ${textColor} text-lg`}>
                                                        {option}.
                                                    </span>
                                                    <span className={`${textColor} text-base`}>
                                                        {q.options[option]}
                                                    </span>
                                                </div>
                                                {label && (
                                                    <span className={`text-sm font-bold ${textColor} ml-2`}>
                                                        {label}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Main Explanation - Why correct answer is correct */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mb-4">
                                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Giải thích đáp án đúng ({correctAnswer}):
                                </h4>
                                <p className="text-blue-900 text-sm leading-relaxed">
                                    {q.explanation}
                                </p>
                            </div>

                            {/* Wrong Answer Explanation - Only show if student got it wrong */}
                            {!isCorrect && studentAnswer && (
                                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
                                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                                        <XCircle className="w-5 h-5" />
                                        Tại sao đáp án {studentAnswer} sai:
                                    </h4>
                                    <p className="text-red-900 text-sm leading-relaxed">
                                        {getWrongAnswerExplanation(q, studentAnswer)}
                                    </p>
                                </div>
                            )}

                            {/* Common Mistake Warning */}
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                                <p className="text-yellow-900 text-sm font-semibold leading-relaxed">
                                    {getCommonMistake(q)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Footer */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                <h3 className="font-bold text-gray-800 mb-3 text-lg">
                    💡 Lời khuyên để cải thiện:
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                    <li>• Xem lại các câu sai và hiểu rõ lý do tại sao sai</li>
                    <li>• Chú ý các lỗi thường gặp được cảnh báo ở mỗi Unit</li>
                    <li>• Làm lại bộ đề này hoặc thử bộ đề khác với cùng ngữ pháp</li>
                    <li>• Ghi nhớ các cấu trúc ngữ pháp quan trọng từ giải thích</li>
                    <li>• Luyện tập thêm các Unit mà bạn còn yếu</li>
                </ul>
            </div>
        </div>
    );
};

export default QuestionReview;
