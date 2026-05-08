import React, { useState } from 'react';
import { BookOpen, Trophy, Target, ChevronRight, Star, Zap, Shield } from 'lucide-react';

const DIFFICULTY_CONFIG = {
    easy: {
        label: '🟢 Dễ',
        labelFull: 'Cơ bản',
        description: 'Nền tảng ngữ pháp, câu rõ ràng, đáp án dễ phân biệt',
        icon: Shield,
        badgeClass: 'bg-green-100 text-green-800 border border-green-300',
        headerGradient: 'from-green-500 to-emerald-600',
        btnClass: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
        glowClass: 'hover:shadow-green-200',
        sets: [1, 2, 3],
    },
    medium: {
        label: '🟡 Trung bình',
        labelFull: 'Nâng cao',
        description: 'Cần hiểu ngữ cảnh, phân biệt các cấu trúc dễ nhầm',
        icon: Star,
        badgeClass: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
        headerGradient: 'from-yellow-500 to-orange-500',
        btnClass: 'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600',
        glowClass: 'hover:shadow-yellow-200',
        sets: [4, 5, 6, 7],
    },
    hard: {
        label: '🔴 Khó',
        labelFull: 'Thử thách',
        description: 'Cấu trúc phức tạp, đáp án rất gần nhau, cần tư duy kỹ',
        icon: Zap,
        badgeClass: 'bg-red-100 text-red-800 border border-red-300',
        headerGradient: 'from-red-500 to-rose-600',
        btnClass: 'from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700',
        glowClass: 'hover:shadow-red-200',
        sets: [8, 9, 10],
    },
};

const SETS_DATA = [
    { number: 1, title: 'Bộ đề 1', context: 'Cuộc sống hàng ngày', topics: 'Adverbs, Present Simple, Past Simple cơ bản', setDifficulty: 'easy' },
    { number: 2, title: 'Bộ đề 2', context: 'Trường học & Học tập', topics: 'Wh-questions, Can, Vocabulary cơ bản', setDifficulty: 'easy' },
    { number: 3, title: 'Bộ đề 3', context: 'Gia đình & Bạn bè', topics: 'Past Simple nâng cao, Present Continuous', setDifficulty: 'easy' },
    { number: 4, title: 'Bộ đề 4', context: 'Du lịch & Giải trí', topics: 'Past Continuous, Indefinite Pronouns', setDifficulty: 'medium' },
    { number: 5, title: 'Bộ đề 5', context: 'Công việc & Sự nghiệp', topics: 'Will vs Going to, Future plans', setDifficulty: 'medium' },
    { number: 6, title: 'Bộ đề 6', context: 'Sức khỏe & Thể thao', topics: 'When/While, Promises & Offers', setDifficulty: 'medium' },
    { number: 7, title: 'Bộ đề 7', context: 'Công nghệ & Internet', topics: 'Conditionals loại 0 & 1 (cơ bản)', setDifficulty: 'medium' },
    { number: 8, title: 'Bộ đề 8', context: 'Môi trường & Thiên nhiên', topics: 'Comparatives, Superlatives, Present Perfect', setDifficulty: 'hard' },
    { number: 9, title: 'Bộ đề 9', context: 'Văn hóa & Xã hội', topics: 'Verb patterns (-ing / to V), Relative clauses', setDifficulty: 'hard' },
    { number: 10, title: 'Bộ đề 10', context: 'Tổng hợp toàn bộ', topics: 'Tất cả ngữ pháp — thử thách tổng kết', setDifficulty: 'hard' },
];

// Per-question difficulty breakdown for tooltip
const DIFFICULTY_BREAKDOWN = {
    easy: { easy: 15, medium: 20, hard: 15 },
    medium: { easy: 10, medium: 22, hard: 18 },
    hard: { easy: 5, medium: 15, hard: 30 },
};

