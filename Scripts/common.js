var NISAN = 1;
var IYYAR = 2;
var SIVAN = 3;
var TAMUZ = 4;
var AV = 5;
var ELUL = 6;
var TISHREI = 7;
var CHESHVAN = 8;
var KISLEV = 9;
var TEVET = 10;
var SHVAT = 11;
var ADAR_I = 12;
var ADAR_II = 13;

/* Days from sunday prior to start of hebrew calendar to mean
conjunction of tishrei in hebrew YEAR 
*/
function hebrew_elapsed_days(/*int*/year)
{
    var yearl, m_elapsed, p_elapsed, h_elapsed, parts, day, alt_day;

	yearl = year;
	m_elapsed = 235 * Math.floor((yearl - 1) / 19) +
        12 * Math.floor((yearl - 1) % 19) +
        Math.floor(((Math.floor((yearl - 1) % 19) * 7) + 1) / 19);

	p_elapsed = 204 + (793 * (m_elapsed % 1080));

	h_elapsed = 5 + (12 * m_elapsed) +
        793 * Math.floor(m_elapsed / 1080) +
        Math.floor(p_elapsed / 1080);

	parts = (p_elapsed % 1080) + 1080 * (h_elapsed % 24);

	day = 1 + 29 * m_elapsed + Math.floor(h_elapsed / 24);

	if ((parts >= 19440) ||
        ((2 == (day % 7)) && (parts >= 9924) && !(LEAP_YR_HEB(year))) ||
        ((1 == (day % 7)) && (parts >= 16789) && LEAP_YR_HEB(year - 1)))
		alt_day = day + 1;
	else
		alt_day = day;

	if ((alt_day % 7) == 0 ||
        (alt_day % 7) == 3 ||
        (alt_day % 7) == 5)
		return Math.floor(alt_day + 1);
	else
		return Math.floor(alt_day);
}

/* Number of days in the hebrew YEAR */
function days_in_heb_year( /*int*/year)
{
	return (hebrew_elapsed_days(year + 1) - hebrew_elapsed_days(year));
}

/* true if Cheshvan is long in hebrew YEAR */
function long_cheshvan( /*int*/year)
{
	return ((days_in_heb_year(year) % 10) == 5);
}

/* true if Cheshvan is long in hebrew YEAR */
function short_kislev( /*int*/year)
{
	return ((days_in_heb_year(year) % 10) == 3);
}

/* convert hebrew date to absolute date */
/*Absolute date of Hebrew DATE.
The absolute date is the number of days elapsed since the (imaginary)
Gregorian date Sunday, December 31, 1 BC. */
function hebrew2abs(/*date_t*/d)
{
	var m;
	var tempabs = d.dd;
	var ret;

	if (d.mm < TISHREI)
	{
		for (m = TISHREI; m <= MONTHS_IN_HEB(d.yy); m++)
			tempabs += max_days_in_heb_month(m, d.yy);

		for (m = NISAN; m < d.mm; m++)
			tempabs += max_days_in_heb_month(m, d.yy);
	}
	else
	{
		for (m = TISHREI; m < d.mm; m++)
			tempabs += max_days_in_heb_month(m, d.yy);
	}


	ret = hebrew_elapsed_days(d.yy) - 1373429 + tempabs;
	return ret;
}

function LEAP_YR_HEB(x)
{
	return ((1 + (x) * 7) % 19 < 7 ? 1 : 0);
}

function MONTHS_IN_HEB(x)
{
	return (LEAP_YR_HEB(x) ? 13 : 12);
}

function LANGUAGE(str)
{
	return (ashkenazis_sw && (str)[1] ? ((str)[1]) : ((str)[0]));
}

function LANGUAGE2(str)
{
	return (iso8859_8_sw && (str)[2] ? ((str)[2]) : (ashkenazis_sw && (str)[1] ? ((str)[1]) : ((str)[0])));
}