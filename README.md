# FocusHub

FocusHub is a study room booking web application built for a Milestone 9 assignment. Users can browse available rooms, filter and search listings, view room details, book rooms, manage their bookings, and create or manage their own room listings.

## Live Links

- Client: Add your deployed client URL here
- Server: Add your deployed server URL here

## Features

- Email/password authentication with Better Auth
- Google social login
- Browse all study rooms
- Search rooms by room name
- Filter rooms by amenities and hourly rate
- View detailed room information
- Book a room with date, start time, end time, and note
- View and cancel personal bookings
- Add new room listings
- View user-specific room listings
- Edit and delete owned rooms
- Responsive layout for mobile, tablet, and desktop
- Dark mode support
- Toast and alert feedback for important actions

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- DaisyUI
- HeroUI
- Better Auth
- MongoDB
- Lucide React
- React Hot Toast
- SweetAlert2
- Date FNS

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home page with banner and extra sections |
| `/rooms` | All rooms with search and filters |
| `/rooms-details/[id]` | Room details, booking, edit, and delete actions |
| `/add-rooms` | Add a new room |
| `/my-listing` | Rooms created by the logged-in user |
| `/my-bookings` | Bookings made by the logged-in user |
| `/login` | Login page |
| `/register` | Registration page |

## Environment Variables

Create a `.env` file in the root folder and add these variables:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENTID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Backend API

This client expects the backend server to run at:

```txt
NEXT_PUBLIC_SERVER_URL
```

Used API groups include:

- `/rooms`
- `/room/:id`
- `/booking`
- `/booking/:userId`
- `/user?email=user@example.com`

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run start
```

Runs the production build.

```bash
npm run lint
```

Runs ESLint.

## Assignment Notes

- The application uses protected user-based actions for room listing and booking features.
- Room images are loaded from remote image URLs.
- The UI is responsive and supports dark mode through the existing dark class setup.
- Authentication is handled through Better Auth with MongoDB and Google OAuth support.

## Author

Add your name here.
