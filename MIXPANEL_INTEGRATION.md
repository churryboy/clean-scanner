# Mixpanel Analytics Integration Guide

**Project**: QANDA Image Upload System  
**Version**: 4.0  
**Commit**: 829fcf5980c867e5d6d75d068f6c50c2dc9bf983  
**Date**: October 24, 2025

---

## Overview

Mixpanel analytics has been fully integrated into the QANDA Image Upload System to track user behavior, measure performance, and gain insights into how students use the application.

---

## Configuration

### Environment Variables (.env)

```env
# Mixpanel Configuration
MIXPANEL_TOKEN=296b1b87e332df523af59a12b0c04c45

# Application Configuration
APP_VERSION=4.0
APP_COMMIT=829fcf5980c867e5d6d75d068f6c50c2dc9bf983
APP_LANGUAGE=ko
```

### Configuration File (config.js)

```javascript
const CONFIG = {
    MIXPANEL_TOKEN: '296b1b87e332df523af59a12b0c04c45',
    APP_VERSION: '4.0',
    APP_COMMIT: '829fcf5',
    APP_LANGUAGE: 'ko'
};
```

---

## Tracked Events

### 1. Page Viewed
**When**: On initial page load  
**Properties**:
- `Page`: 'Image Upload'
- `URL`: Current URL
- `Timestamp`: ISO timestamp

**Purpose**: Track total page views and entry points

---

### 2. Email Input Focused
**When**: User clicks/focuses on email input field  
**Properties**:
- `Timestamp`: ISO timestamp

**Purpose**: Measure engagement and form interaction

---

### 3. Upload Area Clicked
**When**: User clicks the upload area  
**Properties**:
- `Method`: 'Click'
- `Timestamp`: ISO timestamp

**Purpose**: Track how users initiate file selection

---

### 4. Upload Area Activated
**When**: User presses Enter/Space on upload area (keyboard accessibility)  
**Properties**:
- `Method`: 'Keyboard'
- `Key`: Key pressed ('Enter' or ' ')
- `Timestamp`: ISO timestamp

**Purpose**: Measure keyboard accessibility usage

---

### 5. File Drag Started
**When**: User drags a file over the upload area  
**Properties**:
- `Method`: 'Drag and Drop'
- `Timestamp`: ISO timestamp

**Purpose**: Track drag-and-drop feature usage

---

### 6. File Dropped
**When**: User drops a file into the upload area  
**Properties**:
- `Method`: 'Drag and Drop'
- `File Count`: Number of files dropped
- `Timestamp`: ISO timestamp

**Purpose**: Measure successful drag-and-drop interactions

---

### 7. File Selected
**When**: User successfully selects a valid file  
**Properties**:
- `File Name`: Name of the selected file
- `File Size`: Size in bytes
- `File Type`: MIME type
- `File Size MB`: Size in megabytes (formatted)
- `Timestamp`: ISO timestamp

**Purpose**: Understand file characteristics and user behavior

---

### 8. File Validation Failed
**When**: User selects an invalid file (wrong type or too large)  
**Properties**:
- `Error`: Error message (Korean)
- `File Size`: Size in bytes
- `File Type`: MIME type
- `Timestamp`: ISO timestamp

**Purpose**: Identify validation issues and educate users

---

### 9. Form Validation Failed
**When**: User tries to submit without required fields  
**Properties**:
- `Has Email`: Boolean
- `Has File`: Boolean
- `Timestamp`: ISO timestamp

**Purpose**: Track form completion issues

---

### 10. Upload Started
**When**: User clicks submit and upload begins  
**Properties**:
- `Email`: User's email address
- `File Name`: Name of uploaded file
- `File Size`: Size in bytes
- `File Type`: MIME type
- `Timestamp`: ISO timestamp

**Purpose**: Track upload initiation and user identification

**User Identification**: Email is used as unique identifier

---

### 11. Upload Completed ✅
**When**: File is successfully uploaded to Google Sheets  
**Properties**:
- `Email`: User's email address
- `File Name`: Name of uploaded file
- `File Size`: Size in bytes
- `File Type`: MIME type
- `Duration (ms)`: Upload duration in milliseconds
- `Duration (s)`: Upload duration in seconds (formatted)
- `Success`: true
- `Timestamp`: ISO timestamp

**Purpose**: Measure success rate and performance

---

