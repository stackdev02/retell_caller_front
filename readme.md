# Retell Caller

A modern React-based web application for making phone calls using the Retell API. This application provides a sleek user interface with a dial pad, dynamic variable management, and real-time call controls.

![Retell Caller Screenshot]
*(Consider adding a screenshot of your application here)*

## Features

- 📱 Interactive dial pad interface
- ⚙️ Configurable API settings
- 🔄 Dynamic variable management
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode design
- 🔒 Secure API key handling

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Retell SDK
- Lucide React (for icons)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Retell API credentials

## Installation

1. Clone the repository
```bash
git clone <your-repository-url>
cd retell-caller
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create environment file
Create a `.env` file in the root directory with the following variables:
```env
VITE_RETELL_API_KEY=your_retell_api_key
VITE_RETELL_PHONE_NUMBER=your_retell_phone_number
```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
retell-caller/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles and Tailwind utilities
├── public/
├── .env                 # Environment variables
└── package.json         # Project dependencies and scripts
```

## Configuration

### Dynamic Variables

The application supports dynamic variables that can be passed to the Retell API. Default variables include:

- customer_name
- customer_email
- customer_phone
- agent_name
- followup_reason

You can add, remove, or modify these variables through the UI.

### API Configuration

The application requires two main configuration parameters:

1. Retell API Key
2. Phone Number (for making calls)

These can be configured either through environment variables or the UI settings panel.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Retell API](https://retell.cc/) for providing the voice API
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the build tooling
- [Lucide](https://lucide.dev/) for the icons

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
