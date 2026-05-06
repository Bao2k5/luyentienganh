# 🎓 English Quiz Website - VOICES PRE-INTERMEDIATE A2-B1

Trang web thi trắc nghiệm tiếng Anh với 50 câu hỏi từ Unit 1-6, có lời giải chi tiết bằng tiếng Việt.

## ✨ Tính năng

- ✅ **50 câu hỏi ngẫu nhiên** từ Voices Pre-Intermediate A2-B1 (Unit 1-6)
- ✅ **Đồng hồ đếm ngược 60 phút** với cảnh báo khi còn < 5 phút
- ✅ **Lưu trạng thái tự động** vào localStorage (không mất khi refresh)
- ✅ **Keyboard shortcuts**: A/B/C/D (chọn đáp án), ←→ (chuyển câu), Enter (nộp bài)
- ✅ **Xuất kết quả PDF** với chi tiết từng câu
- ✅ **Responsive design** - hoạt động tốt trên mobile, tablet, desktop
- ✅ **Lời giải chi tiết** bằng tiếng Việt cho mỗi câu
- ✅ **Biểu đồ thống kê** kết quả bài thi

## 🏗️ Kiến trúc

- **Frontend**: React + Tailwind CSS (deploy trên Vercel)
- **Backend**: Node.js + Express + MongoDB (deploy trên Render)
- **Database**: MongoDB Atlas

## 📁 Cấu trúc thư mục

```
.
├── backend/              # Node.js API
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Seed script (50 questions)
│   └── server.js        # Entry point
│
├── frontend/            # React app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service
│   │   └── utils/       # Utilities (localStorage, PDF)
│   └── public/
│
└── .kiro/specs/         # Spec documents
```

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm run seed    # Seed 50 questions vào database
npm start       # Start server on port 5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start       # Start on port 3000
```

### 3. Truy cập

Mở trình duyệt: http://localhost:3000

## 📝 50 Câu hỏi

Câu hỏi được chia theo units:
- **Unit 1** (7 câu): Adverbs of Frequency & Present Tenses
- **Unit 2** (7 câu): Past Simple & Making Questions
- **Unit 3** (7 câu): Past Continuous & Indefinite Pronouns
- **Unit 4** (7 câu): Future - be going to & will
- **Unit 5** (7 câu): Conditionals & Comparatives
- **Unit 6** (10 câu): Present Perfect & Verb Patterns & Relative Clauses
- **Vocabulary** (5 câu): Personality, School Subjects, Food, etc.

Mỗi câu có:
- 4 đáp án (A, B, C, D)
- Đáp án đúng
- Lời giải chi tiết bằng tiếng Việt
- Phân loại theo unit

## 🌐 Deployment

Xem hướng dẫn chi tiết trong [DEPLOYMENT.md](DEPLOYMENT.md)

### Backend (Render)
1. Deploy từ GitHub
2. Set environment variables
3. Run seed script

### Frontend (Vercel)
1. Deploy từ GitHub
2. Set REACT_APP_API_URL
3. Auto deploy on push

## 🎯 Cách sử dụng

1. **Bắt đầu**: Nhập họ tên và lớp
2. **Làm bài**: Trả lời 50 câu hỏi trong 60 phút
3. **Điều hướng**: Dùng nút hoặc keyboard shortcuts
4. **Nộp bài**: Click "NỘP BÀI" hoặc tự động khi hết giờ
5. **Xem kết quả**: Điểm số, thống kê, lời giải chi tiết
6. **Xuất PDF**: Download kết quả để lưu trữ

## 🔧 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios
- Lucide React (icons)
- jsPDF (PDF generation)
- Recharts (charts)

### Backend
- Node.js
- Express
- Mongoose
- MongoDB
- CORS

## 📄 License

MIT

## 👨‍💻 Author

Created for English learning practice.
