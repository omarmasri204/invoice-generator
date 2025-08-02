const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? [
      'https://manal-catering.vercel.app',
      'https://*.vercel.app',
      'https://railway.com',
      process.env.FRONTEND_URL // Allow custom frontend URL from environment
    ].filter(Boolean) // Remove undefined values
  : ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Handle wildcard domains like *.vercel.app
        const pattern = allowedOrigin.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());

// File storage configuration
const uploadsDir = path.join(__dirname, 'uploads');
const storageFile = path.join(__dirname, 'stored-files.json');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initialize stored files data
let storedFiles = { logo: null, stamp: null };
if (fs.existsSync(storageFile)) {
  try {
    storedFiles = JSON.parse(fs.readFileSync(storageFile, 'utf8'));
  } catch (error) {
    console.log('Creating new storage file');
  }
}

// Function to save stored files data
const saveStoredFiles = () => {
  fs.writeFileSync(storageFile, JSON.stringify(storedFiles, null, 2));
};

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Serve static files
app.use('/uploads', express.static(uploadsDir));

// Static credentials
const STATIC_USER = 'Omar';
const STATIC_PASS = 'Omar-2004';

// Middleware to protect routes
function requireAuth(req, res, next) {
  if (req.cookies && req.cookies.auth_token === 'authenticated') {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
}

// Login endpoint
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  if (username === STATIC_USER && password === STATIC_PASS) {
    // Set HTTP-only cookie
    res.cookie('auth_token', 'authenticated', {
      httpOnly: true,
      sameSite: 'strict',
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true });
});

// Example protected route
app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is protected data.' });
});

// Routes
app.post('/api/upload-logo', upload.single('logo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Store the file information
    storedFiles.logo = {
      filename: req.file.filename,
      url: fileUrl,
      originalName: req.file.originalname,
      uploadedAt: new Date().toISOString()
    };
    saveStoredFiles();
    
    res.json({ 
      success: true, 
      fileUrl: fileUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

app.post('/api/upload-stamp', upload.single('stamp'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Store the file information
    storedFiles.stamp = {
      filename: req.file.filename,
      url: fileUrl,
      originalName: req.file.originalname,
      uploadedAt: new Date().toISOString()
    };
    saveStoredFiles();
    
    res.json({ 
      success: true, 
      fileUrl: fileUrl,
      filename: req.file.filename 
    });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Get stored files
app.get('/api/stored-files', (req, res) => {
  try {
    res.json({
      success: true,
      files: storedFiles
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stored files' });
  }
});

// Clear stored files
app.delete('/api/clear-files', (req, res) => {
  try {
    storedFiles = { logo: null, stamp: null };
    saveStoredFiles();
    res.json({ success: true, message: 'Stored files cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to clear stored files' });
  }
});

app.post('/api/generate-invoice', (req, res) => {
  try {
    const invoiceData = req.body;
    
    // Here you would typically generate a PDF
    // For now, we'll return the data for client-side PDF generation
    res.json({
      success: true,
      data: invoiceData,
      message: 'Invoice data prepared for generation'
    });
  } catch (error) {
    res.status(500).json({ error: 'Invoice generation failed' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Invoice Generator Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 