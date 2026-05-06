import React from 'react';

const QuestionGrid = ({ totalQuestions, answers, currentQuestion, onQuestionClick }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Tổng quan câu hỏi
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {Array.from({ length: totalQuestions }, (_, index) => {
                    const questionNum = index + 1;
                    const isAnswered = answers.has(index);
                    const isCurrent = index === currentQuestion;

                    return (
                        <button
                            key={index}
                            onClick={() => onQuestionClick(index)}
                            className={`
                aspect-square rounded-lg font-semibold text-sm transition-all
                ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                ${isAnswered
                                    ? 'bg-success text-white hover:bg-green-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
              `}
                        >
                            {questionNum}
                        </button>
                    );
                })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success rounded"></div>
                    <span className="text-gray-600">Đã trả lời</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                    <span className="text-gray-600">Chưa trả lời</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionGrid;
