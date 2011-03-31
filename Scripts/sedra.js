var sedrot =
[
    ["Bereshit",        "Bereshis",     "ברשית"],
    ["Noach",   "Noach",        "נח"],
    ["Lech-Lecha",      "Lech-Lecha",   "לך לך"],
    ["Vayera",  "Vayera",       "וירא"],
    ["Chayei Sara",     "Chayei Sara",  "חיי שרה"],
    ["Toldot",  "Toldos",       "תולדות"],
    ["Vayetzei",        "Vayetzei",     "ויצא"],
    ["Vayishlach",      "Vayishlach",   "וישלח"],
    ["Vayeshev",        "Vayeshev",     "וישב"],
    ["Miketz",  "Miketz",       "מיקץ"],
    ["Vayigash",        "Vayigash",     "ויגש"],
    ["Vayechi", "Vayechi",      "ויחי"],
    ["Shemot",  "Shemos",       "שמות"],
    ["Vaera",   "Vaera",        "ויראה"],
    ["Bo",      "Bo",   "בו"],
    ["Beshalach",       "Beshalach",    "בשלח"],
    ["Yitro",   "Yisro",        "יתרו"],
    ["Mishpatim",       "Mishpatim",    "משפטים"],
    ["Terumah", "Terumah",      "תרומה"],
    ["Tetzaveh",        "Tetzaveh",     "תצווה"],
    ["Ki Tisa", "Ki Sisa",      "כי תשה"],
    ["Vayakhel",        "Vayakhel",     "ויקהל"],
    ["Pekudei", "Pekudei",      "פקודי"],
    ["Vayikra", "Vayikra",      "ויקרא"],
    ["Tzav",    "Tzav", "צו"],
    ["Shmini",  "Shmini",       "שמיני"],
    ["Tazria",  "Sazria",       "תזריע"],
    ["Metzora", "Metzora",      "מצורע"],
    ["Achrei Mot",      "Achrei Mos",   "אחרי מות"],
    ["Kedoshim",        "Kedoshim",     "קדושים"],
    ["Emor",    "Emor", "אמור"],
    ["Behar",   "Behar",        "בהר"],
    ["Bechukotai",      "Bechukosai",   "בחוקותי"],
    ["Bamidbar",        "Bamidbar",     "במדבר"],
    ["Nasso",   "Nasso",        "נשא"],
    ["Beha'alotcha",    "Beha'aloscha", "בהעלותך"],
    ["Sh'lach", "Sh'lach",      "שלח"],
    ["Korach",  "Korach",       "קורח"],
    ["Chukat",  "Chukas",       "חוקת"],
    ["Balak",   "Balak",        "בלק"],
    ["Pinchas", "Pinchas",      "פנחס"],
    ["Matot",   "Matos",        "מטות"],
    ["Masei",   "Masei",        "מסעי"],
    ["Devarim", "Devarim",      "דברים"],
    ["Vaetchanan",      "Vaeschanan",   "ואתחנן"],
    ["Eikev",   "Eikev",        "עקב"],
    ["Re'eh",   "Re'eh",        "ראה"],
    ["Shoftim", "Shoftim",      "שופטים"],
    ["Ki Teitzei",      "Ki Seitzei",   "כי תצא"],
    ["Ki Tavo", "Ki Savo",      "כי תבוא"],
    ["Nitzavim",        "Nitzavim",     "נציבם"],
    ["Vayeilech",       "Vayeilech",    "וילך"],
    ["Ha'Azinu",        "Ha'Azinu",     "האזינו"],
];

var INCOMPLETE = 0;
var REGULAR = 1;
var COMPLETE = 2;

/* parsha doubler */
function D(p)
{
    return (-(p));
}

/* parsha undoubler */
function U(p)
{
	return (-(p));
}

var nonleap_monday_incomplete =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, D(21), 23, 24, -1, 25, D(26), D(28), 30, D(31), 33, 34,
 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, D(50)];
/* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
Kislev each have 29 days), and has Passover start on Tuesday. */

var nonleap_monday_complete_diaspora =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, D(21), 23, 24, -1, 25, D(26), D(28), 30, D(31), 33,
 -1, 34, 35, 36, 37, D(38), 40, D(41), 43, 44, 45, 46, 47, 48, 49,
 D(50)];
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Thursday. */

