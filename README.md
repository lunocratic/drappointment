# Doctor Appointment UI

A modern, responsive web application for booking and managing doctor appointments built with React, TypeScript, and Material-UI.

## Features

- 📝 **Complete Appointment Booking Form** with validation
  - Patient details (name, phone, email)
  - Doctor and department selection
  - Date and time picker with constraints
  - Visit type selection (New/Follow-up)
  - Symptoms/notes field
  - Consent checkbox

- 📋 **Appointment Management**
  - View all appointments as responsive cards
  - Edit existing appointments
  - Cancel appointments with confirmation dialog
  - Status tracking (Booked/Cancelled)

- 🎨 **Modern UI/UX**
  - Responsive design (mobile-first)
  - Material-UI components
  - Inline validation with helpful error messages
  - Success notifications via Snackbar
  - Color-coded department avatars

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v5** - Component library
- **@mui/x-date-pickers** - Advanced date/time pickers
- **dayjs** - Date manipulation
- **@emotion** - CSS-in-JS styling

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm

## Installation

1. **Install dependencies:**

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AppointmentForm.tsx    # Form component with validation
│   ├── AppointmentCard.tsx    # Card component for displaying appointments
│   └── ConfirmDialog.tsx      # Reusable confirmation dialog
├── types.ts                   # TypeScript interfaces
├── App.tsx                    # Main app component
├── main.tsx                   # Entry point
└── index.css                  # Global styles
```

## Form Validation Rules

- **Patient Name**: Required
- **Phone Number**: Required, must be 10 digits
- **Email**: Optional, must be valid email format if provided
- **Doctor**: Required
- **Department**: Required (auto-filled when doctor is selected)
- **Appointment Date**: Required, future dates only
- **Appointment Time**: Required, between 09:00 - 17:00 (clinic hours)
- **Consent**: Required

## Features Breakdown

### Appointment Form
- 2-column layout on desktop, single column on mobile
- Real-time validation with error messages
- Submit button disabled until all required fields are valid
- Reset button to clear form
- Auto-selects department when doctor is chosen
- Date picker restricts past dates
- Time picker enforces clinic hours (9 AM - 5 PM)

### Appointment Cards
- Responsive grid (1 column mobile, 2-3 columns desktop)
- Color-coded avatars based on department
- Display all key information clearly
- Edit and Cancel action buttons
- Chips for visit type and status

### User Experience
- Confirmation dialog before canceling appointments
- Success snackbar notifications
- Smooth scrolling to form when editing
- Form pre-fills when editing an appointment

## Sample Doctors

- Dr. Rao – Cardiology
- Dr. Meera – Dermatology
- Dr. Arjun – Pediatrics
- Dr. Sharma – General Medicine

## License

MIT

## Author

Built with ❤️ using React and Material-UI
