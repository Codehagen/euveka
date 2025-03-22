# Euveka Device Controller

A modern web application for controlling a mannequin device with adjustable parameters. This application allows users to input different body measurements, visualize the changes on a mannequin model, save/load configurations, and simulate sending parameters to the physical device.

## Features

- **Parameter Controls**: Adjust seven different body measurements with user-friendly sliders
- **Real-time Visualization**: See changes applied to the mannequin in real-time as you adjust parameters
- **Configuration Management**: Save, load, edit, and delete parameter sets
- **Device Communication**: Simulate sending parameters to a physical mannequin device
- **Responsive Design**: Works on desktop and tablets with a clean, intuitive interface
- **Dark Mode Support**: Full support for both light and dark themes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (built on Radix UI)
- **State Management**: React's built-in hooks for local state
- **Storage**: Browser LocalStorage for saved configurations
- **Animation**: CSS transitions and Tailwind animations

## Setup and Installation

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/codehagen/euveka.git
   cd euveka
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

```bash
pnpm build
pnpm start
```

## How to Use

1. **Adjust Parameters**: Use the sliders to modify body measurements
2. **Save Configuration**: Click "Save / Load" button, enter a name, and save
3. **Load Configuration**: Click "Save / Load" button, select a saved configuration
4. **Send to Device**: Click "Send to Device" to simulate sending parameters to the physical mannequin

## Design Approach

### Architecture

The application is built using a component-based architecture with clear separation of concerns:

- **Page Components**: Main entry points for routes
- **UI Components**: Reusable interface elements
- **Feature Components**: Domain-specific functionality grouped by feature
- **Utility Functions**: Helpers for calculations and common operations

### Key Design Decisions

1. **Modular Component Structure**: Components are organized by feature with clear interfaces between them
2. **State Management**: Simplified state management using React's context and hooks instead of external libraries
3. **Server Components + Client Islands**: Server components for static parts, client components only where interactivity is needed
4. **Real-time Updates**: Immediate visual feedback as parameters change
5. **Error Handling**: Comprehensive error handling for localStorage operations and API calls
6. **Responsive UI**: Mobile-first approach with responsive breakpoints
7. **Accessibility**: Focus management, keyboard navigation, and proper aria attributes
8. **Theme Support**: Consistent appearance in both light and dark modes

### Error Handling

The application includes error handling for:

- Loading and parsing localStorage data (with user feedback)
- Saving, updating, and deleting configurations
- Network request simulation with random failures
- Input validation

## Future Improvements

With additional time, I would consider the following enhancements:

1. **More Comprehensive Testing**: Add unit and integration tests with Jest and React Testing Library
2. **Backend Integration**: Replace localStorage with a real backend API
3. **Real Device Communication**: Implement actual device communication via Bluetooth or WebUSB
4. **User Authentication**: Add user accounts to store configurations in the cloud
5. **History and Versioning**: Track changes to configurations over time
6. **Advanced Measurements**: Add more parameters and detailed adjustments
7. **3D Visualization**: Replace the 2D mannequin with a 3D model
8. **Preset Templates**: Add standard size presets (S, M, L, etc.)
9. **Performance Optimization**: Further optimize for larger datasets
10. **Analytics**: Track usage patterns to improve the interface

