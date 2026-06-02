# Blog Post Management System

A professional full-stack Blog Post Management System built with modern web technologies. This application allows users to create, read, update, and delete blog posts with advanced features like search, filtering, pagination, and CSV export capabilities.

## 🎯 Features

### Backend Features
- ✅ **CRUD Operations**: Complete Create, Read, Update, Delete functionality for blog posts
- ✅ **Pagination**: Customizable pagination for listing posts (10 posts per page default)
- ✅ **Advanced Search**: Search by title, author, or content with category filtering
- ✅ **Export to CSV**: Export all or filtered posts to CSV format for reporting
- ✅ **Data Validation**: Comprehensive field validation on all inputs
- ✅ **Error Handling**: Professional error handling with meaningful error messages
- ✅ **Responsive API**: RESTful API following best practices

### Frontend Features
- ✅ **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- ✅ **Multi-page Navigation**: List view, Create form, Edit form, and View details pages
- ✅ **Form Validation**: Real-time validation using React Hook Form
- ✅ **Search & Filter**: Search posts and filter by category
- ✅ **Notifications**: Toast notifications for success and error states
- ✅ **Component Architecture**: Modular, reusable components for easy maintenance
- ✅ **Professional UI**: Built with Ant Design and Tailwind CSS for modern aesthetics

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React 18+)
- **Language**: TypeScript
- **UI Library**: Ant Design 5
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **API Client**: Axios
- **State Management**: React Hooks

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **CSV Export**: csv-writer
- **Environment Management**: dotenv

### Database
- **Primary**: MongoDB (Mongoose)
- **Connection**: Local or MongoDB Atlas

## 📁 Project Structure

```
blog-management-system/
├── blog-backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── blogPostController.js # Business logic (CRUD, Search, Export)
│   ├── models/
│   │   └── BlogPost.js          # Mongoose schema with validation
│   ├── routes/
│   │   └── blogPostRoutes.js    # API endpoints
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handler
│   │   └── corsMiddleware.js    # CORS configuration
│   ├── exports/                 # CSV export files directory
│   ├── server.js                # Express app entry point
│   ├── package.json
│   ├── .env                     # Environment variables (local)
│   ├── .env.example
│   └── .gitignore
│
├── blog-frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Blog/
│   │   │   │   ├── BlogList.tsx  # Blog posts table/list view
│   │   │   │   └── BlogView.tsx  # Single post detail view
│   │   │   ├── Form/
│   │   │   │   └── BlogForm.tsx  # Create/Edit form component
│   │   │   └── Layout/
│   │   │       └── Layout.tsx    # Main layout with navigation
│   │   ├── lib/
│   │   │   ├── api.ts            # Axios instance & API methods
│   │   │   └── notifications.ts  # Toast notification helpers
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page (list view)
│   │   ├── globals.css           # Global styles
│   │   ├── create/
│   │   │   └── page.tsx          # Create new post page
│   │   ├── edit/[id]/
│   │   │   └── page.tsx          # Edit existing post page
│   │   └── view/[id]/
│   │       └── page.tsx          # View post details page
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local                # Frontend environment (local)
│   ├── .env.example
│   └── .gitignore
│
├── docker-compose.yml            # Docker setup for development
├── package.json                  # Root package for scripts
├── QUICKSTART.md                 # Quick start guide
└── README.md                     # This file
```

## 📋 Database Schema

