/* ksun.js - Kaluach suntimes Javascript routines
 *   Version 1.00 (initial release)
 *   Version 1.01 (fixed bug with time adjust - AM/PM and 24 hour clock)
 *   Version 1.02 (fixed bug with time adjust [again] - AM/PM and 24 hour clock)
 *   Version 2.00 (new suntimes routine, original routine was buggy)
 *   Version 2.01 (handle invalid sunrise/set, different knissat shabbat times)
 * Copyright (C) 5760-5763 (2000 - 2003 CE), by Abu Mami and Yisrael Hersch.
 *   All Rights Reserved.
 *   All copyright notices in this script must be left intact.
 * Based on:
 *   - PHP code that was translated by mattf@mail.com from the original perl
 *     module Astro-SunTime-0.01
 *	 - original version of ksun.js was based on the program SUN.C by Michael
 *     Schwartz, which was based on an algorithm contained in:
 *         Almanac for Computers, 1990
 *         published by Nautical Almanac Office
 *         United States Naval Observatory
 *         Washington, DC 20392
 * Permission will be granted to use this script on your web page
 *   if you wish. All that's required is that you please ask.
 *   (Of course if you want to send a few dollars, that's OK too :-)
 * website: http://www.kaluach.net
 * email: abumami@kaluach.org
 */

var monCount = new makeArray(1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366);

function makeArray() {
	this[0] = makeArray.arguments.length;
	for (i = 0; i < makeArray.arguments.length; i = i + 1)
		this[i+1] = makeArray.arguments[i];
}

function doy(d, m, y) {
	return monCount[m] + d + (m > 2 && leap(y));
}


function suntime(
	dy, mn, yr,
	sundeg, sunmin,
	londeg, lonmin, ew,
	latdeg, latmin, ns,
	timezone)
{
	var invalid = 0;	// start out as OK

	longitude = (londeg + lonmin/60.0) * ((ew == 0) ? -1 : 1);
	latitude  = (latdeg + latmin/60.0) * ((ns == 0) ? 1 : -1);

	var yday = doy(dy, mn, yr);

	var A = 1.5708; 
	var B = 3.14159; 
	var C = 4.71239; 
	var D = 6.28319;      
	var E = 0.0174533 * latitude; 
	var F = 0.0174533 * longitude; 
	var G = 0.261799 * timezone; 

	var R = Math.cos(0.01745 * (sundeg + sunmin/60.0));

	var J;

	// two times through the loop
	//    i=0 is for sunrise
	//    i=1 is for sunset
	for (i = 0; i < 2; i++) { 

		if(!i)
			J =  A;	// sunrise 
		else
			J = C;	// sunset

		var K = yday + ((J - F) / D); 
		var L = (K * .017202) - .0574039;              // Solar Mean Anomoly 
		var M = L + .0334405 * Math.sin(L);            // Solar True Longitude 
		M += 4.93289 + (3.49066E-04) * Math.sin(2 * L); 
		
		// Quadrant Determination 
		if (D == 0) {
			alert("Trying to normalize with zero offset...");
			exit;
		} 

		while(M < 0)
			M = (M + D);

		while(M >= D)
			M = (M - D);

		if ((M / A) - Math.floor(M / A) == 0)
			M += 4.84814E-06;

		var P = Math.sin(M) / Math.cos(M);                   // Solar Right Ascension 
		P = Math.atan2(.91746 * P, 1); 

		// Quadrant Adjustment 
		if (M > C)
			P += D;
		else {
			if (M > A)
				P += B;
		} 

		var Q = .39782 * Math.sin(M);      // Solar Declination 
		Q = Q / Math.sqrt(-Q * Q + 1);     // This is how the original author wrote it! 
		Q = Math.atan2(Q, 1); 

		var S = R - (Math.sin(Q) * Math.sin(E)); 
		S = S / (Math.cos(Q) * Math.cos(E)); 

		if(Math.abs(S) > 1)
			invalid = 1;	// uh oh! no sunrise/sunset

		S = S / Math.sqrt(-S * S + 1); 
		S = A - Math.atan2(S, 1); 

		if(!i)
			S = D - S;	// sunrise

		var T = S + P - 0.0172028 * K - 1.73364;  // Local apparent time 
		var U = T - F;                            // Universal timer 
		var V = U + G;                            // Wall clock time 
		
		// Quadrant Determination 
		if(D == 0) {
			alert("Trying to normalize with zero offset...");
			exit;
		} 
		
		while(V < 0)
			V = V + D;
		while(V >= D)
			V = V - D;
		V = V * 3.81972; 

		if(!i)
			sr = V;	// sunrise
		else
			ss = V;	// sunset
	} 

	var ret = new Object();
	ret[1] = invalid;
	ret[2] = sr;
	ret[3] = ss;
	return ret;
}


function timeadj(t, ampm) {
	var hour;
	var min;

	var time = t;

	var hour = Math.floor(time);
	var min  = Math.floor((time - hour) * 60.0 + 0.5);

	if(min >= 60) {
		hour += 1;
		min  -= 60;
	}

	if(hour < 0)
		hour += 24;

	if(ampm) {
		ampm_str = (hour > 11) ? ' PM' : ' AM';
		hour %= 12;
		hour = (hour < 1) ? 12 : hour;
	}
	else
		ampm_str = '';

	var str = hour + ':' + ((min < 10) ? '0' : '') + min + ampm_str;
//	var str = hour + ':' + min + ampm_str;
	return str;

}

