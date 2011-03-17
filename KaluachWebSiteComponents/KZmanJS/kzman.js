/* kzman.js - Kaluach halachic times Javascript routines
 *   Version 0.01 (initial beta release)
 *   Version 0.02 (fixed bug in display of Shabbat times)
 *   Version 1.00 (fixed bug displaying locations at 0 deg lat/lon)
 *   Version 2.01 (handle invalid sunrise/set, different knissat shabbat times)
 * Copyright (C) 5760,5761 (2000 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Acknowledgment given to scripts by:
 *   - P. Lutus <lutusp@arachnoid.com>
 *     available under the www.arachnoid.com CareWare program
 *	 - Tomer and Yehuda Shiran (docjs.com)
 *   - irt.org
 *   - javascripter.net
 * Permission will be granted to use this script on your web page
 *   if you wish. All that's required is that you please ask.
 *   (Of course if you want to send a few dollars, that's OK too :-)
 * website: http://www.kaluach.net
 * email: abumami@kaluach.org
 */


var month = 0, day = 0, year = 0;
var lat = 0, lng = 0;	// sun's location
var latd = -1, latm = 0;// lat on earth
var lngd = -1, lngm = 0;// long on earth
var ns = 'N', ew = 'E';	// hemisphere
var dst = 0;			// daylight saving time
var ampm = 1;			// am/pm or 24 hour display


function leap(y) {
	return ((y % 400 == 0) || (y % 100 != 0 && y % 4 == 0));
}

function civMonthLength(month, year) {
	if(month == 2)
		return 28 + leap(year);
	else if(month == 4 || month == 6 || month == 9 || month == 11)
	   return 30;
	else
		return 31;
}

function set_ampm(val) {
	ampm = val;
	doit("");
}

function set_dst() {
	dst = document.data.dst.checked;
	doit("");
}


function change_year(num) {
	var y = parseInt(document.data.year.value);
	y += num;
	document.data.year.value = y;
	year = y;
	date_vars_doit();
}

function list_pos(w) {

	var str, place, desc
	var i;

	i = w.options.selectedIndex;
	with(document.data) { // reset all prior selections
		israel_city.options[0].selected = 1;
		diaspora_city.options[0].selected = 1;
	}
	w.options[i].selected = 1; // restore current selection
	with (w) {
		desc = options[0].text;
		str = options[options.selectedIndex].value;
		place = options[options.selectedIndex].text;
		if(i == 0)
			document.data.placename.value = '';
	}

	i = str.indexOf(",");
	ns = str.substring(0, i);
	str = str.substring(i+1, str.length);

	i = str.indexOf(",");
	latd = eval(str.substring(0, i));
	str = str.substring(i+1, str.length);

	i = str.indexOf(",");
	latm = eval(str.substring(0, i));
	str = str.substring(i+1, str.length);

	i = str.indexOf(",");
	ew = str.substring(0, i);
	str = str.substring(i+1, str.length);

	i = str.indexOf(",");
	lngd = eval(str.substring(0, i));
	str = str.substring(i+1, str.length);

	i = str.indexOf(",");
	lngm = eval(str.substring(0, i));

	var tz = eval(str.substring(i+1, str.length));

	if((latd != -1) && (lngd != -1)) {
		document.data.tz.options[12+tz].selected = 1;
		doit("(" + desc + ") " + place);
	}

}

function man_pos() {

	latd = Math.abs(eval(document.data.latd.value));
	latm = Math.abs(eval(document.data.latm.value));
	ns = (document.data.lats[1].checked) ? 'S' : 'N';

	lngd = Math.abs(eval(document.data.lngd.value));
	lngm = Math.abs(eval(document.data.lngm.value));
	ew = (document.data.lngs[1].checked) ? 'E' : 'W';

	var tz = - (12 - document.data.tz.options.selectedIndex);
	document.data.tz.options[12+tz].selected = 1;
	doit("(manual entry)");
	return 1;
}

