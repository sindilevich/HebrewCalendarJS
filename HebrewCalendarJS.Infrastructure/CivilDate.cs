using System;
using System.Runtime.CompilerServices;

namespace HebrewCalendarJS.Infrastructure
{
	/// <summary>
	/// Specifies the month of the civil (Gregorian) calendar.
	/// </summary>
	public enum CivilMonth
	{
		/// <summary>
		/// Indicates January.
		/// </summary>
		[PreserveCase]
		January = 1,

		/// <summary>
		/// Indicates February.
		/// </summary>
		[PreserveCase]
		February = 2,

		/// <summary>
		/// Indicates March.
		/// </summary>
		[PreserveCase]
		March = 3,

		/// <summary>
		/// Indicates April.
		/// </summary>
		[PreserveCase]
		April = 4,

		/// <summary>
		/// Indicates May.
		/// </summary>
		[PreserveCase]
		May = 5,

		/// <summary>
		/// Indicates June.
		/// </summary>
		[PreserveCase]
		June = 6,

		/// <summary>
		/// Indicates July.
		/// </summary>
		[PreserveCase]
		July = 7,

		/// <summary>
		/// Indicates August.
		/// </summary>
		[PreserveCase]
		August = 8,

		/// <summary>
		/// Indicates September.
		/// </summary>
		[PreserveCase]
		September = 9,

		/// <summary>
		/// Indicates October.
		/// </summary>
		[PreserveCase]
		October = 10,

		/// <summary>
		/// Indicates November.
		/// </summary>
		[PreserveCase]
		November = 11,

		/// <summary>
		/// Indicates December.
		/// </summary>
		[PreserveCase]
		December = 12
	};

	/// <summary>
	/// Represents a civil (Gregorian) calendar date.
	/// </summary>
	public class CivilDate
	{
		#region Public constants
		/// <summary>
		/// Number of days in a common year.
		/// </summary>
		[PreserveCase]
		public const int DAYS_IN_COMMON_YEAR = 365;

		/// <summary>
		/// Number of days in a leap year.
		/// </summary>
		[PreserveCase]
		public const int DAYS_IN_LEAP_YEAR = 366;

		/// <summary>
		/// Lengths of a common year months.
		/// </summary>
		[PreserveCase]
		public readonly int[] COMMON_YEAR_MONTH_LENGTHS;

		/// <summary>
		/// Lengths of a leap year months.
		/// </summary>
		[PreserveCase]
		public readonly int[] LEAP_YEAR_MONTH_LENGTHS;
		#endregion Public constants

		private int _day;
		private CivilMonth _month;
		private int _fullYear;

