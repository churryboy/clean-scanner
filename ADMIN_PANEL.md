# Admin Panel Documentation

**Version**: 4.0  
**Feature**: Hidden Admin Panel for Bulk Uploads  
**Date**: October 24, 2025

---

## Overview

A hidden admin panel that allows administrators to upload images on behalf of users. The panel is completely invisible to regular users and accessed via a secret gesture.

---

## Access Method

**Double-click the version info** in the bottom right corner (displays: `v4.0 | 829fcf5`)

### Alternative Access
- **Escape Key**: Close admin panel
- **Click outside**: Close admin panel

---

## Features

### Admin Panel Components
1. **Recipient Email Input**: Email address of the user receiving the upload
2. **Image File Input**: Upload area with drag & drop support
3. **Submit Button**: Upload image on behalf of user
4. **Close Button**: X button to close panel

### Visual Design
- Full-screen modal overlay with backdrop blur
- Follows QANDA Design System v4.0
- Korean language (한국어)
- Smooth animations (fade in, slide up)
- Responsive on all devices

---

## How It Works

### Upload Process
1. Admin double-clicks version info
2. Admin panel opens
3. Enter recipient's email address
4. Select/drag image file
5. Click "업로드" (Upload)
6. Image is uploaded to Google Sheets under recipient's email

### Data Storage
- **Column A "Email"**: Recipient's email address
- **Column D "Output"**: Uploaded image URL

---

## Analytics Tracking

### Mixpanel Events

| Event | Description | Properties |
|-------|-------------|------------|
| `Admin Panel Opened` | Panel activated | - |
| `Admin Panel Closed` | Panel closed | - |
| `Admin Upload Area Clicked` | Click to upload | - |
| `Admin File Selected` | Valid file chosen | File name, size, type |
| `Admin File Validation Failed` | Invalid file | Error, file size, type |
| `Admin Form Validation Failed` | Missing fields | Has email, has file |
| `Admin Upload Started` | Upload initiated | Recipient email, file details |
| `Admin Upload Completed` ✅ | Successful upload | Recipient email, duration, file details |
| `Admin Upload Failed` ❌ | Upload error | Recipient email, error message |
| `Admin File Dropped` | Drag & drop | Method, file count |

---

## Security Considerations

### Access Control
- **No visible UI**: Entry point completely hidden
- **Secret gesture**: Double-click version info
- **No hints**: No tooltips or indicators for regular users
- **Client-side only**: No backend authentication required

### Privacy
- Admin actions tracked separately in Mixpanel
- Recipient email visible in analytics
- Audit trail for all admin uploads

### Recommendations for Production
1. **Add password protection**: Prompt for admin password before opening panel
2. **IP whitelist**: Only allow from specific IP addresses
3. **Backend validation**: Verify admin status server-side
4. **Rate limiting**: Limit number of admin uploads
5. **Audit logging**: Log all admin actions to separate database

---

## Usage Instructions

### For Administrators

1. **Open Admin Panel**
   - Navigate to the site
   - Double-click the version info (bottom right corner)
   - Panel will appear with fade animation

2. **Upload on Behalf of User**
   - Enter user's email address (e.g., `student@school.com`)
   - Click upload area or drag & drop image
   - Verify image preview
   - Click "업로드" button
   - Wait for success message
   - Panel will auto-reset after upload

3. **Close Panel**
   - Click X button (top right)
   - Press Escape key
   - Click outside the panel

### Tips
- Double-click must be within 500ms
- Same validation rules apply (5MB max, image files only)
- Upload duration is tracked for performance monitoring
- Use for bulk uploads or assisting users

---

## Technical Implementation

### HTML Structure
```html
<!-- Hidden Admin Panel -->
<div class="admin-panel" id="adminPanel">
  <div class="admin-container">
    <div class="admin-header">
      <h2>🔐 관리자 패널</h2>
      <button class="admin-close">✕</button>
    </div>
    <p class="admin-subtitle">사용자를 대신하여 이미지 업로드</p>
    <!-- Form fields -->
  </div>
</div>
```

### CSS
- `display: none` by default
- `.active` class shows panel
- Full-screen overlay (z-index: 9999)
- Backdrop blur effect
- Smooth animations

### JavaScript
- `admin` module with all functionality
- Double-click detection (500ms window)
- Separate state management
- Full Mixpanel integration

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Escape** | Close admin panel |
| **Enter** | Submit form (when email focused) |

---

## Browser Compatibility

✅ Chrome/Edge (recommended)  
✅ Firefox  
✅ Safari  
✅ Mobile browsers  

---

## Troubleshooting

### Panel Won't Open
- Ensure you're double-clicking fast enough (<500ms)
- Click directly on version info
- Check console for errors

### Upload Fails
- Verify email format is valid
- Check file size (max 5MB)
- Ensure internet connection
- Check Google Apps Script URL is correct

### Panel Won't Close
- Press Escape key
- Refresh page
- Check console for errors

---

## Code Reference

### Opening Admin Panel
```javascript
// Double-click detection
elements.versionInfo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 2) {
        admin.toggle();
    }
});
```

### Admin Upload
```javascript
await api.uploadImage(recipientEmail, file);
// Uses same API as regular users
// Email parameter determines recipient
```

---

## Future Enhancements

### Planned Features
- [ ] Batch upload (multiple images at once)
- [ ] User search/autocomplete
- [ ] Upload history view
- [ ] CSV import for bulk operations
- [ ] Image preview before upload
- [ ] Admin authentication
- [ ] Role-based permissions

### Security Enhancements
- [ ] Password protection
- [ ] Two-factor authentication
- [ ] IP whitelist
- [ ] Session timeout
- [ ] Activity audit log

---

## Design System Compliance

✅ **Colors**: QANDA Orange brand colors  
✅ **Typography**: Pretendard font  
✅ **Spacing**: 8px grid system  
✅ **Corner Radius**: 12px (xl) for container  
✅ **Buttons**: Primary button style  
✅ **Animations**: Smooth transitions  
✅ **Accessibility**: ARIA labels, keyboard support  
✅ **Responsive**: Mobile & desktop  

---

## Support

For admin panel issues or questions:
- **Check console logs**: Look for admin-related errors
- **Mixpanel dashboard**: View admin events
- **GitHub issues**: Report bugs

---

**Remember**: This is a powerful feature. Use responsibly and consider adding authentication in production!

---

**Version**: 4.0  
**Last Updated**: October 24, 2025  
**Maintained By**: QANDA Development Team

