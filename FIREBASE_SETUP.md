# Firebase Setup Guide for SIGMA HAIR DRESSERS

This guide will help you set up Firebase for the SIGMA HAIR DRESSERS website.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `sigma-hair-dressers` (or your preferred name)
4. Enable Google Analytics (optional but recommended)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the Web icon (</>)
2. Enter app nickname: "SIGMA HAIR DRESSERS Website"
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object - you'll need this later

## Step 3: Enable Authentication

1. In Firebase Console, go to **Build > Authentication**
2. Click "Get started"
3. Click on "Email/Password" under Sign-in method
4. Enable "Email/Password"
5. Click "Save"

### Create Admin User:
1. Go to **Authentication > Users** tab
2. Click "Add user"
3. Enter:
   - Email: `admin@sigmahairdressers.com`
   - Password: Create a strong password (save it securely!)
4. Click "Add user"

## Step 4: Set Up Firestore Database

1. Go to **Build > Firestore Database**
2. Click "Create database"
3. Select "Start in production mode"
4. Choose a location (select closest to Pakistan, e.g., "asia-south1")
5. Click "Enable"

### Set Up Security Rules:

1. Go to **Firestore Database > Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Services - public read, admin write
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Testimonials - public read, admin write
    match /testimonials/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Gallery - public read, admin write
    match /gallery/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Appointments - anyone can create, only admin can read/manage
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

3. Click "Publish"

## Step 5: Set Up Firebase Storage

1. Go to **Build > Storage**
2. Click "Get started"
3. Start in production mode
4. Choose same location as Firestore
5. Click "Done"

### Set Up Storage Rules:

1. Go to **Storage > Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 6: Configure Your Application

1. Open `src/firebase.js` in your project
2. Replace the configuration with your Firebase config:

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

## Step 7: Optional - Add Sample Data

You can add sample data through Firebase Console:

### Add a Service:
1. Go to Firestore Database
2. Click "Start collection"
3. Collection ID: `services`
4. Add document with fields:
   - name: "Men's Haircut"
   - description: "Professional haircut with styling"
   - price: "PKR 500"
   - category: "Haircut"

### Add a Testimonial:
1. Create collection: `testimonials`
2. Add document with fields:
   - name: "Ahmed Khan"
   - rating: 5
   - comment: "Excellent service!"
   - date: "2024-12-15"

### Add Gallery Image:
1. Create collection: `gallery`
2. Add document with fields:
   - url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600"
   - title: "Shop Interior"

## Step 8: Test Your Setup

1. Run your application: `npm start`
2. Try booking an appointment
3. Check if data appears in Firestore
4. Login to admin panel at `/admin/login`
5. Verify you can see appointments in dashboard

## Step 9: Deploy to Firebase Hosting (Optional)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init
```
- Select: Hosting
- Choose your project
- Public directory: `build`
- Single-page app: Yes
- GitHub deploys: No

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## Troubleshooting

### "Permission denied" errors:
- Check Firestore security rules are published
- Verify admin user is created in Authentication
- Ensure you're logged in as admin

### Firebase config errors:
- Double-check all config values in `firebase.js`
- Make sure there are no extra spaces or quotes
- Verify project ID matches your Firebase project

### Authentication not working:
- Ensure Email/Password is enabled in Authentication
- Check admin user exists with correct email
- Verify password is correct

## Security Best Practices

1. **Never commit Firebase config to public repositories** if it contains sensitive data
2. Use Firebase Security Rules to protect your data
3. Keep admin credentials secure
4. Enable App Check for additional security (optional)
5. Regularly review Authentication users
6. Monitor Firestore usage in Firebase Console

## Support

If you encounter issues:
1. Check Firebase Console for error messages
2. Review browser console for errors
3. Verify all Firebase services are enabled
4. Check security rules are correctly set

---

**Important**: After completing this setup, your website will be fully functional with:
- ✅ User appointment bookings
- ✅ Contact form submissions
- ✅ Admin authentication
- ✅ Data management
- ✅ Secure access control

Your website is now ready for professional use and visa documentation purposes!
