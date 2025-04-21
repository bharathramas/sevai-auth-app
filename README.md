
# SevAI Auth App with Public Landing

## Setup

1. Create `.env.local` with:

```
CLIENT_SECRET=your-cognito-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://sevai.co
```

2. Run:

```
npm install
npm run dev
```

Then visit:

- `/` — Public hero
- `/home` — Protected
- `/login` — Manual login button