### 12. Upload Failed ❌
**When**: Upload fails due to an error  
**Properties**:
- `Email`: User's email address
- `File Name`: Name of file (or 'unknown')
- `Error Message`: Error details
- `Duration (ms)`: Time until failure
- `Duration (s)`: Time until failure (formatted)
- `Success`: false
- `Timestamp`: ISO timestamp

**Purpose**: Track errors and improve reliability

---

## Super Properties

Super properties are automatically included with every event:

```javascript
{
    'App Version': '4.0',
    'App Commit': '829fcf5',
    'App Language': 'ko',
    'Design System': 'QANDA v4.0',
    'Platform': 'Web'
}
```

---

## User Identification

### User Identity
Users are identified by their **email address** when they submit an upload.

```javascript
analytics.identify(email);
```

### User Properties (People)

```javascript
{
    '$email': 'user@example.com',
    '$last_seen': '2025-10-24T...',
    'Last Upload': '2025-10-24T...'
}
```

---

## Analytics Module API

### Initialize
```javascript
analytics.init();
```

### Track Event
```javascript
analytics.track('Event Name', {
    'Property 1': 'value',
    'Property 2': 123
});
```

### Identify User
```javascript
analytics.identify(userId);
```

### Set User Properties
```javascript
analytics.setPeople({
    '$email': 'user@example.com',
    'Custom Property': 'value'
});
```

---

## Event Flow

### Typical User Journey

```
1. Page Viewed
   ↓
2. Email Input Focused
   ↓
3. Upload Area Clicked / Upload Area Activated
   ↓
4. File Selected (or File Validation Failed)
   ↓
5. Upload Started
   ↓
6. Upload Completed ✅ (or Upload Failed ❌)
```

### Alternative Flow (Drag & Drop)

```
1. Page Viewed
   ↓
2. Email Input Focused
   ↓
3. File Drag Started
   ↓
4. File Dropped
   ↓
5. File Selected (or File Validation Failed)
   ↓
6. Upload Started
   ↓
7. Upload Completed ✅ (or Upload Failed ❌)
```

---

## Key Metrics to Monitor

### Conversion Funnel
1. **Page Views** → Total visitors
2. **Email Input Focused** → Engagement rate
3. **File Selected** → Intent to upload
4. **Upload Started** → Conversion start
5. **Upload Completed** → Success rate

### Performance Metrics
- **Average Upload Duration**: Track `Duration (s)` property
- **Success Rate**: `Upload Completed` / `Upload Started`
- **Error Rate**: `Upload Failed` / `Upload Started`

### User Behavior
- **Click vs Drag-and-Drop**: Compare usage patterns
- **Keyboard Accessibility**: Track `Upload Area Activated` events
- **File Types**: Most common file types uploaded
- **File Sizes**: Average file size distribution

### Error Analysis
- **Validation Errors**: Track `File Validation Failed` events
- **Upload Errors**: Analyze `Upload Failed` error messages
- **Form Errors**: Monitor `Form Validation Failed` patterns

---

## Mixpanel Dashboard Recommendations

### Key Reports

1. **Conversion Funnel**
   ```
   Page Viewed → Email Input Focused → File Selected → 
   Upload Started → Upload Completed
   ```

2. **Upload Success Rate**
   ```
   (Upload Completed / Upload Started) * 100
   ```

3. **Average Upload Time**
   ```
   AVG(Upload Completed.Duration (s))
   ```

4. **File Type Distribution**
   ```
   GROUP BY File Selected.File Type
   ```

5. **Error Frequency**
   ```
   COUNT(Upload Failed) GROUP BY Error Message
   ```

6. **User Retention**
   ```
   Track unique users by email over time
   ```

---

## Privacy & Compliance

### Data Collection

**Personal Information Collected:**
- Email addresses (for user identification)

**Usage Data Collected:**
- File names (may contain personal information)
- File sizes and types
- Upload timestamps
- Error messages

### Recommendations

1. **Update Privacy Policy**
   - Disclose Mixpanel analytics usage
   - Explain data collection and purpose
   - Provide opt-out mechanism if required

2. **GDPR Compliance** (if applicable)
   - Implement cookie consent banner
   - Allow users to opt-out of tracking
   - Provide data deletion requests

3. **Student Privacy** (중고등학생)
   - Be transparent about data collection
   - Ensure compliance with local education privacy laws
   - Consider anonymizing file names

---

## Testing Mixpanel Integration

### Manual Testing