### BlogPost Collection
```javascript
{
  _id: ObjectId,
  title: String (required, 3-200 chars),
  content: String (required, min 10 chars),
  author: String (required, 2-100 chars),
  category: String (required, enum: [Technology, Business, Lifestyle, Travel, Food, Other]),
  tags: [String] (optional),
  image: String (optional, URL),
  status: String (enum: [draft, published], default: draft),
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

#### Option 1: Using Setup Script (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

#### Option 2: Manual Setup

1. **Clone the repository**
```bash
cd blog-management-system
```

2. **Backend Setup**
```bash
cd blog-backend
npm install
cp .env.example .env
```

3. **Frontend Setup**
```bash
cd ../blog-frontend
npm install
cp .env.example .env.local
```

### Configuration

#### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/blog_db
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority

# CORS
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

#### Development Mode (Concurrent)
From the root directory:
```bash
npm run dev
```

#### Development Mode (Separate Terminals)

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

#### Production Build
```bash
npm run build
npm start
```

### Application URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Posts - List & Create
```
GET    /posts              # Get all posts (paginated)
POST   /posts              # Create new post
```

#### Posts - View, Edit, Delete
```
GET    /posts/:id          # Get single post by ID
PUT    /posts/:id          # Update post
DELETE /posts/:id          # Delete post
```

#### Posts - Search & Filter
```
GET    /posts/search?query=title&category=Technology&page=1
```
Query Parameters:
- `query` (string): Search in title, author, or content
- `category` (string): Filter by category
- `page` (number): Page number (default: 1)
- `limit` (number): Posts per page (default: 10)

#### Posts - Export
```
GET    /posts/export/csv?query=&category=
```
Query Parameters:
- `query` (string): Optional search query
- `category` (string): Optional category filter

Returns CSV file with posts data.

#### Health Check
```
GET    /api/health         # Server health status
```

### Request/Response Examples

#### Create Post
```json
POST /posts
Content-Type: application/json

{
  "title": "Getting Started with React",
  "content": "React is a powerful JavaScript library for building user interfaces...",
  "author": "John Doe",
  "category": "Technology",
  "tags": ["react", "javascript", "web"],
  "image": "https://example.com/image.jpg",
  "status": "published"
}

Response (201):
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Getting Started with React",
    "content": "...",
    ...
  }
}
```

#### Get Posts (Paginated)
```
GET /posts?page=1&limit=10

Response (200):
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  }
}
```

## 🎨 Features Walkthrough

### 1. Blog List Page
- View all blog posts in a professional table format
- Search by title or author
- Filter by category
- Pagination support
- Quick actions: View, Edit, Delete
- Export to CSV functionality

### 2. Create Post Page
- Form with fields: Title, Author, Category, Content, Tags, Image URL, Status
- Real-time validation
- Success notification on creation
- Automatic redirect to list

### 3. Edit Post Page
- Pre-populated form with existing data
- Full edit capabilities
- Validation on save
- Success notification

### 4. View Post Page
- Display full post content
- Show metadata: Author, Category, View count, Date
- Tags display
- Edit and Delete buttons
- Back to list navigation

## 🔒 Validation Rules

### Title
- Required
- 3-200 characters
- No special characters validation

### Content
- Required
- Minimum 10 characters
- Supports full text formatting

### Author
- Required
- 2-100 characters

### Category
- Required
- Must be one of: Technology, Business, Lifestyle, Travel, Food, Other

### Tags
- Optional
- Comma-separated values
- Trimmed and cleaned

### Image URL
- Optional
- Valid URL format

### Status
- Optional (default: draft)
- Values: draft or published

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)

#### Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel deploy
```

#### Netlify
```bash
npm run build
# Upload the 'out' directory to Netlify
```

**Environment Variables on Vercel/Netlify:**
```
NEXT_PUBLIC_API_URL=https://your-backend-url/api
```

### Backend Deployment (Railway/Render/Heroku)

#### Railway
1. Connect your GitHub repository
2. Add MongoDB Atlas connection string
3. Set environment variables
4. Deploy

#### Render
1. Create new Web Service
2. Connect to GitHub
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add environment variables

#### Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Environment Variables:**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📊 Performance Optimization

### Frontend
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Tailwind CSS purging for production
- Minified assets

### Backend
- Database indexing on frequently searched fields
- Connection pooling
- Response compression
- Pagination to reduce payload

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify port 5000 is not in use
- Check Node.js version (v16+)

### Frontend shows API connection errors
- Verify backend is running on port 5000
- Check CORS_ORIGIN in backend .env
- Verify NEXT_PUBLIC_API_URL in frontend .env.local

### MongoDB connection issues
- For local: Ensure MongoDB service is running
- For Atlas: Check IP whitelist and connection string
- Verify username/password if using authentication

## 📝 Development Notes

### Adding New Features
1. Create new controller methods in `blog-backend/controllers/`
2. Add routes in `blog-backend/routes/`
3. Create/update API methods in `blog-frontend/lib/api.ts`
4. Create components in `blog-frontend/app/components/`
5. Create pages in `blog-frontend/app/`

