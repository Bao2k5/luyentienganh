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
                            {q.commonMistake && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                                    <p className="text-yellow-900 text-sm font-semibold leading-relaxed">
                                        {q.commonMistake}
                                    </p>
                                </div>
                            )}
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