		public CivilDate()
		{
			DateTime today = DateTime.Today;

			COMMON_YEAR_MONTH_LENGTHS = new int[] { 0/*Padding element -- January is 1, not 0*/,
				31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
			LEAP_YEAR_MONTH_LENGTHS = new int[] { 0/*Padding element -- January is 1, not 0*/,
				31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

			SetDate(today.GetDate(), (CivilMonth)(today.GetMonth() + 1), today.GetFullYear());
		}

		#region Public properties
		/// <summary>
		/// Determines whether the current year is a leap year.
		/// </summary>
		public bool IsLeapYear
		{
			get
			{
				return GetIsLeapYear(Year);
			}
		}

		/// <summary>
		/// Returns the day of the month.
		/// </summary>
		public int Day
		{
			get
			{
				return _day;
			}
		}

		/// <summary>
		/// Returns the month.
		/// </summary>
		public CivilMonth Month
		{
			get
			{
				return _month;
			}
		}

		/// <summary>
		/// Returns the year.
		/// </summary>
		public int Year
		{
			get
			{
				return _fullYear;
			}
		}
		#endregion Public properties

		#region Public methods
		/// <summary>
		/// The number of days elapsed between the Gregorian date 12/31/1 BC and the date.
		/// The Gregorian date Sunday, December 31, 1 BC is imaginary.
		/// </summary>
		/// <returns>The number of days elapsed since 12/31/1 BC.</returns>
		public RataDie GetRataDie()
		{
			long julianLeapYears = 0;
			long centuryYears = 0;
			long gregorianLeapYears = 0;
			RataDie result = null;

			result = new RataDie();
			julianLeapYears = (int)((Year - 1) / 4);
			centuryYears = (int)((Year - 1) / 100);
			gregorianLeapYears = (int)((Year - 1) / 400);
			result.Days = ((long)DayOfYear()		/* days this year */
				+ 365L * (long)(Year - 1)	/* + days in prior years */
				+ (long)(julianLeapYears	/* + Julian Leap years */
					- centuryYears			/* - century years */
					+ gregorianLeapYears));	/* + Gregorian leap years */

			return result;
		}

		/// <summary>
		/// Sets the <see cref="CivilDate"/> object to a date based on its <see cref="RataDie"/> counterpart.
		/// <remarks>See the footnote on page 384 of "Calendrical Calculations, Part II: Three Historical Calendars"
		/// by E. M. Reingold,  N. Dershowitz, and S. M. Clamen, Software--Practice and Experience, Volume 23,
		/// Number 4 (April, 1993), pages 383-404 for an explanation.</remarks>
		/// </summary>
		/// <param name="fixedDate">An <see cref="RataDie"/> object that represents the desired date.</param>
		public void SetRataDie(RataDie fixedDate)
		{
			int day = 0;
			int year = 0;
			int month = 0;
			int mlen = 0;
			long d0 = 0L;
			long n400 = 0L;
			long d1 = 0L;
			long n100 = 0L;
			long d2 = 0L;
			long n4 = 0L;
			long d3 = 0L;
			long n1 = 0L;

			d0 = fixedDate.Days - 1L;
			n400 = (int)(d0 / 146097L);
			d1 = (int)(d0 % 146097L);
			n100 = (int)(d1 / 36524L);
			d2 = (int)(d1 % 36524L);
			n4 = (int)(d2 / 1461L);
			d3 = (int)(d2 % 1461L);
			n1 = (int)(d3 / 365L);

			day = (int)((d3 % 365L) + 1L);
			year = (int)(400L * n400 + 100L * n100 + 4L * n4 + n1);

			if (n100 == 4L || n1 == 4L)
			{
				SetDate(31, CivilMonth.December, year);
			}
			else
			{
				year++;
				month = 1; // Start from January
				while ((mlen = GetDaysInMonth((CivilMonth)month, year)) < day)
				{
					day -= mlen;
					month++;
				}
				SetDate(day, (CivilMonth)month, year);
			}
		}

		/// <summary>
		/// Sets the <see cref="CivilDate"/> object to a date based on a combination of <paramref name="day"/>,
		/// <paramref name="month"/> and <paramref name="fullYear"/> values.
		/// </summary>
		/// <param name="day">The date as an integer between 1 and 31.</param>
		/// <param name="month">The month as a <see cref="CivilMonth"/> enum between January and December.</param>
		/// <param name="fullYear">The full year, for example, 1976 (and not 76).</param>
		public void SetDate(int day, CivilMonth month, int fullYear)
		{
			int maxDay = 0;

			maxDay = GetDaysInMonth(month, fullYear);
			_day = (day > maxDay ? maxDay : day);
			_month = month;
			_fullYear = fullYear;
		}

		/// <summary>
		/// Adds the specified number of days to the value of this instance.
		/// </summary>
		/// <param name="numberOfDays">A number of whole days.
		/// The value parameter can be negative or positive.</param>
		public void AddDays(long numberOfDays)
		{
			RataDie currentValue = null;

			currentValue = GetRataDie();
			currentValue.Days += numberOfDays;
			SetRataDie(currentValue);
		}

		/// <summary>
		/// Returns the number of days in the year of the date.
		/// </summary>
		/// <returns>The number of days of the year.</returns>
		public int DaysInYear()
		{
			return IsLeapYear ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;
		}

		/// <summary>
		/// Returns the day number within the year of the date.
		/// For example, DayOfYear() of January 1, 1987 returns the value 1
		/// while DayOfYear() of December 31, 1980 returns 366.
		/// </summary>
		/// <returns>The day number within the year.</returns>
		public int DayOfYear()
		{
			int dayOfYear = 0;

			dayOfYear = Day + 31 * ((int)Month - 1);
			if (Month > CivilMonth.February)
			{
				dayOfYear -= (int)((4 * (int)Month + 23) / 10);
				if (IsLeapYear)
				{
					dayOfYear++;
				}
			}

			return dayOfYear;
		}
		#endregion Public methods

		#region Private methods
		/// <summary>
		/// Calculates whether the specified <paramref name="fullYear"/> is a leap year.
		/// </summary>
		/// <param name="fullYear">The full year, for example, 1976 (and not 76).</param>
		/// <returns>true when the year is a leap year; otherwise - false.</returns>
		private bool GetIsLeapYear(int fullYear)
		{
			return (fullYear % 4 == 0 &&
					(fullYear % 100 != 0 || fullYear % 400 == 0));
		}

		/// <summary>
		/// Returns the number of days of the specified <paramref name="month"/> of the <paramref name="fullYear"/>.
		/// </summary>
		/// <param name="month">The month as a <see cref="CivilMonth"/> enum between January and December.</param>
		/// <param name="fullYear">The full year, for example, 1976 (and not 76).</param>
		/// <returns>The number of days.</returns>
		private int GetDaysInMonth(CivilMonth month, int fullYear)
		{
			int[] monthLengths = null;

			monthLengths = GetIsLeapYear(fullYear) ? LEAP_YEAR_MONTH_LENGTHS : COMMON_YEAR_MONTH_LENGTHS;

			return monthLengths[(int)_month];
		}
		#endregion Private methods
	}
}