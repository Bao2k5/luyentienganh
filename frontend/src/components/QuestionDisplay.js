import React from 'react';

const DIFF_BADGE = {
    easy:   { label: '🟢 Dễ',        cls: 'bg-green-100 text-green-700 border border-green-300' },
    medium: { label: '🟡 Trung bình', cls: 'bg-yellow-100 text-yellow-700 border border-yellow-300' },
    hard:   { label: '🔴 Khó',        cls: 'bg-red-100 text-red-700 border border-red-300' },
};

const QuestionDisplay = ({ question, selectedAnswer, onAnswerSelect, questionNumber }) => {
    if (!question) return null;

    const options = ['A', 'B', 'C', 'D'];
    const diff = DIFF_BADGE[question.difficulty] || DIFF_BADGE.medium;

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Question Number, Unit tag, Difficulty badge */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-700">
                        Câu {questionNumber}
                    </h3>
                    {question.unit && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-medium">
                            {question.unit}
                        </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.cls}`}>
                        {diff.label}
                    </span>
                </div>
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

