#!/usr/bin/python

import time
import os
import string
import sys
import urllib

#BASE_URL = 'http://weather.noaa.gov/pub/data/observations/metar/stations'
CURRENT_STATION = ''

URL = 'http://weather.noaa.gov/pub/data/observations/metar/stations/' + CURRENT_STATION + '.TXT'

while True:
    time.sleep(65)
    try:
        urlh = urllib.urlopen(URL)
        report = ''

        for line in urlh:
            if line.startswith(CURRENT_STATION):
                report = line.strip()
                print report
                with open(CURRENT_STATION+'.txt', 'a') as f:
                    f.write(report + '\n')
                break
 
                if not report:
                    print 'No data for ',CURRENT_STATION,'\n\n'
    except Exception as e:
        print str(e)
 
