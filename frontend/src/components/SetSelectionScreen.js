import React from 'react';
import { BookOpen, Trophy, Target } from 'lucide-react';

const SetSelectionScreen = ({ onSelectSet, studentInfo }) => {
    const sets = [
        { number: 1, title: 'Bộ đề 1', description: 'Ngữ cảnh: Cuộc sống hàng ngày', difficulty: 'Dễ', color: 'bg-blue-500' },
        { number: 2, title: 'Bộ đề 2', description: 'Ngữ cảnh: Trường học & Học tập', difficulty: 'Dễ', color: 'bg-green-500' },
        { number: 3, title: 'Bộ đề 3', description: 'Ngữ cảnh: Gia đình & Bạn bè', difficulty: 'Trung bình', color: 'bg-yellow-500' },
        { number: 4, title: 'Bộ đề 4', description: 'Ngữ cảnh: Du lịch & Giải trí', difficulty: 'Trung bình', color: 'bg-purple-500' },
        { number: 5, title: 'Bộ đề 5', description: 'Ngữ cảnh: Công việc & Sự nghiệp', difficulty: 'Trung bình', color: 'bg-pink-500' },
        { number: 6, title: 'Bộ đề 6', description: 'Ngữ cảnh: Sức khỏe & Thể thao', difficulty: 'Khó', color: 'bg-red-500' },
        { number: 7, title: 'Bộ đề 7', description: 'Ngữ cảnh: Công nghệ & Internet', difficulty: 'Khó', color: 'bg-indigo-500' },
        { number: 8, title: 'Bộ đề 8', description: 'Ngữ cảnh: Môi trường & Thiên nhiên', difficulty: 'Khó', color: 'bg-teal-500' },
        { number: 9, title: 'Bộ đề 9', description: 'Ngữ cảnh: Văn hóa & Xã hội', difficulty: 'Rất khó', color: 'bg-orange-500' },
        { number: 10, title: 'Bộ đề 10', description: 'Ngữ cảnh: Tổng hợp tất cả', difficulty: 'Rất khó', color: 'bg-gray-700' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-primary rounded-full p-4">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Chọn Bộ Đề Luyện Tập
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Xin chào, <span className="font-semibold text-primary">{studentInfo.name}</span> - Lớp {studentInfo.class}
                    </p>
                    <p className="text-gray-600">
                        Mỗi bộ đề có 50 câu hỏi với cùng ngữ pháp nhưng ngữ cảnh khác nhau
                    </p>
                </div>

                {/* Sets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sets.map((set) => (
                        <div
                            key={set.number}
                            onClick={() => onSelectSet(set.number)}
                            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                        >
                            {/* Header with color */}
                            <div className={`${set.color} p-4 text-white`}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold">{set.title}</h3>
                                    <Target className="w-6 h-6" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-700 mb-4 min-h-[48px]">{set.description}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500" />
                                        <span className="text-sm font-semibold text-gray-600">
                                            Độ khó: {set.difficulty}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">50 câu</span>
                                </div>

                                <button
                                    className={`w-full mt-4 ${set.color} hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition`}
                                >
                                    Chọn bộ đề này
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Lưu ý khi làm bài:
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li>• Mỗi bộ đề có 50 câu hỏi trắc nghiệm</li>
                        <li>• Thời gian làm bài: 60 phút</li>
                        <li>• Câu hỏi sẽ được trộn ngẫu nhiên mỗi lần làm</li>
                        <li>• Bạn có thể làm lại bộ đề bất kỳ lúc nào</li>
                        <li>• Mỗi bộ đề có ngữ cảnh khác nhau nhưng cùng ngữ pháp Unit 1-6</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SetSelectionScreen;
