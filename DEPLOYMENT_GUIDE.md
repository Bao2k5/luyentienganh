# 🚀 Hướng Dẫn Deploy Chi Tiết

## ✅ Đã Hoàn Thành
- [x] Code đã được push lên GitHub: https://github.com/Bao2k5/luyentienganh
- [x] Database MongoDB Atlas đã có 500 câu hỏi
- [x] Backend và Frontend đã test thành công ở local

---

## 📦 1. Deploy Backend lên Render

### Bước 1: Tạo Web Service
1. Truy cập: **https://render.com**
2. Đăng nhập (hoặc đăng ký nếu chưa có tài khoản)
3. Click **"New +"** (góc trên bên phải) → chọn **"Web Service"**

### Bước 2: Connect GitHub Repository
1. Click **"Connect account"** để kết nối GitHub
2. Chọn repository: **`Bao2k5/luyentienganh`**
3. Click **"Connect"**

### Bước 3: Cấu hình Service
Điền các thông tin sau:

| Field | Value |
|-------|-------|
| **Name** | `luyentienganh-backend` |
| **Region** | `Singapore` (hoặc gần Việt Nam nhất) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Bước 4: Thêm Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**, thêm các biến sau:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://leduongbao2005:Leduongbao2005%40@thuongmaidientu.1p1lsuz.mongodb.net/luyentienganh?retryWrites=true&w=majority
CORS_ORIGIN=*
```

⚠️ **Lưu ý**: Ký tự `@` trong password phải encode thành `%40`

### Bước 5: Deploy
1. Click **"Create Web Service"**
2. Đợi 3-5 phút để Render build và deploy
3. Khi thấy **"Live"** màu xanh → Deploy thành công! ✅
4. **Copy URL backend** (ví dụ: `https://luyentienganh-backend.onrender.com`)

### Bước 6: Test Backend
Mở trình duyệt và truy cập:
```
https://luyentienganh-backend.onrender.com/api/quiz/questions?setNumber=1
```

Nếu thấy JSON với 50 câu hỏi → Backend hoạt động tốt! ✅

---

## 🌐 2. Deploy Frontend lên Vercel

### Bước 1: Cài Vercel CLI (nếu chưa có)
```bash
npm install -g vercel
```

### Bước 2: Login Vercel
```bash
vercel login
```

### Bước 3: Deploy Frontend
```bash
cd frontend
vercel
```

Trả lời các câu hỏi:
- **Set up and deploy?** → `Y`
- **Which scope?** → Chọn account của bạn
- **Link to existing project?** → `N`
- **Project name?** → `luyentienganh` (hoặc tên bạn muốn)
- **Directory?** → `.` (enter)
- **Override settings?** → `N`

### Bước 4: Thêm Environment Variable
Sau khi deploy xong, vào Vercel Dashboard:

1. Vào project **luyentienganh**
2. Click **"Settings"** → **"Environment Variables"**
3. Thêm biến:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://luyentienganh-backend.onrender.com` (URL backend từ Render)
   - **Environment**: Chọn cả 3 (Production, Preview, Development)
4. Click **"Save"**

### Bước 5: Redeploy
```bash
vercel --prod
```

Hoặc vào Vercel Dashboard → **"Deployments"** → Click **"Redeploy"**

### Bước 6: Test Frontend
Mở URL Vercel (ví dụ: `https://luyentienganh.vercel.app`)

Kiểm tra:
- ✅ Trang chủ hiển thị đúng
- ✅ Nhập tên và lớp → Chọn bộ đề
- ✅ Làm bài thi → Submit
- ✅ Xem kết quả với giải thích chi tiết

---

## 🔧 3. Cập Nhật CORS trên Backend (Nếu Cần)

Nếu Frontend gặp lỗi CORS, cập nhật lại biến môi trường trên Render:

1. Vào Render Dashboard → Service **luyentienganh-backend**
2. Click **"Environment"**
3. Sửa `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://luyentienganh.vercel.app
   ```
4. Click **"Save Changes"**
5. Service sẽ tự động redeploy

---

## 📝 4. URLs Cuối Cùng

Sau khi deploy xong, bạn sẽ có:

- **Frontend**: `https://luyentienganh.vercel.app`
- **Backend**: `https://luyentienganh-backend.onrender.com`
- **Database**: MongoDB Atlas (đã có 500 câu hỏi)

---

## 🐛 Troubleshooting

### Backend không kết nối được MongoDB
- Kiểm tra `MONGODB_URI` có đúng không
- Kiểm tra password có encode `@` thành `%40` chưa
- Kiểm tra MongoDB Atlas có whitelist IP `0.0.0.0/0` chưa

### Frontend không gọi được Backend
- Kiểm tra `REACT_APP_API_URL` trên Vercel
- Kiểm tra CORS_ORIGIN trên Render
- Mở DevTools → Console để xem lỗi

### Render Free Tier Sleep
- Render free tier sẽ sleep sau 15 phút không hoạt động
- Lần đầu truy cập sẽ mất 30-60 giây để wake up
- Giải pháp: Upgrade lên paid plan hoặc dùng cron job để ping

---

## 🎉 Hoàn Thành!

Website của bạn đã sẵn sàng để sử dụng! 🚀

Chia sẻ link với bạn bè để cùng luyện thi tiếng Anh nhé! 📚
