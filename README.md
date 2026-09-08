# Pay-Gate

Pay-Gate is a creator support platform that allows users to create their own public payment page and receive support payments through Razorpay.

Each user gets a unique Pay-Gate page where supporters can enter their name, choose an amount, leave an optional message, and make a payment.

## Features

- User authentication
- Personal public Pay-Gate page
- Razorpay payment integration
- Individual Razorpay credentials for each user
- Supporter name and optional message
- Recent supporters section
- Donations sorted by amount
- MongoDB payment records
- Cloudinary image uploads
- Responsive UI
- Toast notifications

## Tech Stack

- Next.js
- React
- Tailwind CSS
- MongoDB
- Mongoose
- Razorpay
- NextAuth
- Cloudinary

## How It Works

1. A user creates an account.
2. The user configures their Razorpay credentials.
3. A public Pay-Gate page is created using their username.
4. Supporters visit the user's public page.
5. Supporters enter their name, amount, and optional message.
6. The server creates a Razorpay order using the recipient's Razorpay credentials.
7. Razorpay Checkout processes the payment.
8. Payment details are stored in MongoDB.
9. Successful payments are shown in the Recent Supporters section.

## Project Structure

```text
app/
├── [username]/
│   └── page.js
│
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.js
│   │   └── sign-up/
│   │       └── route.js
│   │
│   ├── dashboard/
│   │   └── route.js
│   │
│   ├── razorpay/
│   │   └── create-order/
│   │       └── route.js
│   │
│   ├── payments/
│   │   └── [recipientId]/
│   │       └── route.js
│   │
│   └── upload/
│       └── route.js
│
├── components/
│   ├── AuthWrapper.js
│   ├── Footer.js
│   ├── Navbar.js
│   └── PayGate.js
│
├── dashboard/
│   └── page.js
│
├── sign-in/
│   └── page.js
│
├── sign-up/
│   └── page.js
│
├── globals.css
├── layout.js
└── page.js

lib/
├── api.js
├── auth.js
├── cloudinary.js
└── db.js

models/
├── Payment.js
└── User.js
```

## Environment Setup

Create a `.env.local` file in the root of the project.

An `example.env` file is included in the repository as a reference for the required environment variables.

Copy the values from `example.env` into `.env.local` and configure them with your own credentials.

Do not commit `.env.local` to GitHub.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Go to the project directory:

```bash
cd pay-gate
```

Install dependencies:

```bash
npm install
```

Create and configure `.env.local`.

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Main Routes

### Public Pay-Gate

```text
/[username]
```

Example:

```text
/username
```

### Authentication

```text
/sign-in
/sign-up
```

### Dashboard

```text
/dashboard
```

## Payment

Pay-Gate uses Razorpay for processing support payments.

Each user can use their own Razorpay credentials. Razorpay secrets are used only on the server and are never exposed to the client.

Payment records include information such as:

- Recipient
- Donor name
- Donor email
- Message
- Amount
- Currency
- Razorpay order ID
- Razorpay payment ID
- Payment status
- Payment date

Amounts are stored in the smallest currency unit. For example:

```text
₹100 = 10000 paise
```

## Security

- Razorpay secret keys are never sent to the client.
- Razorpay orders are created on the server.
- `.env.local` must not be committed to GitHub.
- Payment status should be verified on the server before displaying a payment as successful.

## License

This project is for learning and development purposes.