var nonleap_monday_complete_israel = nonleap_monday_incomplete;
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Thursday. */

var nonleap_tuesday_regular_diaspora = nonleap_monday_complete_diaspora;
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Thursday. */

var nonleap_tuesday_regular_israel = nonleap_monday_incomplete;
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Thursday. */

var nonleap_thursday_regular_diaspora =
[52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, D(21), 23, 24, -1, -1, 25, D(26), D(28), 30, D(31),
 33, 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Saturday. */

var nonleap_thursday_regular_israel =
[52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, D(21), 23, 24, -1, 25, D(26), D(28), 30, 31, 32, 33,
 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Thursday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Saturday. */

var nonleap_thursday_complete =
[52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, -1, 25, D(26), D(28), 30, D(31), 33,
 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Thursday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Sunday. */
var nonleap_saturday_incomplete =
[-1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
 15, 16, 17, 18, 19, 20, D(21), 23, 24, -1, 25, D(26), D(28), 30, D(31),
 33, 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49,
 50];

/* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and Kislev
each have 29 days), and has Passover start on Sunday. */

var nonleap_saturday_complete =
[-1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
 16, 17, 18, 19, 20, D(21), 23, 24, -1, 25, D(26), D(28), 30,
 D(31), 33, 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47,
 48, 49, D(50)];
/* Hebrew year that starts on Saturday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Tuesday. */

/* --  The leap year types (keviot) -- */

var leap_monday_incomplete_diaspora =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33,
 -1, 34, 35, 36, 37, D(38), 40, D(41), 43, 44, 45, 46, 47, 48, 49,
 D(50)];
/* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
Kislev each have 29 days), and has Passover start on Thursday. */

var leap_monday_incomplete_israel =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33,
 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, D(50)];
/* Hebrew year that starts on Monday, is `incomplete' (Heshvan and
Kislev each have 29 days), and has Passover start on Thursday. */


var leap_monday_complete_diaspora =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, -1, 28, 29, 30, 31, 32,
 33, 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Saturday. */

var leap_monday_complete_israel =
[51, 52, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32, 33,
 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Monday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Saturday. */

var leap_tuesday_regular_diaspora = leap_monday_complete_diaspora;
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Saturday. */

var leap_tuesday_regular_israel = leap_monday_complete_israel;
/* Hebrew year that starts on Tuesday, is `regular' (Heshvan has 29
days and Kislev has 30 days), and has Passover start on Saturday. */

var leap_thursday_incomplete =
[52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, -1, 29, 30, 31, 32, 33,
 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
/* Hebrew year that starts on Thursday, is `incomplete' (Heshvan and
Kislev both have 29 days), and has Passover start on Sunday. */

var leap_thursday_complete =
[52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, -1, 29, 30, 31, 32, 33,
 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, D(50)];
/* Hebrew year that starts on Thursday, is `complete' (Heshvan and
Kislev both have 30 days), and has Passover start on Tuesday. */

var leap_saturday_incomplete =
[-1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32,
 33, 34, 35, 36, 37, 38, 39, 40, D(41), 43, 44, 45, 46, 47, 48, 49,
 D(50)];
/* Hebrew year that starts on Saturday, is `incomplete' (Heshvan and
Kislev each have 29 days), and has Passover start on Tuesday. */

var leap_saturday_complete_diaspora =
[-1, 52, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, -1, 28, 29, 30, 31, 32,
 33, -1, 34, 35, 36, 37, D(38), 40, D(41), 43, 44, 45, 46, 47, 48, 49,
 D(50)];
/* Hebrew year that starts on Saturday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Thursday. */

var leap_saturday_complete_israel = leap_saturday_incomplete;
/* Hebrew year that starts on Saturday, is `complete' (Heshvan and
Kislev each have 30 days), and has Passover start on Thursday. */

function ROSH_DAY_INDEX(x)
{
	return Math.floor(((x) == 1) ? 0 : ((x) / 2));
}

var sedra_years_array =
[
    [                             /* nonleap years */

        [                           /* monday */
            [                         /* incomplete */
                nonleap_monday_incomplete,
                nonleap_monday_incomplete
            ],

            [                         /* regular */
                null, null
            ],

            [                         /* complete */
                nonleap_monday_complete_diaspora,
                nonleap_monday_complete_israel
            ],

        ],

        [                           /* tuesday */
            [                         /* incomplete */
                null, null
            ],

            [                         /* regular */
                nonleap_tuesday_regular_diaspora,
                nonleap_tuesday_regular_israel

            ],

            [                         /* complete */
                null, null
            ],
        ],

        [                           /* thursday */
            [                         /* incomplete */
                null, null
            ],

            [                         /* regular */
                nonleap_thursday_regular_diaspora,
                nonleap_thursday_regular_israel
            ],

            [                         /* complete */
                nonleap_thursday_complete,
                nonleap_thursday_complete
            ],
        ],

        [                           /* saturday */
            [                         /* incomplete */
                nonleap_saturday_incomplete,
                nonleap_saturday_incomplete
            ],

            [                         /* regular */
                null, null
            ],

            [                         /* complete */
                nonleap_saturday_complete, nonleap_saturday_complete
            ],
        ],
    ],


    [                             /* leap years */
        [                           /* monday */
            [                         /* incomplete */
                leap_monday_incomplete_diaspora,
                leap_monday_incomplete_israel
            ],

            [                         /* regular */
                null, null
            ],

            [                         /* complete */
                leap_monday_complete_diaspora,
                leap_monday_complete_israel
            ],
        ],

        [                           /* tuesday */
            [                         /* incomplete */
				null, null
            ],

            [                         /* regular */
                leap_tuesday_regular_diaspora,
                leap_tuesday_regular_israel,
            ],

            [                         /* complete */
                null, null
            ],
        ],

    [                           /* thursday */
        [                         /* incomplete */
            leap_thursday_incomplete,
            leap_thursday_incomplete
        ],

        [                         /* regular */
            null, null
        ],

        [                         /* complete */
            leap_thursday_complete,
            leap_thursday_complete
        ],
    ],

        [                           /* saturday */
            [                         /* incomplete */
                leap_saturday_incomplete,
                leap_saturday_incomplete
            ],

            [                         /* regular */
                null, null
            ],

            [                         /* complete */
                leap_saturday_complete_diaspora,
                leap_saturday_complete_israel
            ],
        ],
    ]
];

var theSedraArray;
var first_saturday;

/* use Israeli sedra scheme --  israel_sw = 1; otherwise -- israel_sw = 0*/
var israel_sw = 1;

var iso8859_8_sw = 1;

var ashkenazis_sw = 1;

/* sets static globals based on this year. */
function reset_sedra( /*int*/hebYr) /* the hebrew year */
{
	var tempDt = {};
	var long_c, short_k, rosh_hashana_day, type;
	var rosh_hashana;

	long_c = long_cheshvan(hebYr);
	short_k = short_kislev(hebYr);

	if (long_c && !short_k)
		type = COMPLETE;
	else if (!long_c && short_k)
		type = INCOMPLETE;
	else
		type = REGULAR;

	tempDt.dd = 1;
	tempDt.mm = TISHREI;
	tempDt.yy = hebYr;
	rosh_hashana = hebrew2abs(tempDt);
	rosh_hashana_day = (rosh_hashana % 7);

	/* find the first saturday on or after Rosh Hashana */
	first_saturday = day_on_or_before(6, rosh_hashana + 6);

	if (null == (theSedraArray = sedra_years_array
                 [LEAP_YR_HEB(hebYr)]
                 [ROSH_DAY_INDEX(rosh_hashana_day)]
                 [type]
                 [israel_sw]))
		throw "improper sedra year type calculated.";
}

/* returns a string "Parshat <parsha>" based on the current parsha number */
/* NOTE-- the returned value lives in a static buffer. */
function sedra( /*long*/absDate)
{

	var index;
	var buf;

	/* find the first saturday on or after today's date */
	absDate = day_on_or_before(6, absDate + 6);

	index = theSedraArray[(absDate - first_saturday) / 7];

	if (index >= 0)
		return LANGUAGE2(sedrot[index]);
	else if (-1 == index)
		return null;
	else
	{
		var i = U(index);      /* undouble the parsha */
		return (LANGUAGE2(sedrot[i]) +
			"-" +
			LANGUAGE2(sedrot[i + 1]));
	}
	return buf;
}