function doit(title) {

	var d, m, y;
	var nsi, ewi;
	var i;
 
	if(title != "")
		document.data.placename.value = title;
 
	document.data.latd.value = latd;
	document.data.latm.value = latm;
	i = ns.indexOf("N");
	nsi = (i != -1) ? 0 : 1;
	document.data.lats[nsi].checked = 1;
 
	document.data.lngd.value = lngd;
	document.data.lngm.value = lngm;
	i = ew.indexOf("W");
	ewi = (i != -1) ? 0 : 1;
	document.data.lngs[ewi].checked = 1;
 
	d = day + 1;
	m = month + 1;
	y = year;
 
	var adj = - (12 - document.data.tz.options.selectedIndex);
	adj += dst;

	var time;
	var sunrise, sunset;
	var shaa_zmanit;

	time = suntime(d, m, y, 90, 50, lngd, lngm, ewi, latd, latm, nsi, adj);
	if(time[1] == 0) {
		sunrise = time[2];
		sunset  = time[3];
		document.data.hanetz.value = timeadj(sunrise, ampm);
		document.data.shkia.value = timeadj(sunset, ampm);
		shaa_zmanit = (sunset - sunrise) / 12;
	}
	else {
		document.data.hanetz.value = "";
		document.data.shkia.value = "";
	}

	time = suntime(d, m, y, 106, 6, lngd, lngm, ewi, latd, latm, nsi, adj);
	if(time[1] == 0)
		document.data.alot.value = timeadj(time[2], ampm);
	else
		document.data.alot.value = "";

	time = suntime(d, m, y, 101, 0, lngd, lngm, ewi, latd, latm, nsi, adj);
	if(time[1] == 0)
		document.data.misheyakir.value = timeadj(time[2], ampm);
	else
		document.data.misheyakir.value = "";

	time = suntime(d, m, y, 96, 0, lngd, lngm, ewi, latd, latm, nsi, adj);
	if(time[1] == 0)
		document.data.tzeit.value = timeadj(time[3], ampm);
	else	
		document.data.tzeit.value = "";

	document.data.shema.value    = timeadj(sunrise + shaa_zmanit * 3, ampm);
	document.data.tefillah.value = timeadj(sunrise + shaa_zmanit * 4, ampm);
	document.data.chatzot.value  = timeadj(sunrise + shaa_zmanit * 6, ampm);
	document.data.minchag.value  = timeadj(sunrise + shaa_zmanit * 6.5, ampm);
	document.data.minchak.value  = timeadj(sunrise + shaa_zmanit * 9.5, ampm);
	document.data.plag.value     = timeadj(sunrise + shaa_zmanit * 10.75, ampm);

	var yom = new Date (y, m-1, d);
	if(yom.getDay() == 6) {

		// motzei shabbat (3 small stars)
		time = suntime(d, m, y, 98, 30, lngd, lngm, ewi, latd, latm, nsi, adj);
		if(time[1] == 0)
			document.data.motzeiShabbat.value = timeadj(time[3], ampm);
		else
			document.data.motzeiShabbat.value = "";

		// knissat shabbat (sunset from day before)
		var day_before = new Date(yom.getTime() - 86400000);
		db = day_before.getDate();
		mb = day_before.getMonth() + 1;
		yb = day_before.getYear();
		if(yb < 1900)
			yb += 1900;
		time = suntime(db, mb, yb, 90, 50, lngd, lngm, ewi, latd, latm, nsi, adj);
		if(document.data.placename.value == "(Israel) Jerusalem")
			document.data.knissatShabbat.value = timeadj(time[3] - 40.0/60.0, ampm);
		else if(document.data.placename.value == "(Israel) Haifa")
			document.data.knissatShabbat.value = timeadj(time[3] - 30.0/60.0, ampm);
		else if(document.data.placename.value == "(Israel) Be'er Sheva")
			document.data.knissatShabbat.value = timeadj(time[3] - 30.0/60.0, ampm);
		else if(document.data.placename.value == "(Israel) Karnei Shomron")
			document.data.knissatShabbat.value = timeadj(time[3] - 22.0/60.0, ampm);
		else if(document.data.placename.value == "(Israel) Tel Aviv")
			document.data.knissatShabbat.value = timeadj(time[3] - 22.0/60.0, ampm);
		else if(document.data.placename.value == "(Israel) Karnei Shomron")
			document.data.knissatShabbat.value = timeadj(time[3] - 22.0/60.0, ampm);
		else
			document.data.knissatShabbat.value = timeadj(time[3] - 18.0/60.0, ampm);
	}
	else {
		document.data.motzeiShabbat.value = '';
		document.data.knissatShabbat.value = '';
	}


}

function set_date_vars() {
	month = document.data.month.selectedIndex;
	day   = document.data.day.selectedIndex;
	year  = document.data.year.value;

	var len = civMonthLength(month+1, year);
	if(day >= len) {
		day = len - 1;
		document.data.day.selectedIndex = day;
	}
}

function date_vars_doit() {
	set_date_vars();
	doit("");
}

function set_default_date() {
	var now = new Date();
	var d = now.getDate();
	var m = now.getMonth();
	year = now.getYear();
	if(year < 1900)
		year += 1900;
	document.data.month.selectedIndex = m;
	document.data.day.selectedIndex = d - 1;
	document.data.year.value = year;
	set_date_vars("");
}

