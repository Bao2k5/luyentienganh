# English Quiz Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/english-quiz
CORS_ORIGIN=http://localhost:3000
```

3. Start MongoDB (if running locally)

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Quiz Endpoints
- **POST** `/api/quiz/start` - Start quiz session
- **GET** `/api/quiz/questions` - Get shuffled questions
- **POST** `/api/quiz/submit` - Submit quiz answers
- **GET** `/api/quiz/results/:id` - Get quiz results

## Testing

Test endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:5000/health

# Start quiz
curl -X POST http://localhost:5000/api/quiz/start \
  -H "Content-Type: application/json" \
  -d '{"studentName":"John Doe","studentClass":"10A"}'

# Get questions
curl http://localhost:5000/api/quiz/questions
```
