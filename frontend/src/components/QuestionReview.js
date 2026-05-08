import React from 'react';
import { CheckCircle, XCircle, AlertCircle, BookOpen } from 'lucide-react';

const QuestionReview = ({ questions }) => {
    // Helper function to get specific explanation for why a wrong answer is incorrect
    const getWrongAnswerExplanation = (question, wrongAnswer) => {
        const relativeIndex = question.orderIndex ? ((question.orderIndex - 1) % 50 + 1) : 0;
        const wrongAns = wrongAnswer;

        // Since the distractors (A, B, C, D) are structurally similar across sets for the same relativeIndex,
        // we can provide targeted advice.
        if (relativeIndex === 1) {
            if (wrongAns === "B" || wrongAns === "D") return "Sai vì trạng từ tần suất phải đứng ngay TRƯỚC động từ thường. Và không dùng phủ định kép.";
            if (wrongAns === "C") return "Sai vì có động từ thường thì không dùng kèm 'to be' (am/is/are).";
        } else if (relativeIndex === 2) {
            return "Sai vì trạng từ tần suất luôn luôn phải đứng SAU động từ 'to be'.";
        } else if (relativeIndex === 5) {
            return "Sai vì dấu hiệu 'at the moment' (ngay lúc này) bắt buộc dùng thì Hiện tại tiếp diễn.";
        } else if (relativeIndex === 7) {
            return "Sai vì động từ trạng thái (như know, want, understand) KHÔNG dùng ở dạng -ing.";
        } else if (relativeIndex === 9 || relativeIndex === 10) {
            return "Sai vì sau 'did' hoặc 'didn't', động từ luôn phải ở dạng NGUYÊN MẪU (không thêm -ed/s/es).";
        } else if (relativeIndex === 19) {
            return "Sai vì 'Everyone', 'Everybody' luôn đi với động từ số ít.";
        } else if (relativeIndex === 27) {
            return "Sai vì mệnh đề 'If' (câu điều kiện) KHÔNG BAO GIỜ dùng thì tương lai (will/won't).";
        } else if (relativeIndex >= 32 && relativeIndex <= 34) {
            return "Sai cấu trúc so sánh. Tính từ ngắn (1 âm tiết, hoặc 2 âm tiết tận cùng -y) thêm '-er'. Không dùng 'more'.";
        } else if (relativeIndex === 39) {
            return "Sai vì sau động từ 'practise' (luyện tập) bắt buộc phải là V-ing.";
        } else if (relativeIndex === 40) {
            return "Sai vì sau động từ 'need' (cần) bắt buộc phải là 'to V'.";
        }

        // Default fallback if no specific rule
        return `Đáp án ${wrongAns} không đúng theo ngữ pháp hoặc ngữ cảnh của câu. Xem giải thích chi tiết ở trên để hiểu rõ hơn.`;
    };

    // Helper function to get common mistakes for each specific grammatical point
    const getCommonMistake = (question) => {
        const relativeIndex = question.orderIndex ? ((question.orderIndex - 1) % 50 + 1) : 0;

        const specificMistakes = {
            1: "⚠️ Lỗi thường gặp: Đặt trạng từ tần suất sai vị trí. Nhớ: TRƯỚC động từ thường.",
            2: "⚠️ Lỗi thường gặp: Đặt trạng từ tần suất sai vị trí. Nhớ: SAU động từ 'to be'.",
            3: "⚠️ Lỗi thường gặp: Dùng sai thì khi hỏi về tần suất. 'How often' phải dùng Hiện tại đơn.",
            4: "⚠️ Lỗi thường gặp: Quên thêm 's/es' cho động từ khi chủ ngữ là số ít (ngôi thứ 3) ở Hiện tại đơn.",
            5: "⚠️ Lỗi thường gặp: Không nhận ra dấu hiệu 'at the moment' để dùng Hiện tại tiếp diễn.",
            6: "⚠️ Lỗi thường gặp: Dùng Hiện tại đơn cho hành động tạm thời. 'this week/these days' cần Hiện tại tiếp diễn.",
            7: "⚠️ Lỗi thường gặp: Thêm '-ing' vào động từ trạng thái (know, want...). Các từ này KHÔNG dùng ở thì tiếp diễn.",
            8: "⚠️ Lỗi thường gặp: Không thuộc động từ bất quy tắc (go -> went).",
            9: "⚠️ Lỗi thường gặp: Thêm '-ed' vào động từ sau 'didn't'. Sau 'didn't' động từ phải ở dạng nguyên mẫu.",
            10: "⚠️ Lỗi thường gặp: Thêm '-ed' vào động từ trong câu hỏi. Sau 'Did' động từ phải ở dạng nguyên mẫu.",
            11: "⚠️ Lỗi thường gặp: Thiếu trợ động từ 'did' trong câu hỏi Wh- ở quá khứ.",
            12: "⚠️ Lỗi thường gặp: Dùng sai 'was/were'. Nhớ: I/He/She/It + was; You/We/They + were.",
            13: "⚠️ Lỗi thường gặp: Chia sai đuôi '-ed' với từ kết thúc bằng 'y'. Chú ý trước 'y' là nguyên âm hay phụ âm.",
            14: "⚠️ Lỗi thường gặp: Dùng sai từ để hỏi (What, Where, Who...). Phải đọc kỹ thông tin cần hỏi.",
            15: "⚠️ Lỗi thường gặp: Không phân biệt được hành động ĐANG diễn ra (Qúa khứ tiếp diễn) và XEN VÀO (Quá khứ đơn).",
            16: "⚠️ Lỗi thường gặp: Dùng Quá khứ đơn thay vì Tiếp diễn khi muốn nhấn mạnh một hành động kéo dài.",
            17: "⚠️ Lỗi thường gặp: Dùng 'anything' trong câu khẳng định. Khẳng định phải dùng 'something'.",
            18: "⚠️ Lỗi thường gặp: Dùng 'something' trong câu phủ định/nghi vấn. Phủ định/nghi vấn phải dùng 'anything'.",
            19: "⚠️ Lỗi thường gặp: Chia động từ số nhiều cho 'Everyone/Everybody'. Các đại từ này luôn đi với động từ SỐ ÍT.",
            20: "⚠️ Lỗi thường gặp: Phủ định kép. 'Nothing/nobody' bản thân nó đã mang nghĩa phủ định, không dùng thêm not.",
            21: "⚠️ Lỗi thường gặp: Không hiểu nghĩa khẳng định của 'anywhere' ('bất cứ đâu').",
            22: "⚠️ Lỗi thường gặp: Nhầm lẫn 'will' và 'be going to'. Kế hoạch đã định trước phải dùng 'be going to'.",
            23: "⚠️ Lỗi thường gặp: Viết sai cấu trúc phủ định của 'be going to'.",
            24: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Lời hứa. Lời hứa phải dùng 'will/won't'.",
            25: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Lời đề nghị giúp đỡ. Đề nghị giúp đỡ phải dùng 'will'.",
            26: "⚠️ Lỗi thường gặp: Dùng 'be going to' cho Quyết định đột ngột lúc nói. Phải dùng 'will'.",
            27: "⚠️ Lỗi thường gặp: Dùng thì Tương lai ('will') trong mệnh đề 'If'. Mệnh đề 'If' phải dùng Hiện tại đơn.",
            28: "⚠️ Lỗi thường gặp: Dùng sai trợ động từ khi đưa ra yêu cầu giúp đỡ. Dùng 'Will you...?'",
            29: "⚠️ Lỗi thường gặp: Dùng 'will' trong câu điều kiện loại 0 (sự thật hiển nhiên). Cả 2 vế đều là Hiện tại đơn.",
            30: "⚠️ Lỗi thường gặp: Chia sai vế chính của câu điều kiện loại 1. Vế chính phải có 'will + V'.",
            31: "⚠️ Lỗi thường gặp: Phủ định sai cấu trúc trong câu điều kiện loại 1.",
            32: "⚠️ Lỗi thường gặp: Dùng 'more' với tính từ ngắn. Tính từ 1 âm tiết chỉ thêm '-er'.",
            33: "⚠️ Lỗi thường gặp: Nhầm lẫn so sánh hơn và so sánh nhất. Có 'the' thì phải là so sánh nhất.",
            34: "⚠️ Lỗi thường gặp: Không đổi 'y' thành 'i' trước khi thêm '-er' với tính từ 2 âm tiết kết thúc bằng 'y'.",
            35: "⚠️ Lỗi thường gặp: Không nhớ dạng so sánh bất quy tắc (good -> better -> best).",
            36: "⚠️ Lỗi thường gặp: Dùng quá khứ đơn thay vì Hiện tại hoàn thành khi hỏi về trải nghiệm (ever).",
            37: "⚠️ Lỗi thường gặp: Dùng 'ever' trong câu kể phủ định. Dùng 'never' thay thế.",
            38: "⚠️ Lỗi thường gặp: Thiếu 'have/has' trong cấu trúc 'the best... I have ever...'.",
            39: "⚠️ Lỗi thường gặp: Dùng 'to V' sau 'practise'. 'Practise' bắt buộc đi với 'V-ing'.",
            40: "⚠️ Lỗi thường gặp: Dùng 'V-ing' sau 'need'. 'Need' phải đi với 'to V'.",
            41: "⚠️ Lỗi thường gặp: Nhầm lẫn các động từ có thể đi với cả 'V-ing' và 'to V' mà không đổi nghĩa.",
            42: "⚠️ Lỗi thường gặp: Dùng 'which' thay thế cho Người. Phải dùng 'who'.",
            43: "⚠️ Lỗi thường gặp: Dùng 'who' thay thế cho Vật. Phải dùng 'which'.",
            44: "⚠️ Lỗi thường gặp: Dùng 'which' cho Nơi chốn. Phải dùng 'where'.",
            45: "⚠️ Lỗi thường gặp: Dùng 'which' cho Thời gian. Phải dùng 'when'.",
            46: "⚠️ Lỗi thường gặp: Nhầm lẫn ngữ cảnh của các tính từ miêu tả tính cách.",
            47: "⚠️ Lỗi thường gặp: Nhầm lẫn từ vựng các môn học.",
            48: "⚠️ Lỗi thường gặp: Dùng sai giới từ đi kèm với từ vựng (collocation).",
            49: "⚠️ Lỗi thường gặp: Không tìm được từ đồng nghĩa phù hợp.",
            50: "⚠️ Lỗi thường gặp: Dùng 'very' với tính từ cực cấp. Tính từ cực cấp (freezing, awful...) không đi với very."
        };

        return specificMistakes[relativeIndex] || "⚠️ Lưu ý: Đọc kỹ đề và chú ý ngữ cảnh câu.";
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
                                    {q.vietnameseTranslation && (
                                        <p className="text-blue-700 mt-2 text-md italic font-medium">
                                            Vi: {q.vietnameseTranslation}
                                        </p>
                                    )}
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
                                            {q.optionTranslations && q.optionTranslations[option] && (
                                                <div className="mt-1 ml-6 text-blue-700 italic text-sm font-medium">
                                                    Vi: {q.optionTranslations[option]}
                                                </div>
                                            )}
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
