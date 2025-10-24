# 📸 Image Upload System

A simple, elegant image upload system built with the **QANDA Design System v4.0**, storing user data in Google Sheets and images in Google Drive.

## 🎨 Design System

This project strictly follows the **QANDA Design System v4.0** with:
- ✅ Pretendard typography (프리텐다드)
- ✅ QANDA Orange brand colors (#FF5500)
- ✅ 8px spacing grid system
- ✅ Responsive breakpoints (Mobile/Tablet/Desktop)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Semantic color system for states
- ✅ Complete design token implementation

📋 **[View Complete Design System Documentation](./DESIGN_SYSTEM.md)**  
📋 **[View Implementation Guide](./DESIGN_SYSTEM_IMPLEMENTATION.md)**

---

## 🚀 Features

- Clean, modern UI following QANDA Design System
- Drag-and-drop support with keyboard accessibility
- Email validation with real-time feedback
- Image preview before upload
- Real-time upload feedback with semantic colors
- Stores data directly to Google Sheets
- Images automatically saved to Google Drive
- No backend server required
- Fully responsive (Mobile/Tablet/Desktop)
- WCAG 2.1 AA accessible

## 📁 Project Structure

```
image-upload-simple/
├── index.html                      # Main HTML structure (Design System markup)
├── styles.css                      # Design System implementation (CSS variables)
├── app.js                          # Application logic with accessibility
├── Code.gs                         # Google Apps Script backend
├── DESIGN_SYSTEM.md                # Complete design system documentation
├── DESIGN_SYSTEM_IMPLEMENTATION.md # Implementation guide
└── README.md                       # This file
```

## 🛠️ Setup

### 1. Google Apps Script Setup

1. Open your Google Sheet: [Your Spreadsheet](https://docs.google.com/spreadsheets/d/1XE5wwwzeruWI-P4fvMbs0JIV-TH-Un9wc1Jf1SbOYfA/edit)
2. Go to **Extensions** → **Apps Script**
3. Copy the contents of `Code.gs` into the script editor
4. Save the project
5. Click **Deploy** → **New deployment**
6. Select **Web app**
7. Settings:
   - **Execute as**: Me
   - **Who has access**: Anyone
8. Click **Deploy** and copy the web app URL

### 2. Update Configuration

In `app.js`, update the `SCRIPT_URL`:

```javascript
const CONFIG = {
    SCRIPT_URL: 'YOUR_WEB_APP_URL_HERE',
    // ...
};
```

### 3. Run Locally

```bash
# Start a local server
python3 -m http.server 3000 --directory /Users/churryboy/image-upload-simple

# Open in browser
open http://localhost:3000
```

## 📊 Data Structure

The system stores the following in your Google Sheet:

| Email | Image URL | Timestamp |
|-------|-----------|-----------|
| user@example.com | https://drive.google.com/... | 2025-10-24T... |

## 🔧 Configuration

Edit `app.js` to customize:

```javascript
const CONFIG = {
    SCRIPT_URL: '...',              // Your Google Apps Script URL
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB limit
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', ...]
};
```

## 🎨 Customization

### Design System Tokens
All styling uses CSS variables from the design system. Edit `styles.css`:

```css
:root {
  /* Colors */
  --color-brand-orange: #FF5500;
  --color-orange-50: #ED5000;
  
  /* Typography */
  --type-body: 16px;
  --font-weight-semibold: 600;
  
  /* Spacing (8px grid) */
  --space-base: 16px;
  --space-lg: 24px;
  
  /* Corner Radius */
  --radius-lg: 8px;
  --radius-xl: 12px;
}
```

### Adding Components
When adding new components, strictly follow the design system:
1. Use existing design tokens (CSS variables)
2. Follow spacing scale (4, 8, 12, 16, 24, 32, 48, 64px)
3. Apply semantic colors for states
4. Ensure WCAG 2.1 AA accessibility
5. Test across all breakpoints

See [DESIGN_SYSTEM_IMPLEMENTATION.md](./DESIGN_SYSTEM_IMPLEMENTATION.md) for detailed guidelines.

## 📝 Code Organization

### `app.js` Structure:
- **CONFIG**: Application configuration
- **state**: Application state management
- **elements**: DOM element references
- **validators**: Input validation functions
- **ui**: UI update functions
- **fileHandler**: File processing logic
- **api**: API communication
- **handlers**: Event handlers
- **init**: Application initialization

## 🌐 Deployment

### Option 1: GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Access via `https://username.github.io/repo-name`

### Option 2: Netlify
1. Drag & drop folder to [Netlify](https://app.netlify.com)
2. Get instant deployment

### Option 3: Any Web Host
Upload `index.html`, `styles.css`, and `app.js` to your web server.

## 🔒 Security Notes

- Client-side validation only - add server-side validation if needed
- Google Apps Script URL is public but requires authentication
- Consider adding rate limiting for production use
- Image files are publicly accessible via Google Drive link

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## 🆘 Troubleshooting

**CORS errors?**
- Make sure Google Apps Script is deployed with "Anyone" access
- Use `Content-Type: text/plain` to avoid preflight

**Images not uploading?**
- Check file size (must be < 5MB)
- Verify image format is supported
- Check browser console for errors

**Sheet not updating?**
- Verify SPREADSHEET_ID in `Code.gs`
- Check Apps Script execution logs
- Ensure you have edit access to the sheet

## 📄 License

MIT License - Feel free to use and modify!

---

**Current Spreadsheet**: https://docs.google.com/spreadsheets/d/1XE5wwwzeruWI-P4fvMbs0JIV-TH-Un9wc1Jf1SbOYfA/edit
