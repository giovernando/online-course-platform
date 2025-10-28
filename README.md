# Online Course Platform (LMS)

A modern, full-featured online course platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

-  **Authentication**: NextAuth.js with Google, GitHub, and credentials login
-  **Role-based Access**: Instructor and Student roles
-  **Course Management**: Create, view, and manage courses
-  **Video Lessons**: Upload and watch video content
-  **Progress Tracking**: Track learning progress
-  **Payments**: Stripe integration for paid courses
-  **Modern UI**: Responsive design with Tailwind CSS
-  **Mobile Friendly**: Works great on all devices

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **File Upload**: UploadThing
- **UI Components**: Custom components with class-variance-authority
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd online-course-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
DATABASE_URL="file:./dev.db"

NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

STRIPE_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Run the development server:
```bash
npm run dev
```

## License

This project is licensed under the MIT License.
