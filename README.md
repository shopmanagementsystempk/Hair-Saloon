# SIGMA HAIR DRESSERS - Professional Barber Shop Website

A professional, business-grade web application for SIGMA HAIR DRESSERS barber shop in Pakistan. Built with React JS and Firebase, designed for visa verification and official documentation purposes.

## 🌟 Features

### Public Pages
- **Home Page**: Professional hero section with business introduction
- **About Us**: Business overview, owner profile, mission & values
- **Services**: Complete service listings with transparent pricing
- **Gallery**: Professional images of shop and services
- **Business Details**: Official business information for verification (IMPORTANT for visa)
- **Testimonials**: Customer reviews and ratings
- **Contact**: Contact form with map integration
- **Appointment Booking**: Online appointment scheduling system

### Admin Panel
- **Protected Dashboard**: Firebase Authentication
- **Manage Appointments**: View and track customer bookings
- **Contact Messages**: Read customer inquiries
- **Business Statistics**: Monitor key metrics

## 🛠️ Technology Stack

- **Frontend**: React JS 19.2.3
- **Styling**: Bootstrap 5 + Custom CSS
- **Backend**: Firebase
  - Authentication (Admin login)
  - Firestore Database (appointments, services, testimonials)
  - Storage (gallery images)
  - Hosting
- **Routing**: React Router DOM
- **Icons**: React Icons

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## 🚀 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable the following services:
   - **Authentication**: Enable Email/Password sign-in method
   - **Firestore Database**: Create database in production mode
   - **Storage**: Enable Firebase Storage
   - **Hosting**: Enable Firebase Hosting (optional)

4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click on Web app (</>) icon
   - Copy the configuration object

5. Update `src/firebase.js` with your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Create Admin User

In Firebase Console:
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email: `admin@sigmahairdressers.com` (or your preferred email)
4. Enter a secure password
5. Click "Add user"

### 4. Firestore Database Structure

The app will automatically create collections when data is added. The structure is:

```
- appointments (collection)
  - {appointmentId} (document)
    - name: string
    - phone: string
    - service: string
    - date: string
    - time: string
    - status: string
    - createdAt: timestamp

- contacts (collection)
  - {contactId} (document)
    - name: string
    - email: string
    - phone: string
    - subject: string
    - message: string
    - createdAt: timestamp

- services (collection) - Optional, uses defaults if empty
  - {serviceId} (document)
    - name: string
    - description: string
    - price: string
    - category: string

- testimonials (collection) - Optional, uses defaults if empty
  - {testimonialId} (document)
    - name: string
    - rating: number
    - comment: string
    - date: string

- gallery (collection) - Optional, uses defaults if empty
  - {imageId} (document)
    - url: string
    - title: string
```

### 5. Firestore Security Rules

In Firebase Console > Firestore Database > Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all public collections
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /testimonials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Appointments - anyone can create, only admin can read
    match /appointments/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Contacts - anyone can create, only admin can read
    match /contacts/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 🏃 Running the Application

### Development Mode

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Login with your Firebase admin credentials
3. Access the dashboard at `/admin/dashboard`

## 📱 Pages Overview

### Public Pages
- `/` - Home
- `/about` - About Us
- `/services` - Services & Pricing
- `/gallery` - Photo Gallery
- `/business-details` - Official Business Information (Important for Visa)
- `/testimonials` - Customer Reviews
- `/contact` - Contact Form & Map
- `/appointment` - Book Appointment

### Admin Pages
- `/admin/login` - Admin Login
- `/admin/dashboard` - Admin Dashboard

## 🎨 Customization

### Update Business Information

Edit the following files to update business details:

1. **Business Details Page**: `src/pages/BusinessDetails.js`
2. **Footer**: `src/components/Footer.js`
3. **Contact Page**: `src/pages/Contact.js`
4. **About Page**: `src/pages/About.js`

### Update Services & Pricing

Services are stored in Firestore. You can:
- Add services through Firebase Console
- Or modify default services in `src/pages/Services.js`

### Update Gallery Images

Gallery images are stored in Firestore. You can:
- Add images through Firebase Console
- Or modify default images in `src/pages/Gallery.js`

## 🌐 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```
- Select "Hosting"
- Choose your Firebase project
- Set public directory to `build`
- Configure as single-page app: Yes
- Don't overwrite index.html

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Other Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 📄 Important for Visa Documentation

The **Business Details** page (`/business-details`) is specifically designed for visa verification purposes. It includes:

- Official business statement
- Complete business information
- Owner details
- Location with map
- Contact information
- Working hours
- Verification notice for embassies/employers

Make sure to update all information with accurate details before using for official purposes.

## 🔧 Troubleshooting

### Firebase Connection Issues
- Verify Firebase configuration in `src/firebase.js`
- Check Firebase project settings
- Ensure all Firebase services are enabled

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Admin Login Issues
- Verify admin user exists in Firebase Authentication
- Check Firebase Authentication is enabled
- Verify email/password sign-in method is enabled

## 📞 Support

For issues or questions:
- Email: info@sigmahairdressers.com
- Phone: +92 300 1234567

## 📝 License

This project is proprietary software for SIGMA HAIR DRESSERS.

## 👨‍💼 Business Owners

**Abdul Razaq**  
Owner & Professional Barber  

**Raja Ahsan Haider**  
Partner & Business Owner

SIGMA HAIR DRESSERS  
Lahore, Punjab, Pakistan

---

**© 2024 SIGMA HAIR DRESSERS. All Rights Reserved.**  
*Professional Barber Services – Pakistan*
