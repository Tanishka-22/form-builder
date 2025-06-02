# Form Builder

A simple form builder app built with [Remix](https://remix.run/) and [Tailwind CSS](https://tailwindcss.com/) that supports light and dark themes.

## Features

- Drag-and-drop form field builder
- Field configuration panel
- Live form preview
- Save form as JSON, CSV, or TXT
- Light/Dark theme toggle (remembers user preference)
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/form-builder.git
   cd form-builder
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Use the left panel to add fields to your form.
- Click on a field to configure its properties.
- Preview your form live as you build.
- Use the "Toggle Theme" button in the top-right to switch between light and dark mode.
- Save your form in various formats using the provided buttons.

## Customization

- **Tailwind CSS**: Edit `app/tailwind.css` and `tailwind.config.js` to customize styles.
- **Theme**: The theme toggle uses Tailwind's `dark:` variants and stores the user's preference in `localStorage`.

## Project Structure

```
app/
  components/        # React components for builder, preview, etc.
  routes/            # Remix routes
  tailwind.css       # Tailwind CSS entrypoint
  root.tsx           # Main app layout and theme logic
tailwind.config.js   # Tailwind configuration
```

## License

MIT
