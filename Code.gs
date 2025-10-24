// Google Apps Script Code
// Copy this entire code to your Google Apps Script project

// ⚠️ IMPORTANT: Replace this with your Google Sheet ID
const SPREADSHEET_ID = '1XE5wwwzeruWI-P4fvMbs0JIV-TH-Un9wc1Jf1SbOYfA';
const SHEET_NAME = 'Sheet1'; // Regular user uploads
const ADMIN_SHEET_NAME = 'Sheet2'; // Admin uploads

// Test function to verify deployment (GET request)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Google Apps Script is working!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// This function handles POST requests from the web app
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    const email = data.email;
    const fileName = data.fileName;
    const fileData = data.fileData;
    const mimeType = data.mimeType;
    const isAdmin = data.isAdmin || false; // Check if this is an admin upload
    
    // Debug logging
    Logger.log('=== Upload Request ===');
    Logger.log('Email: ' + email);
    Logger.log('FileName: ' + fileName);
    Logger.log('isAdmin: ' + isAdmin);
    Logger.log('Target Sheet: ' + (isAdmin ? 'Sheet2' : 'Sheet1'));
    
    // Upload image to Google Drive
    const imageUrl = uploadImageToDrive(fileName, fileData, mimeType);
    
    // Add data to appropriate sheet
    if (isAdmin) {
      Logger.log('>>> Routing to Sheet2 (Admin)');
      addToAdminSheet(email, imageUrl);
    } else {
      Logger.log('>>> Routing to Sheet1 (Regular)');
      addToSheet(email, imageUrl);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, imageUrl: imageUrl, targetSheet: isAdmin ? 'Sheet2' : 'Sheet1' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Upload image to Google Drive
function uploadImageToDrive(fileName, base64Data, mimeType) {
  try {
    // Decode base64 data
    const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), mimeType, fileName);
    
    // Create file in Drive
    const file = DriveApp.createFile(blob);
    
    // Make the file publicly accessible
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Get the file URL
    const fileUrl = file.getUrl();
    
    Logger.log('File uploaded: ' + fileUrl);
    return fileUrl;
    
  } catch (error) {
    Logger.log('Upload error: ' + error.toString());
    throw error;
  }
}

// Add data to Google Sheets (Sheet1 - Regular users)
// Format: Column A = Email, Column B = Image URL, Column C = Timestamp, Column D = Output
function addToSheet(email, imageUrl) {
  try {
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Try to get sheet by name, if not found use first sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // If sheet doesn't exist, use the first sheet
      sheet = ss.getSheets()[0];
      Logger.log('Sheet "' + SHEET_NAME + '" not found, using first sheet: ' + sheet.getName());
    }
    
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Append row with data: Email, Image URL, Timestamp, Output (Column D)
    sheet.appendRow([email, imageUrl, timestamp, imageUrl]);
    
    Logger.log('Data added to Sheet1: ' + email);
    
    // Send notification to admin about new Sheet1 upload
    sendSheet1Notification(email, imageUrl);
    
  } catch (error) {
    Logger.log('Sheet error: ' + error.toString());
    throw error;
  }
}

