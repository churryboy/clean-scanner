# Sheet2 Setup Guide for Admin Uploads

**Version**: 4.0  
**Feature**: Separate Sheet for Admin Uploads  
**Date**: October 24, 2025

---

## Overview

Admin uploads are now routed to **Sheet2** with a simplified structure, while regular user uploads continue to go to **Sheet1**.

---

## Sheet Structure

### Sheet1 (Regular User Uploads)
| Column | Header | Content |
|--------|--------|---------|
| A | Email | User's email address |
| B | Image URL | Google Drive image link |
| C | Timestamp | ISO timestamp of upload |
| D | Output | Google Drive image link (same as B) |

### Sheet2 (Admin Uploads)
| Column | Header | Content |
|--------|--------|---------|
| A | Email | Recipient's email address (entered by admin) |
| B | Output | Google Drive image link |

---

## How It Works

### Regular User Upload Flow
1. User enters their email
2. User uploads image
3. Data sent to Google Apps Script with `isAdmin: false`
4. Script saves to **Sheet1** with columns A-D

### Admin Upload Flow
1. Admin double-clicks version info
2. Admin enters recipient's email
3. Admin uploads image
4. Data sent to Google Apps Script with `isAdmin: true`
5. Script saves to **Sheet2** with columns A-B only

---

## Google Apps Script Changes

### Updated Code.gs

The script now includes two functions:

```javascript
// For regular users → Sheet1
function addToSheet(email, imageUrl) {
  // Saves to Sheet1: Email, URL, Timestamp, Output
  sheet.appendRow([email, imageUrl, timestamp, imageUrl]);
}

// For admin uploads → Sheet2
function addToAdminSheet(email, imageUrl) {
  // Saves to Sheet2: Email, Output
  sheet.appendRow([email, imageUrl]);
}
```

### Decision Logic

```javascript
if (isAdmin) {
  addToAdminSheet(email, imageUrl);  // → Sheet2
} else {
  addToSheet(email, imageUrl);       // → Sheet1
}
```

---

## Setup Instructions

### 1. Update Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1XE5wwwzeruWI-P4fvMbs0JIV-TH-Un9wc1Jf1SbOYfA/edit
2. Go to **Extensions** → **Apps Script**
3. Replace the entire code with the updated `Code.gs`
4. **Save** the project
5. Click **Deploy** → **Manage deployments**
6. Click **Edit** (pencil icon)
7. Change **Version** to "New version"
8. Add description: "Added Sheet2 support for admin uploads"
9. Click **Deploy**
10. Copy the new URL (or use the same one)

### 2. Verify Sheet2 Exists

If Sheet2 doesn't exist, the script will automatically create it with the proper headers:
- Column A: "Email"
- Column B: "Output"

### 3. Test Admin Upload

1. Open the application
2. Double-click version info (bottom right)
3. Enter a test email: `test@example.com`
4. Upload a test image
5. Click "업로드"
6. Check **Sheet2** in your Google Sheets
7. Verify data appears in columns A and B

---

## Data Flow Diagram

```
┌─────────────────┐
│  User/Admin     │
│  Uploads Image  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   JavaScript    │
│  isAdmin flag   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Google Apps     │
│   Script API    │
└────┬───────┬────┘
     │       │
isAdmin=false │ isAdmin=true
     │       │
     ▼       ▼
┌────────┐ ┌────────┐
│ Sheet1 │ │ Sheet2 │
│ A-B-C-D│ │  A-B   │
└────────┘ └────────┘
```

---

## Mixpanel Tracking

Admin uploads are tracked separately with these additional properties:

```javascript
analytics.track('Admin Upload Completed', {
  'Recipient Email': email,
  'Target Sheet': 'Sheet2',  // ← New property
  // ... other properties
});
```

---

## Testing Checklist

### Before Deployment
- [ ] Updated Code.gs in Google Apps Script
- [ ] Created new deployment version
- [ ] Verified SPREADSHEET_ID is correct
- [ ] Sheet2 exists (or will be auto-created)

### Testing Regular User Upload
- [ ] Upload as regular user
- [ ] Check data appears in Sheet1
- [ ] Verify columns A, B, C, D are populated
- [ ] Check timestamp format

### Testing Admin Upload
- [ ] Double-click version info to open admin panel
- [ ] Enter recipient email
- [ ] Upload test image
- [ ] Check data appears in **Sheet2** (not Sheet1)
- [ ] Verify only columns A and B are populated
- [ ] No timestamp column in Sheet2

---

## Troubleshooting

### Admin uploads going to Sheet1
- Check that `isAdmin: true` is being sent in the API call
- Verify Code.gs has the updated logic
- Check Google Apps Script logs

### Sheet2 not found error
- The script should auto-create Sheet2
- Manually create Sheet2 and add headers: "Email", "Output"
- Redeploy the script

### Data in wrong columns
- Check the `addToAdminSheet` function in Code.gs
- Verify it's using: `sheet.appendRow([email, imageUrl])`
- Not: `sheet.appendRow([email, imageUrl, timestamp, imageUrl])`

---

## Migration Notes

### Existing Data
- Existing data in Sheet1 remains unchanged
- Admin uploads will start fresh in Sheet2
- No data migration needed

### Backwards Compatibility
- Regular user uploads continue to work exactly as before
- Only admin uploads are affected
- Sheet1 structure unchanged

---

## Security Considerations

### Admin Access
- Admin panel is hidden (double-click access)
- No authentication by default
- Consider adding password protection for production

### Data Separation
- Admin uploads are in separate sheet
- Easy to audit admin actions
- Clear separation of user vs admin data

---

## Future Enhancements

### Potential Additions
- [ ] Admin name/ID column in Sheet2
- [ ] Reason for upload column
- [ ] Bulk upload to Sheet2
- [ ] Admin activity log
- [ ] Approval workflow

---

## API Changes

### Updated API Call

```javascript
// Regular user upload
await api.uploadImage(email, file, false);  // → Sheet1

// Admin upload
await api.uploadImage(email, file, true);   // → Sheet2
```

### Request Payload

```json
{
  "email": "user@example.com",
  "fileName": "image.jpg",
  "fileData": "base64...",
  "mimeType": "image/jpeg",
  "isAdmin": true  // ← New parameter
}
```

---

## Quick Reference

| Upload Type | Sheet | Columns | Timestamp | Access |
|-------------|-------|---------|-----------|--------|
| **Regular User** | Sheet1 | A, B, C, D | ✅ Yes | Public form |
| **Admin** | Sheet2 | A, B | ❌ No | Hidden panel |

---

## Support

For issues with Sheet2 setup:
1. Check Google Apps Script logs
2. Verify deployment is updated
3. Test with simple upload
4. Check browser console for errors

---

**Important**: Don't forget to redeploy your Google Apps Script after updating Code.gs!

---

**Version**: 4.0  
**Last Updated**: October 24, 2025  
**Maintained By**: QANDA Development Team

