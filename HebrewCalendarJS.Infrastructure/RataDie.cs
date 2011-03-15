using System.Runtime.CompilerServices;

namespace HebrewCalendarJS.Infrastructure
{
	/// <summary>
	/// Specifies the day of the week.
	/// </summary>
	public enum DayOfWeek
	{
		/// <summary>
		/// Indicates Sunday.
		/// </summary>
		[PreserveCase]
		Sunday = 0,

		/// <summary>
		/// Indicates Monday.
		/// </summary>
		[PreserveCase]
		Monday = 1,

		/// <summary>
		/// Indicates Tuesday.
		/// </summary>
		[PreserveCase]
		Tuesday = 2,

		/// <summary>
		/// Indicates Wednesday.
		/// </summary>
		[PreserveCase]
		Wednesday = 3,

		/// <summary>
		/// Indicates Thursday.
		/// </summary>
		[PreserveCase]
		Thursday = 4,

		/// <summary>
		/// Indicates Friday.
		/// </summary>
		[PreserveCase]
		Friday = 5,

		/// <summary>
		/// Indicates Saturday.
		/// </summary>
		[PreserveCase]
		Saturday = 6
	};

	/// <summary>
	/// RataDie class is a representation of number of days elapsed since the Gregorian date 12/31/1 BC.
	/// </summary>
	public class RataDie
	{
		private long _days;

		public RataDie()
		{
			_days = 0;
		}

		#region Public methods
		/// <summary>
		/// The number of days elapsed since the Gregorian date 12/31/1 BC.
		/// </summary>
		public long Days
		{
			get
			{
				return _days;
			}
			set
			{
				_days = value;
			}
		}

		/// <summary>
		/// Returns the day of the week value in the object.
		/// </summary>
		/// <returns>The day of the week.</returns>
		public DayOfWeek DayOfWeek()
		{
			return (DayOfWeek)(_days % 7L);
		}

		/// <summary>
		/// Returns the <see cref="RataDie"/> of the <paramref name="dayOfWeek"/> on or before a fixed date,
		/// represented by the instance.
		/// </summary>
		/// <param name="dayOfWeek">The day of the week to search for.</param>
		/// <returns>An <see cref="RataDie"/>, on or before the instance date.</returns>
		public RataDie DayOnOrBefore(DayOfWeek dayOfWeek)
		{
			RataDie result = null;

			result = new RataDie();
			result.Days = _days - ((_days - (int)dayOfWeek) % 7L);
			return result;
		}

		/// <summary>
		/// Returns the <see cref="RataDie"/> of the <paramref name="dayOfWeek"/> on or after a fixed date,
		/// represented by the instance.
		/// </summary>
		/// <param name="dayOfWeek">The day of the week to search for.</param>
		/// <returns>An <see cref="RataDie"/>, on or after the instance date.</returns>
		public RataDie DayOnOrAfter(DayOfWeek dayOfWeek)
		{
			RataDie laterDate = null;

			laterDate = new RataDie();
			laterDate.Days = _days + 6;
			return laterDate.DayOnOrBefore(dayOfWeek);
		}

		/// <summary>
		/// Returns the <see cref="RataDie"/> of the <paramref name="dayOfWeek"/> nearest to a fixed date,
		/// represented by the instance.
		/// </summary>
		/// <param name="dayOfWeek">The day of the week to search for.</param>
		/// <returns>An <see cref="RataDie"/>, after the instance date.</returns>
		public RataDie DayNearest(DayOfWeek dayOfWeek)
		{
			RataDie halfNextWeekDate = null;

			halfNextWeekDate = new RataDie();
			halfNextWeekDate.Days = _days + 3;
			return halfNextWeekDate.DayOnOrBefore(dayOfWeek);
		}

		/// <summary>
		/// Returns the <see cref="RataDie"/> of the <paramref name="dayOfWeek"/> before a fixed date,
		/// represented by the instance.
		/// </summary>
		/// <param name="dayOfWeek">The day of the week to search for.</param>
		/// <returns>An <see cref="RataDie"/>, before the instance date.</returns>
		public RataDie DayBefore(DayOfWeek dayOfWeek)
		{
			RataDie yesterdayDate = null;

			yesterdayDate = new RataDie();
			yesterdayDate.Days = _days - 1;
			return yesterdayDate.DayOnOrBefore(dayOfWeek);
		}

		/// <summary>
		/// Returns the <see cref="RataDie"/> of the <paramref name="dayOfWeek"/> after a fixed date,
		/// represented by the instance.
		/// </summary>
		/// <param name="dayOfWeek">The day of the week to search for.</param>
		/// <returns>An <see cref="RataDie"/>, after the instance date.</returns>
		public RataDie DayAfter(DayOfWeek dayOfWeek)
		{
			RataDie nextWeekDate = null;

			nextWeekDate = new RataDie();
			nextWeekDate.Days = _days + 7;
			return nextWeekDate.DayOnOrBefore(dayOfWeek);
		}
		#endregion Public methods
	}
}