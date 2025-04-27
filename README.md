# **Gallery-Sphere Web Application** 🖼️

## **📌 Project Overview**
An **Image gallery** where:
- **Admins** can upload, manage, and delete pictures
- **Visitors** can browse pictures in a beautiful masonry layout
- **Users** can click to view full-size images and download them  

Built with **Firebase + Cloudinary** for backend and **Vanilla JavaScript** for frontend.  

---

## **✨ Features**
### **👨‍💻 Admin Panel**
- 🔐 **Secure Login/Logout** (Firebase Authentication)
- ⬆️ **Upload Pictures** (Supports JPG, PNG, WebP)
  - Add captions  
  - Select size (Small, Medium, Large)  
- 🗑️ **Delete Pictures**  
- 📊 **Dashboard Stats** (Total pictures, size-wise counts)  

### **👀 Public Gallery**
- 🖼️ **Pinterest-Style Masonry Layout** (Responsive grid)
- 🔍 **Click-to-Zoom** (Lightbox viewer)
- ⬇️ **Download Full-Quality Images**  
- 📱 **Mobile-Friendly Design**  

---

## **🛠️ Technologies Used**
| Category       | Technology |
|---------------|------------|
| **Frontend**  | HTML5, CSS3, Vanilla JavaScript |
| **Backend**   | Firebase (Authentication + Firestore) |
| **Cloud Storage** | Cloudinary (Image optimization + CDN) |
| **UI/UX**     | Font Awesome Icons, Custom CSS Animations |

---

## **🚀 Setup Guide**
### **Prerequisites**
- Firebase Project ([Setup Guide](https://firebase.google.com/docs/web/setup))
- Cloudinary Account ([Sign Up](https://cloudinary.com/))

### **Installation**
1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/art-gallery.git
   ```
2. **Configure Firebase**  
   - Update `firebase-config.js` with your Firebase credentials  
   - Enable **Email/Password Authentication** in Firebase Console  

3. **Set Up Cloudinary**  
   - Create an **Upload Preset** (unsigned)  
   - Update `cloudinaryConfig` in `firebase-config.js`  

4. **Deploy**  
   - Host on Firebase Hosting, Netlify, or any static web host  

---

## **🔒 Security Rules**
### **Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /pictures/{picture} {
      allow read: if true;       // Public can view
      allow write: if request.auth != null; // Only logged-in admins
    }
  }
}
```

---

## **📷 Why Cloudinary?**
- **Auto-optimizes images** (WebP conversion, resizing)  
- **Free tier** (10GB storage, 20GB bandwidth/month)  
- **Fast CDN delivery** (Better performance than Firebase Storage)  

---

## **📜 License**
MIT License - Free for personal and commercial use.  

---

## **💡 Future Improvements**
- [ ] **User Favorites** ❤️  
- [ ] **Search Functionality** 🔍  
- [ ] **Social Sharing** 📤  
- [ ] **Multiple Image Upload** 🖼️🖼️  

---

**🌟 Enjoy your gallery!**

---

### **Credits**
- UI Design: **Pinterest-Inspired**  
- Icons: [Font Awesome](https://fontawesome.com/)  
- Backend: [Firebase](https://firebase.google.com/) + [Cloudinary](https://cloudinary.com/)  

---