### Code Style
- Use TypeScript for type safety
- Follow component-based architecture
- Use Tailwind CSS for styling
- No inline styles
- Meaningful variable and function names

## 📦 Environment Variables Reference

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | Database connection | mongodb://localhost:27017/blog_db |
| CORS_ORIGIN | Allowed frontend URL | http://localhost:3000 |

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API URL | http://localhost:5000/api |

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

Created as a Full Stack Developer Assessment Project

## 🤝 Support

For issues and questions:
1. Check the QUICKSTART.md for common setup issues
2. Review API documentation above
3. Check browser console for frontend errors
4. Check server logs for backend errors

---

**Last Updated**: 2024
**Status**: Production Ready

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **MongoDB** running locally or MongoDB Atlas connection string

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd blog-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure `.env` file**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog_db
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd blog-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure `.env.local`**
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Posts
```
GET /posts?page=1&limit=10
```
**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Get Single Post
```
GET /posts/:id
```

#### Create Post
```
POST /posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post",
  "author": "John Doe",
  "category": "Technology",
  "tags": ["react", "javascript"],
  "image": "https://example.com/image.jpg",
  "status": "published"
}
```

#### Update Post
```
PUT /posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "author": "Jane Doe",
  "category": "Business",
  "status": "draft"
}
```

#### Delete Post
```
DELETE /posts/:id
```

#### Search Posts
```
GET /posts/search?query=react&category=Technology&page=1
```

#### Export to CSV
```
GET /posts/export/csv?query=&category=Technology
```

## ✅ Validation Rules

### Blog Post Fields
| Field | Type | Rules |
|-------|------|-------|
| title | String | Required, 3-200 characters |
| content | String | Required, minimum 10 characters |
| author | String | Required, 2-100 characters |
| category | String | Required, enum: [Technology, Business, Lifestyle, Travel, Food, Other] |
| tags | Array | Optional, comma-separated strings |
| image | String | Optional, valid URL |
| status | String | Optional, enum: [draft, published], default: draft |

## 🎨 UI/UX Features

- **Responsive Layout**: Adapts to mobile, tablet, and desktop screens
- **Search & Filter**: Real-time search with category filtering
- **Data Export**: Export filtered data to CSV
- **Form Validation**: Real-time field validation with error messages
- **Notification System**: Toast notifications for user feedback
- **Pagination**: Efficient data loading with pagination
- **Status Indicators**: Visual indicators for post status and views

## 🔧 Development

### Running Both Frontend and Backend

**Option 1: Two Terminal Windows**

Terminal 1 - Backend:
```bash
cd blog-backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd blog-frontend
npm run dev
```

**Option 2: Using concurrently (from root)**

1. Install concurrently globally:
   ```bash
   npm install -g concurrently
   ```

2. Create a script in the root directory to run both:
   ```bash
   concurrently "cd blog-backend && npm run dev" "cd blog-frontend && npm run dev"
   ```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally: `mongod`
- Check MongoDB URI in `.env` file
- For MongoDB Atlas, ensure IP whitelist includes your current IP

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use `PORT=3001 npm run dev` for frontend

### API Connection Issues
- Verify backend is running on the correct port
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Ensure CORS middleware is configured correctly

### Build Issues
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next && npm run dev`

## 📦 Building for Production

### Backend
```bash
cd blog-backend
npm install --production
npm start
```

### Frontend
```bash
cd blog-frontend
npm run build
npm start
```

## 🚀 Deployment

### Deploy Frontend to Vercel
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Set environment variables
5. Deploy

### Deploy Backend to Render or Railway
1. Push code to GitHub
2. Create account on Render.com or Railway.app
3. Create new Web Service from GitHub
4. Set environment variables
5. Deploy

### Example Environment Variables for Production

**Backend (Render/Railway):**
```
PORT=3000
MONGODB_URI=your_mongodb_atlas_uri
NODE_ENV=production
```

**Frontend (Vercel):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

## 📝 Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Ant Design](https://ant.design/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Full Stack Blog Management System - Assessment Project

---

**Happy Blogging! 📝**
