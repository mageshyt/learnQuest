# Learn Quest 📔

Learn Quest is a platform that provides educational resources, courses, and expert insights. It is a platform that allows users to take control of their learning journey and achieve their goals.

## Features 🚀

- **Courses**: Learn Quest provides a wide range of courses on various topics. Users can enroll in these courses and learn at their own pace.

- **Expert Insights**: Learn Quest provides expert insights on various topics. Users can read these insights and learn from the experts.

- **Resources**: Learn Quest provides educational resources on various topics. Users can access these resources and learn from them.

- **User Dashboard**: Learn Quest provides a user dashboard where users can track their progress, view their enrolled courses, and access their certificates.

- **Quizzes**: Learn Quest provides quizzes for each course. Users can take these quizzes to test their knowledge and understanding of the course material.

- **Leaderboard**: Learn Quest provides a leaderboard where users can see their ranking based on their performance in the quizzes.


## Development 🛠

**Database**: Learn Quest uses a PostgreSQL database to store data. The database schema is as follows:
![](/assets/db-schema.png)
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**Tech Stack**:

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- clerk
- Gemini

## Getting Started

To get started with the project, follow these steps:

1. Add Environment Variables: Create a `.env.local` file in the root directory of the project and add the required environment variables from `.env.local.example`.

required environment variables:

```bash

DATABASE_URL=""
DATABASE_URL=""



NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
WEBHOOK_SECRET=


GEMINI_API_KEY=
NEXT_PUBLIC_GEMINI_API_KEY=""

MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
MUX_WEBHOOK_SECRET=


STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000


```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://learn-quest.vercel.app/) for more details.
