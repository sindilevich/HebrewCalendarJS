
/* KaluachJS - Kaluach Javascript Hebrew/civil calendar
 *   Version 1.00
 * Copyright (C) 5760,5761 (2000 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Requires kdate.js - Kaluach Javascript Hebrew date routines
 * Acknowledgment given to scripts by:
 *	 - Tomer and Yehuda Shiran (docjs.com)
 *   - Gordon McComb
 *   - irt.org
 *   - javascripter.net
 * Terms of use:
 *   - Permission will be granted to use this script on personal
 *     web pages. All that's required is that you please ask.
 *     (Of course if you want to send a few dollars, that's OK too :-)
 *   - Use on commercial web sites requires a $50 payment.
 * website: http://www.kaluach.net
 * email: abumami@kaluach.net
 */

var otherHolidays = 0;
var jewishHolidays = 1;
var civilHolidays = 0;

function selectLoad() {
	var now = new Date();
	var m = now.getMonth();
	var y = now.getYear();
	if(y < 1000)
		y += 1900;

	document.calendar_control.month.selectedIndex = m;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function selectCurrent() {
	var now = new Date();
	var y = now.getYear();
	var m = now.getMonth();
	if(y < 1000)
		y += 1900;

	document.calendar_control.month.selectedIndex = m;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function toggleOther(form) {
	otherHolidays = (otherHolidays == 1) ? 0 : 1;
	var y = parseInt(document.calendar_control.yr.value);
	var m = document.calendar_control.month.selectedIndex;
	doCal(m, y);
}

function selectNext() {
	var y = parseInt(document.calendar_control.yr.value);
	var m = document.calendar_control.month.selectedIndex;

	if(m < 11)
		m++;
	else {
		m = 0;
		y++;
	}

	document.calendar_control.month.selectedIndex = m;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function selectPrev() {
	var y = parseInt(document.calendar_control.yr.value);
	var m = document.calendar_control.month.selectedIndex;

	if(m > 0)
		m -= 1;
	else {
		m = 11;
		y -= 1;
	}

	document.calendar_control.month.selectedIndex = m;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function selectNextYear(num) {
	var y = parseInt(document.calendar_control.yr.value);
	var m = document.calendar_control.month.selectedIndex;
	y += num;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function selectPrevYear(num) {
	var y = parseInt(document.calendar_control.yr.value);
	var m = document.calendar_control.month.selectedIndex;
	y -= num;
	document.calendar_control.yr.value = y;
	doCal(m, y);
}

function selectForm(form) {
	var y = parseInt(form.yr.value);
	var m = form.month.selectedIndex;
	doCal(m, y);
}

function selectHolidays(form) {
	var y = parseInt(form.yr.value);
	var m = form.month.selectedIndex;
	var h = form.holidays.selectedIndex;
	if(h == 0) {
		jewishHolidays = 1;
		civilHolidays = 0;
	}
	else if(h == 1) {
		jewishHolidays = 0;
		civilHolidays = 1;
	}
	else if(h == 2) {
		jewishHolidays = 1;
		civilHolidays = 1;
	}
	else if(h == 3) {
		jewishHolidays = 0;
		civilHolidays = 0;
	}

	doCal(m, y);
}

function doCal(month, year) {
	var ret = calendar(month, year);
	var doc = parent.frames.result.document;
	doc.close();
	doc.open("text/html");
	var result = BuildLuachHTML(ret);
	doc.write(result);
	doc.close();
}

function calendar(selM, selY) {
	var m = selM + 1;
	var y = selY;
	var d = civMonthLength(m, y);
	var firstOfMonth = new Date (y, selM, 1);
	var startPos = firstOfMonth.getDay() + 1;
	var retVal = new Object();
	retVal[1] = startPos;
	retVal[2] = d;
	retVal[3] = m;
	retVal[4] = y;
	return (retVal);
}

function BuildLuachHTML(parms)  {
	var hdrSize = "+2";				// size of tables header font
	var border = 2;					// 3D height of table's border
	var cellspacing = 4;			// width of table's border
	var hdrHeight = 50;				// height of the table's header cell
	var dayCellHeight = 25;			// height of cells containing days of the week
	var dayColor = "darkred";		// color of font representing week days
	var hebColor = "darkblue";		// color of font representing Heb date
	var civColor = "darkgreen";		// color of font representing Civ date
	var cellWidth  = 80;			// width of columns in table
	var cellHeight = 55;			// height of day cells calendar
	var hebDate;
	var hebDay;
	var now = new Date();
	var tday = now.getDate();
	var tmonth = now.getMonth();
	var tyear = now.getYear();
	if(tyear < 1000)
		tyear += 1900;
	var cMonth = parms[3];
	var cYear = parms[4];
	var monthName = civMonth[cMonth];
	var lastDate = civMonthLength(cMonth, cYear);
	var hm;
	var hMonth;
	var hYear;

	// get starting Heb month in civil month
	hebDate = civ2heb(1, cMonth, cYear);
	hmS = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
	hMonth = eval(hmS.substring(0, hmS.indexOf(' ')));
	hYear = hmS.substring(hmS.indexOf(' ')+1, hmS.length);
	var start = hebMonth[hMonth+1] + ' ' + hYear;

	// get ending Heb month in civil month
	hebDate = civ2heb(lastDate, cMonth, cYear);
	hmE = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
	hMonth = eval(hmE.substring(0, hmE.indexOf(' ')));
	hYear = hmE.substring(hmE.indexOf(' ')+1, hmE.length);
	var end = hebMonth[hMonth+1] + ' ' + hYear;

	var hebSpan;
	// check if start and end Heb months are the same
	if(hmS == hmE)
		hebSpan = start;
	else
		hebSpan = start + ' / ' + end

    var result = '<html>';
	result += '<BODY bgColor=#c0c0c0><FONT face="Arial,Helvetica" size=2>';
    result += '<center><br>';

	// set up our table structure
	result += '<TABLE BORDER=' + border + ' CELLSPACING=' + cellspacing + '>';		// table settings
	result +=	 '<TH COLSPAN=7 HEIGHT=' + hdrHeight + ' align="center">';		// create table header cell
	result +=		'<FONT face="Arial" COLOR="' + civColor + '" SIZE=' + hdrSize + '>';	// set font for table header
	result +=			monthName + ' ' + cYear;
	result +=		'</FONT>';		// close table header's font settings
	result +=		'<FONT face="Arial"COLOR="' + hebColor + '" SIZE=' + '+1' + '>'; // set font for table header
	result +=			'&nbsp&nbsp ' + hebSpan;
	result +=		'</FONT>'; // close table header's font settings
	result +=	 '</TH>'; // close header cell

	// variables to hold constant settings
	var openCol = '<TD WIDTH=' + cellWidth + ' HEIGHT=' + dayCellHeight + '>';
	openCol += '<FONT face="Arial" COLOR="' + dayColor + '">';
	var closeCol = '</FONT></TD>';

	// create first row of table to set column width and specify week day
	result += '<TR ALIGN="center" VALIGN="center">';
	for (var dayNum = 1; dayNum < 8; ++dayNum) {
	        result += openCol + weekDay[dayNum] + closeCol;
	}
	result += '</TR>';
 
    var cell = 1
    var cDay = 1
    var row;
    for (row = 1; row <= 6; row++) {
        result+='<TR VALIGN="top">'
        for (col = 1; col <= 7; col++)  {

			// convert civil date to hebrew
			hebDate = civ2heb(cDay, cMonth, cYear);
			hebDay = eval(hebDate.substring(0, hebDate.indexOf(' ')));

			var hm = hebDate.substring(hebDate.indexOf(' ')+1, hebDate.length);
			var hMonth = eval(hm.substring(0, hm.indexOf(' ')));

	        if (cell < parms[1])
				result += '<TD></TD>';
	        else {

				var moed = "";
				if(jewishHolidays)
					moed = moadim(cDay, cMonth, cYear, hebDay, hMonth, col);
				var holiday = "";
				if(civilHolidays)
					holiday = holidays(cDay, cMonth, cYear);

				var bg;
		        if((cDay == tday) && (parms[3] == (tmonth+1)) && (parms[4] == tyear))
					// highight the current day
					bg = 'bgColor=#c0d0c0'
				else if (moed != "")
					// highlight Heb holiday
					bg = 'bgColor=#d0c0d0'
				else if (holiday != "") {
					// highlight civil holiday
					bg = 'bgColor=#d0c0c0'
//					moed = holiday;
				}
				else
					// no highlight
					bg = '';

				// assemble the contents of our day cell
				result += '<TD HEIGHT=' + cellHeight + ' align="center" ' + bg + '>';
				result +=   '<table BORDER=0 COLS=2 WIDTH=' + cellWidth + 'HEIGHT=' + cellHeight + ' >';
				result +=     '<tr>';
				result +=       '<td>';
				result +=         '<FONT face="Arial" COLOR="' + civColor + '">';
				result +=           cDay;
				result +=         '</font>';
				result +=       '</td>';
				result +=       '<td>';
				result +=         '<FONT face="Arial" COLOR="' + hebColor + '">';
				result +=           '<div align=right>' + hebDay + '</div>';
				result +=         '</FONT>';
				result +=       '</td>';
				result +=     '</tr>';
				result +=   '</table>';
				result +=   '<FONT face="Arial" size=-2>'
				if (moed != "")
					result += moed;
				if (moed != "" && holiday != "")
					result += '<br>';
				if (holiday != "")
					result += holiday;
				result +=   '</FONT>'
				result += '</TD>';

		        cDay++
            }

            if (cDay <= lastDate)
                cell++
            else
                break;
        }

        result += '</TR>'
        if(cDay > parms[2])
                break;
    }

    result += '</table>'
    result += '<font face="Arial" size=-1><br>Copyright &copy; 5760,5761 (2000 CE), Abu Mami and Yisrael Hersch. All rights reserved.<br>'
    result += 'email: <a href="mailto:abumami@kaluach.net"> abumami@kaluach.net</a> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp web site: <a href="http://www.kaluach.net">http://www.kaluach.net</a></font>'
    result += '</center></body></html>'
    return result;
}
