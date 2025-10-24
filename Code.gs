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
    
  } catch (error) {
    Logger.log('Sheet error: ' + error.toString());
    throw error;
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
    
  } catch (error) {
    Logger.log('Admin sheet error: ' + error.toString());
    throw error;
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
