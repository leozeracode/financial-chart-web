<div align="center">

# Financial Chat

Real-time chat application with SignalR

<br />

![Next.js](https://img.shields.io/badge/next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![SignalR](https://img.shields.io/badge/signalr-512BD4?style=flat-square&logo=dotnet&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-443E38?style=flat-square&logo=react&logoColor=white)

<br />

![Stars](https://img.shields.io/github/stars/your-username/financial-chat?style=flat-square)
![Forks](https://img.shields.io/github/forks/your-username/financial-chat?style=flat-square)
![Issues](https://img.shields.io/github/issues/your-username/financial-chat?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

<br />

[Demo](https://financial-chat.vercel.app) · [Report Bug](https://github.com/your-username/financial-chat/issues) · [Request Feature](https://github.com/your-username/financial-chat/issues)

</div>

<br />

## About

Financial Chat is a real-time messaging application built with modern web technologies. It features WebSocket communication via SignalR, JWT authentication, and follows Domain-Driven Design (DDD) architecture principles.

<br />

## Features

- Real-time messaging with SignalR WebSocket
- JWT authentication with session persistence
- Auto-reconnection with status indicator
- Message history loading
- Responsive dark mode UI
- Modular DDD architecture

<br />

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| State | Zustand 5 |
| Real-time | SignalR 8 |
| Forms | React Hook Form + Zod |
| UI | shadcn/ui |

<br />

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/leozeracode/financial-chart-web.git

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Run development server
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 || http://localhost:5001 
NEXT_PUBLIC_SIGNALR_HUB_URL=http://localhost:5000 || http://localhost:5001 
```

<br />

## Project Structure

```
├── app/                    # Next.js routes (dumb router)
├── modules/
│   ├── Pages/              # Application pages
│   ├── User/               # Auth module (login, register)
│   ├── Chat/               # Chat module (SignalR, messages)
│   └── Shared/             # Shared types & Shadcn components
├── Cn.ts                   # Class utility
└── docs/                   # Documentation
```

<br />

## Path Aliases

```typescript
import { useAuthStore } from '@user/Resources/UseAuthStore'
import { useSignalR } from '@chat/Resources/UseSignalR'
import { Button } from '@shadcn/Button'
import { cn } from '@/Cn'
```

<br />

## License

MIT

<br />

<div align="center">

![GitHub](https://img.shields.io/badge/github-181717?style=flat-square&logo=github&logoColor=white)
![LinkedIn](https://img.shields.io/badge/linkedin-0A66C2?style=flat-square&logo=linkedin&logoColor=white)

</div>
