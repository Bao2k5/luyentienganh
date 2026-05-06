import React from 'react';

const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, questionNumber }) => {
    if (!question) return null;

    const options = ['A', 'B', 'C', 'D'];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Question Number and Text */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Câu {questionNumber}
                </h3>
                <p className="text-xl text-gray-800 leading-relaxed">
                    {question.questionText}
                </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
                {options.map((option) => (
                    <label
                        key={option}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedAnswer === option
                                ? 'border-primary bg-blue-50'
                                : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                            }`}
                    >
                        <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={() => onAnswerSelect(option)}
                            className="mt-1 w-5 h-5 text-primary focus:ring-primary"
                        />
                        <div className="ml-3 flex-1">
                            <span className="font-semibold text-gray-700 mr-2">{option}.</span>
                            <span className="text-gray-800">{question.options[option]}</span>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default QuestionDisplay;