// Send notification to admin when regular user uploads to Sheet1
function sendSheet1Notification(userEmail, imageUrl) {
  try {
    const adminEmail = 'dino.lee@mathpresso.com';
    const subject = '[알림] 새로운 이미지 업로드';
    const body = `
새로운 사용자 업로드가 있습니다.

사용자 이메일: ${userEmail}
이미지: ${imageUrl}

업로드 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}

Sheet1에서 확인하세요.
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: subject,
      body: body,
      name: '낙서지우기 사용자 알림'
    });
    
    Logger.log('Sheet1 notification sent to admin: ' + adminEmail);
    console.log('✅ Sheet1 admin notification sent!');
    
  } catch (error) {
    Logger.log('Sheet1 notification failed: ' + error.toString());
    console.error('❌ Sheet1 notification failed: ' + error.toString());
  }
}

// Add data to Sheet2 (Admin uploads)
// Format: Column A = Email, Column B = Output (Image URL)
function addToAdminSheet(email, imageUrl) {
  try {
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Get Sheet2 for admin uploads
    let sheet = ss.getSheetByName(ADMIN_SHEET_NAME);
    
    if (!sheet) {
      // If Sheet2 doesn't exist, create it
      sheet = ss.insertSheet(ADMIN_SHEET_NAME);
      // Add headers
      sheet.appendRow(['Email', 'Output']);
      Logger.log('Created new sheet: ' + ADMIN_SHEET_NAME);
    }
    
    // Append row with data: Email (Column A), Output (Column B)
    sheet.appendRow([email, imageUrl]);
    
    Logger.log('Data added to Sheet2 (Admin): ' + email);
    
    // Send email notification
    sendAdminUploadNotification(sheet, email, imageUrl);
    
  } catch (error) {
    Logger.log('Admin sheet error: ' + error.toString());
    throw error;
  }
}

// Send email notification after admin upload
function sendAdminUploadNotification(sheet, recipientEmail, imageUrl) {
  try {
    // Get sender email from cell C1
    const senderEmail = sheet.getRange('C1').getValue();
    
    // If C1 is empty, use default
    const fromEmail = senderEmail || 'dino.lee@mathpresso.com';
    
    console.log('📧 Preparing to send email...');
    console.log('To: ' + recipientEmail);
    console.log('From: ' + fromEmail);
    console.log('URL: ' + imageUrl);
    
    // Email configuration for recipient
    const subject = '낙서지우기 결과물';
    const body = imageUrl;
    
    // Send email to recipient
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: body,
      name: '낙서지우기',
      replyTo: fromEmail
    });
    
    Logger.log('Email sent to: ' + recipientEmail + ' from: ' + fromEmail);
    console.log('✅ Email sent successfully to recipient!');
    
    // Send notification to admin (dino.lee@mathpresso.com)
    const adminEmail = 'dino.lee@mathpresso.com';
    const adminSubject = '[알림] 낙서지우기 업로드 완료';
    const adminBody = `
새로운 이미지가 업로드되었습니다.

수신자: ${recipientEmail}
이미지: ${imageUrl}

업로드 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
    `;
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: adminSubject,
      body: adminBody,
      name: '낙서지우기 관리자 알림'
    });
    
    Logger.log('Notification sent to admin: ' + adminEmail);
    console.log('✅ Admin notification sent!');
    
  } catch (error) {
    // Don't throw error - just log it so upload still succeeds even if email fails
    Logger.log('Email sending failed: ' + error.toString());
    console.error('❌ Email failed: ' + error.toString());
  }
}

// Test function (optional - use this to test your setup)
function testUpload() {
  const testData = {
    email: 'test@example.com',
    fileName: 'test.png',
    fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // 1x1 pixel PNG
    mimeType: 'image/png'
  };
  
  const imageUrl = uploadImageToDrive(testData.fileName, testData.fileData, testData.mimeType);
  addToSheet(testData.email, imageUrl);
  
  Logger.log('Test complete! Check your sheet.');
}

// Test admin upload
function testAdminUpload() {
  const testData = {
    email: 'admin@example.com',
    fileName: 'admin-test.png',
    fileData: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    mimeType: 'image/png'
  };
  
  const imageUrl = uploadImageToDrive(testData.fileName, testData.fileData, testData.mimeType);
  addToAdminSheet(testData.email, imageUrl);
  
  Logger.log('Admin test complete! Check Sheet2.');
}

// NEW: Test email to your actual email
function testEmailToYou() {
  try {
    MailApp.sendEmail({
      to: 'lee880728@gmail.com',
      subject: '낙서지우기 결과물',
      body: 'https://drive.google.com/test-url',
      name: '낙서지우기',
      replyTo: 'dino.lee@mathpresso.com'
    });
    Logger.log('✅ Test email sent to lee880728@gmail.com');
  } catch (error) {
    Logger.log('❌ Email failed: ' + error.toString());
  }
}