const SetSelectionScreen = ({ onSelectSet, studentInfo }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [hoveredSet, setHoveredSet] = useState(null);

    const filteredSets = activeFilter === 'all'
        ? SETS_DATA
        : SETS_DATA.filter(s => s.setDifficulty === activeFilter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 shadow-lg">
                            <BookOpen className="w-12 h-12 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Chọn Bộ Đề Luyện Tập
                    </h1>
                    <p className="text-lg text-gray-600 mb-1">
                        Xin chào, <span className="font-semibold text-blue-600">{studentInfo.name}</span>
                        {studentInfo.class && <> — Lớp <span className="font-semibold">{studentInfo.class}</span></>}
                    </p>
                    <p className="text-gray-500 text-sm">
                        500 câu hỏi • 10 bộ đề • Phân cấp từ dễ đến khó
                    </p>
                </div>

                {/* Difficulty Legend Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {Object.entries(DIFFICULTY_CONFIG).map(([key, cfg]) => {
                        const Icon = cfg.icon;
                        return (
                            <div
                                key={key}
                                onClick={() => setActiveFilter(activeFilter === key ? 'all' : key)}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                    activeFilter === key
                                        ? `bg-gradient-to-br ${cfg.headerGradient} text-white border-transparent shadow-lg scale-105`
                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <Icon className={`w-6 h-6 ${activeFilter === key ? 'text-white' : 'text-gray-600'}`} />
                                    <div>
                                        <div className={`font-bold text-sm ${activeFilter === key ? 'text-white' : 'text-gray-800'}`}>
                                            {cfg.label} — {cfg.labelFull}
                                        </div>
                                        <div className={`text-xs ${activeFilter === key ? 'text-white/80' : 'text-gray-500'}`}>
                                            Bộ đề {cfg.sets.join(', ')}
                                        </div>
                                    </div>
                                </div>
                                <p className={`text-xs leading-relaxed ${activeFilter === key ? 'text-white/90' : 'text-gray-500'}`}>
                                    {cfg.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Filter indicator */}
                {activeFilter !== 'all' && (
                    <div className="flex items-center justify-between mb-4 px-1">
                        <p className="text-sm text-gray-600">
                            Đang hiển thị: <span className="font-semibold">{DIFFICULTY_CONFIG[activeFilter].label}</span>
                            {' '}({filteredSets.length} bộ đề)
                        </p>
                        <button
                            onClick={() => setActiveFilter('all')}
                            className="text-xs text-blue-600 hover:underline"
                        >
                            Hiển thị tất cả
                        </button>
                    </div>
                )}

                {/* Sets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredSets.map((set) => {
                        const cfg = DIFFICULTY_CONFIG[set.setDifficulty];
                        const breakdown = DIFFICULTY_BREAKDOWN[set.setDifficulty];
                        const Icon = cfg.icon;
                        return (
                            <div
                                key={set.number}
                                onClick={() => onSelectSet(set.number)}
                                onMouseEnter={() => setHoveredSet(set.number)}
                                onMouseLeave={() => setHoveredSet(null)}
                                className={`bg-white rounded-2xl shadow-md hover:shadow-xl ${cfg.glowClass} transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100`}
                            >
                                {/* Colored Header */}
                                <div className={`bg-gradient-to-r ${cfg.headerGradient} p-4 text-white`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="text-lg font-bold">{set.title}</h3>
                                        <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                                            50 câu
                                        </span>
                                    </div>
                                    <p className="text-white/85 text-sm">📍 {set.context}</p>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    {/* Difficulty Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.badgeClass}`}>
                                            {cfg.label}
                                        </span>
                                        <span className="text-xs text-gray-400">— {cfg.labelFull}</span>
                                    </div>

                                    {/* Topics */}
                                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                        🎯 <span className="font-medium">Trọng tâm:</span> {set.topics}
                                    </p>

                                    {/* Difficulty breakdown bar */}
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-400 mb-1.5">Phân bố độ khó:</p>
                                        <div className="flex rounded-full overflow-hidden h-2 bg-gray-100">
                                            <div
                                                className="bg-green-400 transition-all"
                                                style={{ width: `${breakdown.easy}%` }}
                                                title={`${breakdown.easy}% câu dễ`}
                                            />
                                            <div
                                                className="bg-yellow-400 transition-all"
                                                style={{ width: `${breakdown.medium}%` }}
                                                title={`${breakdown.medium}% câu trung bình`}
                                            />
                                            <div
                                                className="bg-red-400 transition-all"
                                                style={{ width: `${breakdown.hard}%` }}
                                                title={`${breakdown.hard}% câu khó`}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>🟢 {breakdown.easy} dễ</span>
                                            <span>🟡 {breakdown.medium} TB</span>
                                            <span>🔴 {breakdown.hard} khó</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        className={`w-full bg-gradient-to-r ${cfg.btnClass} text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md`}
                                    >
                                        Bắt đầu làm bài
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Info Footer */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        Gợi ý lộ trình học tập
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { step: '1', title: 'Bắt đầu với Đề 1–3', desc: 'Nắm chắc nền tảng: Adverbs, Present Simple, Past Simple', color: 'text-green-700 bg-green-50 border-green-200' },
                            { step: '2', title: 'Thách thức với Đề 4–7', desc: 'Past Continuous, Will/Going to, Conditionals cơ bản', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
                            { step: '3', title: 'Chinh phục Đề 8–10', desc: 'Present Perfect, Verb patterns, Relative clauses nâng cao', color: 'text-red-700 bg-red-50 border-red-200' },
                        ].map(item => (
                            <div key={item.step} className={`p-4 rounded-xl border ${item.color}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">{item.step}</span>
                                    <span className="font-semibold text-sm">{item.title}</span>
                                </div>
                                <p className="text-xs leading-relaxed opacity-80">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        ⏱ Mỗi bộ đề 60 phút • 50 câu trắc nghiệm • Xem giải thích chi tiết sau khi nộp bài
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SetSelectionScreen;