1. **Open Browser Console**
   ```
   Look for: "📊 Mixpanel initialized successfully"
   ```

2. **Perform Actions**
   - Each action should log: "📊 Event tracked: [Event Name]"

3. **Check Mixpanel Dashboard**
   - Go to mixpanel.com
   - Navigate to Live View
   - Verify events are appearing in real-time

### Test Checklist

- [ ] Page view tracked on load
- [ ] Email focus tracked
- [ ] Upload area click tracked
- [ ] File selection tracked
- [ ] File validation errors tracked
- [ ] Form validation errors tracked
- [ ] Upload start tracked
- [ ] Upload success tracked (with duration)
- [ ] Upload failure tracked (with error)
- [ ] User identified by email
- [ ] Super properties included
- [ ] All properties have correct values

---

## Troubleshooting

### Events Not Appearing

1. **Check Console**
   ```javascript
   // Should see:
   📊 Mixpanel initialized successfully
   📊 Event tracked: [Event Name] {...}
   ```

2. **Verify Token**
   ```javascript
   console.log(CONFIG.MIXPANEL_TOKEN);
   // Should show: 296b1b87e332df523af59a12b0c04c45
   ```

3. **Check Network Tab**
   - Look for requests to `api.mixpanel.com`
   - Verify 200 OK responses

4. **Ad Blockers**
   - Some ad blockers block Mixpanel
   - Test in incognito mode
   - Whitelist mixpanel.com

### Debug Mode

Enable debug mode in config.js:
```javascript
mixpanel.init(CONFIG.MIXPANEL_TOKEN, {
    debug: true,  // Change to true
    // ...
});
```

---

## File Structure

```
/image-upload-simple
  ├── .env                    # Environment variables (Mixpanel token)
  ├── .gitignore              # Ignore .env file
  ├── config.js               # Configuration with Mixpanel token
  ├── index.html              # Mixpanel SDK included
  ├── app.js                  # Analytics module and event tracking
  ├── MIXPANEL_INTEGRATION.md # This file
  └── ...
```

---

## Security Best Practices

### Protecting the Token

1. **Never commit .env to git**
   ```bash
   # Already in .gitignore
   .env
   ```

2. **Use environment variables in production**
   ```javascript
   // For server-rendered apps:
   const token = process.env.MIXPANEL_TOKEN;
   ```

3. **Rotate token if exposed**
   - Go to Mixpanel project settings
   - Generate new token
   - Update .env file

### Client-Side Security

**Note**: Since this is a client-side application, the Mixpanel token will be visible in the browser. This is acceptable because:

1. Mixpanel tokens are **project-specific**, not account-specific
2. They only allow sending events, not reading data
3. Mixpanel has rate limiting and abuse protection

However, for additional security:
- Monitor for unusual activity in Mixpanel
- Use Mixpanel's IP allowlist feature if needed
- Implement backend validation for critical events

---

## Future Enhancements

### Recommended Additions

1. **A/B Testing**
   ```javascript
   mixpanel.track('Experiment Viewed', {
       'Variant': 'A',
       'Experiment': 'Button Color Test'
   });
   ```

2. **Cohort Analysis**
   - Track user cohorts (e.g., by school, grade)
   - Analyze retention by cohort

3. **Feature Flags**
   - Use Mixpanel for feature rollouts
   - Track feature usage

4. **Session Tracking**
   ```javascript
   analytics.track('Session Started');
   // Track session duration
   ```

5. **Error Tracking Integration**
   - Integrate with Sentry or similar
   - Link Mixpanel events to error reports

---

## Resources

### Documentation
- [Mixpanel JavaScript SDK](https://developer.mixpanel.com/docs/javascript)
- [Mixpanel Best Practices](https://developer.mixpanel.com/docs/best-practices)
- [Event Naming Conventions](https://developer.mixpanel.com/docs/naming-conventions)

### Mixpanel Dashboard
- Project: QANDA Image Upload System
- Token: 296b1b87e332df523af59a12b0c04c45
- Dashboard: [https://mixpanel.com](https://mixpanel.com)

---

## Support

For questions about Mixpanel integration:
- **Team**: QANDA Development Team
- **Analytics Lead**: [Contact Info]
- **Documentation**: This file

---

**Version**: 1.0  
**Last Updated**: October 24, 2025  
**Maintained By**: QANDA Development Team

---

*Analytics tracking follows QANDA Design System principles and respects user privacy.*

