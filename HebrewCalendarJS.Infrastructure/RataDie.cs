namespace HebrewCalendarJS.Infrastructure
{
	/// <summary>
	/// RataDie class is a representation of number of days elapsed since the Gregorian date 12/31/1 BC.
	/// </summary>
	public class RataDie
	{
		private long _days;

		public RataDie()
		{
			Days = 0;
		}

		#region Public properties
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
		#endregion Public properties

		#region Public methods
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
			result.Days = Days - ((Days - (int)dayOfWeek) % 7L);
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
			laterDate.Days = Days + 6;
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
			halfNextWeekDate.Days = Days + 3;
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
			yesterdayDate.Days = Days - 1;
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
			nextWeekDate.Days = Days + 7;
			return nextWeekDate.DayOnOrBefore(dayOfWeek);
		}
		#endregion Public methods
	}
}