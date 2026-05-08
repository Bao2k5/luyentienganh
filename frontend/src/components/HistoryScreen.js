import React, { useState, useEffect } from 'react';
import { History, TrendingUp, Clock, Award, Eye, ArrowLeft } from 'lucide-react';
import { getHistory, getStats } from '../services/api';

const HistoryScreen = ({ studentName, onBack, onViewResult }) => {
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [historyData, statsData] = await Promise.all([
                    getHistory(studentName),
                    getStats(studentName)
                ]);
                setHistory(historyData.history);
                setStats(statsData);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [studentName]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getScoreColor = (score) => {
        if (score >= 8) return 'text-green-600';
        if (score >= 6.5) return 'text-blue-600';
        if (score >= 5) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 8) return 'bg-green-100';
        if (score >= 6.5) return 'bg-blue-100';
        if (score >= 5) return 'bg-yellow-100';
        return 'bg-red-100';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải lịch sử...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
                    <h2 className="text-xl font-bold text-red-600 mb-4">Lỗi</h2>
                    <p className="text-gray-700 mb-4">{error}</p>
                    <button
                        onClick={onBack}
                        className="w-full px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-700 hover:text-primary mb-4 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Quay lại
                    </button>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                        <History className="w-10 h-10 text-primary" />
                        Lịch Sử Làm Bài
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Học sinh: <span className="font-semibold">{studentName}</span>
                    </p>
                </div>

                {/* Statistics Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <History className="w-6 h-6 text-blue-600" />
                                <h3 className="font-semibold text-gray-700">Tổng số lần thi</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{stats.totalAttempts}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                                <h3 className="font-semibold text-gray-700">Điểm trung bình</h3>
                            </div>
                            <p className="text-3xl font-bold text-green-600">{stats.averageScore}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Award className="w-6 h-6 text-yellow-600" />
                                <h3 className="font-semibold text-gray-700">Điểm cao nhất</h3>
                            </div>
                            <p className="text-3xl font-bold text-yellow-600">{stats.highestScore}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="w-6 h-6 text-purple-600" />
                                <h3 className="font-semibold text-gray-700">Điểm thấp nhất</h3>
                            </div>
                            <p className="text-3xl font-bold text-purple-600">{stats.lowestScore}</p>
                        </div>
                    </div>
                )}

                {/* History List */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Danh Sách Bài Thi ({history.length})
                    </h2>

                    {history.length === 0 ? (
                        <div className="text-center py-12">
                            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 text-lg">Chưa có lịch sử làm bài</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item, index) => (
                                <div
                                    key={item.resultId}
                                    className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary transition"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                                                    #{history.length - index}
                                                </span>
                                                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Đề {item.setNumber}
                                                </span>
                                                <span className={`${getScoreBgColor(item.score)} ${getScoreColor(item.score)} px-3 py-1 rounded-full text-sm font-bold`}>
                                                    {item.score} điểm
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-600 space-y-1">
                                                <p>
                                                    <span className="font-semibold">Lớp:</span> {item.studentClass}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Đúng:</span> {item.correctCount}/50 câu
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Thời gian:</span> {formatTime(item.timeTaken)}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Ngày thi:</span> {formatDate(item.submittedAt)}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => onViewResult(item.resultId)}
                                            className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition"
                                        >
                                            <Eye className="w-5 h-5" />
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Best Scores Per Set */}
                {stats && stats.bestScorePerSet && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Điểm Cao Nhất Theo Từng Đề
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {Object.entries(stats.bestScorePerSet).map(([setNum, score]) => (
                                <div
                                    key={setNum}
                                    className={`p-4 rounded-lg border-2 ${score !== null ? 'border-primary bg-blue-50' : 'border-gray-200 bg-gray-50'
                                        }`}
                                >
                                    <p className="text-sm text-gray-600 mb-1">Đề {setNum}</p>
                                    <p className={`text-2xl font-bold ${score !== null ? 'text-primary' : 'text-gray-400'
                                        }`}>
                                        {score !== null ? score : '--'}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {stats.setAttempts[setNum]} lần thi
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryScreen;
