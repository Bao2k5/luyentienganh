import React, { useState } from 'react';
import { BookOpen, History } from 'lucide-react';

const StartScreen = ({ onStart, onViewHistory }) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
    }

    if (!studentClass.trim()) {
      newErrors.studentClass = 'Vui lòng nhập lớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await onStart(name.trim(), studentClass.trim());
    } catch (error) {
      setErrors({ submit: error.message });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-4">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            BÀI THI TRẮC NGHIỆM
          </h1>
          <h2 className="text-lg md:text-xl text-gray-600 mb-4">
            VOICES PRE-INTERMEDIATE A2-B1 (UNIT 1-6)
          </h2>
          <div className="flex justify-center gap-6 text-sm md:text-base text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tổng số câu:</span>
              <span className="text-primary font-bold">50</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Thời gian:</span>
              <span className="text-primary font-bold">60 phút</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Nhập họ và tên của bạn"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Class Input */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
              Lớp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${errors.studentClass ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Nhập lớp của bạn (VD: 10A)"
              disabled={isLoading}
            />
            {errors.studentClass && (
              <p className="mt-1 text-sm text-red-500">{errors.studentClass}</p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Đang khởi tạo...' : 'BẮT ĐẦU THI'}
          </button>

          {/* View History Button */}
          <button
            type="button"
            onClick={() => {
              if (name.trim().length >= 2) {
                onViewHistory(name.trim());
              } else {
                setErrors({ name: 'Vui lòng nhập họ tên để xem lịch sử' });
              }
            }}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <History className="w-5 h-5" />
            XEM LỊCH SỬ LÀM BÀI
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Lưu ý:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Bài thi gồm 50 câu hỏi trắc nghiệm</li>
            <li>• Thời gian làm bài: 60 phút</li>
            <li>• Bài thi sẽ tự động nộp khi hết giờ</li>
            <li>• Bạn có thể xem lại và thay đổi câu trả lời trước khi nộp bài</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
