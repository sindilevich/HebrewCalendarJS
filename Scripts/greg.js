function LEAP(x)
{
    return (!((x) % 4) && (((x) % 100) || !((x) % 400)));
}

function DAYS_IN(x)
{
	return (LEAP((x)) ? 366 : 365);
}

var JAN = 1;
var FEB = 2;
var MAR = 3;
var APR = 4;
var MAY = 5;
var JUN = 6;
var JUL = 7;
var AUG = 8;
var SEP = 9;
var OCT = 10;
var NOV = 11;
var DEC = 12;

var SUN = 0;
var MON = 1;
var TUE = 2;
var WED = 3;
var THU = 4;
var FRI = 5;
var SAT = 6;

/** Returns the absolute date of the DAYNAME on or before absolute DATE.
* DAYNAME=0 means Sunday, DAYNAME=1 means Monday, and so on.


* Note: Applying this function to d+6 gives us the DAYNAME on or after an
* absolute day d.  Similarly, applying it to d+3 gives the DAYNAME nearest to
* absolute date d, applying it to d-1 gives the DAYNAME previous to absolute
* date d, and applying it to d+7 gives the DAYNAME following absolute date d.

**/
function day_on_or_before( /*int*/day_of_week, /*long*/date)
{
	return Math.floor(date - ((date - day_of_week) % 7));
}

/*
* The number of days elapsed between the Gregorian date 12/31/1 BC and DATE.
* The Gregorian date Sunday, December 31, 1 BC is imaginary.
*/
function /*long int*/greg2abs( /*date_t*/d)			/* "absolute date" */
{
	return Math.floor(dayOfYear(d)	/* days this year */
			+ 365 * (d.yy - 1)	/* + days in prior years */
			+ Math.floor((d.yy - 1) / 4	/* + Julian Leap years */
				- (d.yy - 1) / 100	/* - century years */
				+ (d.yy - 1) / 400)); /* + Gregorian leap years */
}

/*
*Return the day number within the year of the date DATE.
*For example, dayOfYear({1,1,1987}) returns the value 1
*while dayOfYear({12,31,1980}) returns 366.
*/
function /*int*/dayOfYear( /*date_t*/d)
{
	var dOY = d.dd + 31 * (d.mm - 1);
	if (d.mm > FEB)
	{
		dOY -= (4 * d.mm + 23) / 10;
		if (LEAP(d.yy))
			dOY++;
	}
	return Math.floor(dOY);
}