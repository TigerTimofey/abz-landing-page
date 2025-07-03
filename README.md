# ABZ Landing Page

This is a test assignment for a front-end developer position. The project is a responsive landing page built with React, Vite, and SCSS, featuring user registration, user listing, and accessibility best practices.

## Features

- Responsive layout for desktop and mobile
- User registration form with validation
- User list fetched from API with pagination
- Accessible UI components
- Local Nunito font usage for performance
- Optimized images (WebP, responsive, preload)
- Error handling and feedback

## Tech Stack

- React 19
- Vite
- SCSS Modules
- MUI (Material UI)
- Custom hooks and utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/abz-landing-page.git
   cd abz-landing-page
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Environment Variables

- API base URL is set in `.env`:
  ```
  VITE_API_BASE_URL=https://frontend-test-assignment-api.abz.agency/api/v1
  ```

## Folder Structure

- `src/components` - React components
- `src/styles` - SCSS styles and variables
- `src/assets` - Images, fonts, and SVGs
- `src/services` - API service functions
- `src/utils` - Utility functions and custom controls

## Notes

- The project uses local Nunito font files for better performance.
- The main hero image is optimized and preloaded for best LCP.
- All user-uploaded photos must be JPEG/JPG and at least 70x70px.

## License

This project is for test assignment purposes only. Font license is included in `src/assets/fonts/Nunito/OFL.txt`.

---
