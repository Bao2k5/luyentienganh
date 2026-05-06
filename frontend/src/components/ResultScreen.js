import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import ScoreCard from './ScoreCard';
import QuestionReview from './QuestionReview';
import ExportButton from './ExportButton';
import { getResult } from '../services/api';

const ResultScreen = ({ resultId, onRetake }) => {
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const data = await getResult(resultId);
                setResult(data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchResult();
    }, [resultId]);

    const handleRetake = () => {
        if (window.confirm('Bạn có chắc chắn muốn làm lại bài thi?')) {
            onRetake();
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải kết quả...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={handleRetake}
                        className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition"
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Kết quả bài thi
                    </h1>
                    <p className="text-gray-600">
                        Chúc mừng bạn đã hoàn thành bài thi!
                    </p>
                </div>

                {/* Score Card */}
                <div className="mb-8">
                    <ScoreCard result={result} />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button
                        onClick={handleRetake}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                    >
                        <RotateCcw className="w-5 h-5" />
                        LÀM LẠI
                    </button>
                    <ExportButton result={result} />
                </div>

                {/* Question Review */}
                <QuestionReview questions={result.questions} />
            </div>
        </div>
    );
};

export default ResultScreen;
