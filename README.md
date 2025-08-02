# منشئ الفواتير - Arabic Invoice Generator

A professional invoice generation application with full Arabic language support, customizable logos, stamps, and comprehensive invoice management features.

## 🌟 Features

### Core Features
- **Full Arabic Support**: Complete RTL layout with Arabic fonts (Cairo, Noto Naskh Arabic)
- **Customizable Logo & Stamp**: Upload your own company logo and stamp images
- **Professional Layout**: Matches the exact design from the reference image
- **PDF Export**: Generate high-quality PDF invoices
- **Real-time Preview**: See changes instantly as you edit
- **Responsive Design**: Works on desktop and mobile devices

### Invoice Customization
- **Company Information**: Company name, manager name, logo, and stamp
- **Invoice Details**: Invoice number and date
- **Client Information**: Client name and details
- **Service Items**: Add, edit, and remove service entries with:
  - Date
  - Number of breakfast meals
  - Number of lunch meals
  - Price per entry
- **Summary Section**: 
  - Discount amount
  - Exchange rate
  - Currency selection
  - Automatic total calculations
  - USD conversion

### Technical Features
- **Modern Tech Stack**: React + TypeScript + Node.js
- **File Upload**: Secure image upload for logos and stamps
- **PDF Generation**: Client-side PDF generation using jsPDF
- **Styled Components**: Modern CSS-in-JS styling
- **Type Safety**: Full TypeScript support

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
invoice-generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── types/         # TypeScript interfaces
│   │   └── App.tsx        # Main app component
│   └── public/            # Static files
├── server/                # Node.js backend
│   ├── index.js           # Express server
│   └── uploads/           # Uploaded files
└── package.json           # Root package.json
```

## 🎯 How to Use

### 1. Company Setup
- Enter your company name
- Add the manager's name
- Upload your company logo (optional)
- Upload your company stamp (optional)

### 2. Invoice Details
- Set the invoice number
- Choose the invoice date

### 3. Client Information
- Enter the client's name

### 4. Services
- Add service entries with dates, meal counts, and prices
- Use the "إضافة خدمة" (Add Service) button to add more entries
- Remove entries using the trash icon

### 5. Summary
- Set discount amount
- Configure exchange rate
- Choose currency
- View automatic calculations

### 6. Generate PDF
- Click "تحميل PDF" (Download PDF) to generate and download the invoice

## 🎨 Customization

### Logo and Stamp
- Supported formats: PNG, JPG, SVG
- Maximum file size: 5MB
- Recommended dimensions: 200x200px or higher

### Styling
The application uses styled-components for styling. You can customize:
- Colors in the theme
- Fonts (currently using Cairo and Noto Naskh Arabic)
- Layout and spacing
- PDF generation settings

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies
npm run install-all

# Start development server (both frontend and backend)
npm run dev

# Start only the backend server
npm run server

# Start only the frontend
npm run client

# Build for production
npm run build
```

### Backend API Endpoints

- `POST /api/upload-logo` - Upload company logo
- `POST /api/upload-stamp` - Upload company stamp
- `POST /api/generate-invoice` - Generate invoice data
- `GET /api/health` - Health check

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 Mobile Support

The application is fully responsive and works on:
- iOS Safari
- Android Chrome
- Mobile browsers

## 🔒 Security Features

- File upload validation
- CORS configuration
- File size limits
- Secure file storage

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
cd client && npm run build
```

### Docker (Optional)
You can containerize the application using Docker for easy deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify Node.js version compatibility
4. Check file upload permissions

## 🎯 Future Enhancements

- Template system for different invoice types
- Multiple currency support
- Invoice history and management
- Email integration
- Cloud storage for uploaded files
- Multi-language support (English/Arabic toggle)
- Advanced PDF customization options
- Invoice numbering automation
- Client database management

---

**Built with ❤️ for Arabic invoice generation** 