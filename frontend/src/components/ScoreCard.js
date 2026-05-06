import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';

const ScoreCard = ({ result }) => {
    const { studentName, studentClass, score, correctCount, incorrectCount, timeTaken } = result;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} phút ${secs} giây`;
    };

    const data = [
        { name: 'Đúng', value: correctCount },
        { name: 'Sai', value: incorrectCount },
    ];

    const COLORS = ['#10B981', '#EF4444'];

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Student Info */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{studentName}</h2>
                <p className="text-gray-600">Lớp: {studentClass}</p>
            </div>

            {/* Score */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-4">
                    <Trophy className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2">
                    {score.toFixed(2)}/10
                </h3>
                <p className="text-gray-600">Điểm của bạn</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-success">{correctCount}</p>
                    <p className="text-sm text-gray-600">Câu đúng</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <XCircle className="w-8 h-8 text-error mx-auto mb-2" />
                    <p className="text-2xl font-bold text-error">{incorrectCount}</p>
                    <p className="text-sm text-gray-600">Câu sai</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-bold text-primary">{formatTime(timeTaken)}</p>
                    <p className="text-sm text-gray-600">Thời gian</p>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ScoreCard;
