# English Quiz Frontend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Features

- ✅ 50 randomized English questions
- ✅ 60-minute timer with auto-submit
- ✅ LocalStorage persistence
- ✅ Keyboard shortcuts (A/B/C/D, arrows, Enter)
- ✅ PDF export
- ✅ Responsive design
- ✅ Detailed explanations in Vietnamese

## Deployment

### Vercel
1. Connect GitHub repository
2. Set environment variable: `REACT_APP_API_URL`
3. Deploy automatically

## Tech Stack

- React 18
- Tailwind CSS
- Axios
- Lucide React (icons)
- jsPDF (PDF generation)
- Recharts (charts)
