// For use inside of Google Sheets (Google Sheet >> Tools >> Script editor)
// Function to collect METAR string and append line (as new row) to specific worksheet

//// Note: It's possible to assign 'trigger(s)' to this script (eg, run every hour) via
//// Script editor >> Resources >> 'All your triggers'

//// Note: As of June 2016, the weather.noaa.gov site has been discontinued.
//// See http://aviationweather.gov/dataserver for updates/new schema.


function parseXml(currentStation) 
{
  var url = 'http://aviationweather.gov/adds/dataserver_current/httpparam?datasource=metars&requestType=retrieve&format=xml&mostRecentForEachStation=constraint&hoursBeforeNow=1.25&stationString=' + currentStation
  var xml = UrlFetchApp.fetch(url).getContentText();
  var document = XmlService.parse(xml);
  var root = document.getRootElement();
  var atom = XmlService.getNamespace('http://www.w3.org/2005/Atom');

  var report = root.getChild('data').getChild('METAR').getChild('raw_text').getText();
  return report
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
  
  sheet.appendRow([utcDate, parseXml(currentStation)]);
}
