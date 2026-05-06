# English Quiz Website - Luyện Thi Tiếng Anh

Website luyện thi trắc nghiệm tiếng Anh với 500 câu hỏi (10 bộ đề × 50 câu) từ Voices Pre-Intermediate A2-B1.

## Tính năng

- ✅ 10 bộ đề với ngữ cảnh khác nhau (Cuộc sống hàng ngày, Trường học, Gia đình, Du lịch, Công việc, Sức khỏe, Công nghệ, Môi trường, Văn hóa, Tổng hợp)
- ✅ 50 câu hỏi mỗi bộ đề (Units 1-6 + Vocabulary)
- ✅ Thời gian làm bài: 60 phút
- ✅ Trộn câu hỏi ngẫu nhiên
- ✅ Giải thích chi tiết cho từng đáp án (đúng và sai)
- ✅ Cảnh báo lỗi thường gặp theo từng Unit
- ✅ Xuất kết quả PDF
- ✅ Lưu tiến độ với localStorage
- ✅ Responsive design (mobile-friendly)
- ✅ Keyboard shortcuts (A/B/C/D, arrows, Enter)

## Tech Stack

### Backend
- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- CORS enabled

### Frontend
- React 18
- Tailwind CSS
- Lucide React Icons
- jsPDF (PDF export)

## Deployment

- **Backend**: Render - https://your-backend.onrender.com
- **Frontend**: Vercel - https://your-frontend.vercel.app
- **Database**: MongoDB Atlas

## Local Development

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Seed Database

```bash
cd backend
node scripts/seed.js
```

## Author

Bao Le Duong - 2025
