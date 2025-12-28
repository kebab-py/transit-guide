// This is an EXAMPLE of what your future backend API could look like
// You would run this as a separate Node.js server

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory storage (in production, use a real database like MongoDB/PostgreSQL)
let cities = [
  // Your cities data
];

let userContent = [
  // User contributions
];

let users = [
  // User accounts
];

// ==================== CITY ROUTES ====================

// Get all cities
app.get('/api/cities', (req, res) => {
  const { search } = req.query;
  
  let filteredCities = cities;
  
  if (search) {
    filteredCities = cities.filter(city => 
      city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(filteredCities);
});

// Get single city
app.get('/api/cities/:cityId', (req, res) => {
  const city = cities.find(c => c.id === req.params.cityId);
  
  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }
  
  res.json(city);
});

// Add new city (admin only)
app.post('/api/cities', (req, res) => {
  // TODO: Add authentication middleware
  // TODO: Validate request body
  
  const newCity = {
    id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
    ...req.body,
    verified: false // Needs admin approval
  };
  
  cities.push(newCity);
  res.status(201).json(newCity);
});

// Update city (admin only)
app.put('/api/cities/:cityId', (req, res) => {
  // TODO: Add authentication middleware
  // TODO: Validate request body
  
  const cityIndex = cities.findIndex(c => c.id === req.params.cityId);
  
  if (cityIndex === -1) {
    return res.status(404).json({ error: 'City not found' });
  }
  
  cities[cityIndex] = { ...cities[cityIndex], ...req.body };
  res.json(cities[cityIndex]);
});

// ==================== USER CONTENT ROUTES ====================

// Get content for a city
app.get('/api/cities/:cityId/content', (req, res) => {
  const { type } = req.query; // Filter by type: 'tip', 'warning', 'photo'
  
  let content = userContent.filter(c => c.cityId === req.params.cityId);
  
  if (type) {
    content = content.filter(c => c.type === type);
  }
  
  res.json(content);
});

// Add content (authenticated users)
app.post('/api/cities/:cityId/content', (req, res) => {
  // TODO: Add authentication middleware to get current user
  // const userId = req.user.id;
  
  const newContent = {
    id: Date.now(),
    cityId: req.params.cityId,
    type: req.body.type,
    author: req.body.author, // In production, get from authenticated user
    date: new Date().toISOString().split('T')[0],
    content: req.body.content,
    upvotes: 0,
    verified: false
  };
  
  userContent.push(newContent);
  res.status(201).json(newContent);
});

// Upvote content
app.post('/api/content/:contentId/upvote', (req, res) => {
  const content = userContent.find(c => c.id === parseInt(req.params.contentId));
  
  if (!content) {
    return res.status(404).json({ error: 'Content not found' });
  }
  
  content.upvotes += 1;
  res.json(content);
});

// Delete content (author or admin)
app.delete('/api/content/:contentId', (req, res) => {
  // TODO: Add authentication and authorization
  
  const contentIndex = userContent.findIndex(c => c.id === parseInt(req.params.contentId));
  
  if (contentIndex === -1) {
    return res.status(404).json({ error: 'Content not found' });
  }
  
  userContent.splice(contentIndex, 1);
  res.json({ message: 'Content deleted' });
});

// ==================== USER ROUTES ====================

// Register
app.post('/api/auth/register', (req, res) => {
  // TODO: Hash password, validate email, etc.
  
  const newUser = {
    id: Date.now(),
    email: req.body.email,
    name: req.body.name,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // TODO: Generate JWT token
  res.status(201).json({ user: newUser, token: 'example-jwt-token' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  // TODO: Validate credentials, generate JWT
  
  const user = users.find(u => u.email === req.body.email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({ user, token: 'example-jwt-token' });
});

// Get current user
app.get('/api/auth/me', (req, res) => {
  // TODO: Get user from JWT token
  res.json({ user: { id: 1, name: 'Demo User', email: 'demo@example.com' } });
});

// ==================== PHOTO ROUTES ====================

// Upload photo (requires multer or similar)
app.post('/api/cities/:cityId/photos', (req, res) => {
  // TODO: Handle file upload
  // TODO: Upload to cloud storage (Cloudinary, AWS S3)
  // TODO: Save photo metadata to database
  
  res.status(201).json({
    id: Date.now(),
    url: 'https://example.com/photo.jpg',
    cityId: req.params.cityId,
    uploadedBy: 'user-id',
    caption: req.body.caption
  });
});

// ==================== ADMIN ROUTES ====================

// Verify/approve content (admin only)
app.post('/api/admin/content/:contentId/verify', (req, res) => {
  // TODO: Add admin authentication middleware
  
  const content = userContent.find(c => c.id === parseInt(req.params.contentId));
  
  if (!content) {
    return res.status(404).json({ error: 'Content not found' });
  }
  
  content.verified = true;
  res.json(content);
});

// Get pending content for moderation
app.get('/api/admin/pending', (req, res) => {
  // TODO: Add admin authentication middleware
  
  const pending = userContent.filter(c => !c.verified);
  res.json(pending);
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// ==================== NOTES ====================
/*

To use this backend:

1. Install dependencies:
   npm install express cors

2. For production, you'll also need:
   npm install mongoose (for MongoDB)
   npm install bcrypt jsonwebtoken (for authentication)
   npm install multer cloudinary (for image uploads)
   npm install express-rate-limit (for API rate limiting)

3. Set up a database:
   - MongoDB (recommended for flexibility)
   - PostgreSQL (for relational data)
   - Firebase Firestore (easiest to get started)

4. Environment variables (.env file):
   PORT=5000
   DATABASE_URL=your-database-connection-string
   JWT_SECRET=your-secret-key
   CLOUDINARY_URL=your-cloudinary-url

5. Run the server:
   node server.js

6. Update your React app to use this API:
   - Replace mock data with fetch() calls
   - Add error handling
   - Add loading states

*/
