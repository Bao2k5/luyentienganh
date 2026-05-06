# Hướng dẫn Deploy English Quiz Website

## 1. MongoDB Atlas Setup

1. Tạo tài khoản tại https://www.mongodb.com/cloud/atlas
2. Tạo cluster mới (M0 Free tier)
3. Tạo database user:
   - Username: `quizapp`
   - Password: (tạo password mạnh)
   - Role: `readWrite` on `english-quiz` database
4. Network Access: Allow access from anywhere (0.0.0.0/0)
5. Lấy connection string:
   ```
   mongodb+srv://quizapp:<password>@cluster0.xxxxx.mongodb.net/english-quiz?retryWrites=true&w=majority
   ```

## 2. Backend Deployment (Render)

1. Đăng nhập https://render.com
2. Tạo New Web Service
3. Connect GitHub repository
4. Cấu hình:
   - **Name**: english-quiz-api
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=<your-mongodb-connection-string>
   CORS_ORIGIN=<your-vercel-frontend-url>
   ```
6. Deploy!
7. Sau khi deploy, chạy seed script:
   - Vào Shell tab trong Render dashboard
   - Chạy: `npm run seed`

## 3. Frontend Deployment (Vercel)

1. Đăng nhập https://vercel.com
2. Import GitHub repository
3. Cấu hình:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Environment Variables:
   ```
   REACT_APP_API_URL=<your-render-backend-url>
   ```
   Ví dụ: `https://english-quiz-api.onrender.com`
5. Deploy!

## 4. Testing

1. Truy cập frontend URL từ Vercel
2. Test flow:
   - Nhập tên và lớp
   - Làm bài thi
   - Nộp bài
   - Xem kết quả
   - Xuất PDF

## 5. Local Development

### Backend
```bash
cd backend
npm install
npm run seed  # Seed database
npm start     # Start server on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm start     # Start on port 3000
```

## Troubleshooting

### Backend không kết nối được MongoDB
- Kiểm tra connection string
- Kiểm tra Network Access trong MongoDB Atlas
- Kiểm tra username/password

### Frontend không gọi được API
- Kiểm tra REACT_APP_API_URL
- Kiểm tra CORS_ORIGIN trong backend
- Kiểm tra backend đã deploy thành công

### Câu hỏi không hiển thị
- Chạy seed script: `npm run seed` trong backend
- Kiểm tra database có 50 questions

## URLs

- **Frontend (Vercel)**: https://your-app.vercel.app
- **Backend (Render)**: https://your-api.onrender.com
- **MongoDB Atlas**: https://cloud.mongodb.com

## Notes

- Render free tier có thể sleep sau 15 phút không hoạt động
- Lần đầu truy cập sau khi sleep có thể mất 30-60 giây để wake up
- MongoDB Atlas M0 tier có giới hạn 512MB storage
