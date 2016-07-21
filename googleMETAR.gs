// For use inside of Google Sheets (Google Sheet >> Tools >> Script editor)
// Function to collect METAR string and append line (as new row) to specific worksheet

//// Note: It's possible to assign 'trigger(s)' to this script (eg, run every hour) via
//// Script editor >> Resources >> 'All your triggers'

// Removes whitespace from string(s)
if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function metar() 
{
  // Enter 4-letter airport code in currentStation string
  var currentStation = ''
  var dt = new Date();
  var utcDate = dt.toUTCString();
  
// Uncomment one of the following 'ss' lines to choose which spreadsheet to modify
//  var ss = SpreadsheetApp.getActiveSheet();
//  var ss = SpreadsheetApp.openById("");
//  var ss = SpreadsheetApp.openByUrl("");
  var sheet = ss.getSheets()[0];
  
  var url = 'http://weather.noaa.gov/pub/data/observations/metar/stations/' + currentStation + '.TXT';
  var report = UrlFetchApp.fetch(url).getContentText();
  sheet.appendRow([utcDate, report.trim()]);
}

