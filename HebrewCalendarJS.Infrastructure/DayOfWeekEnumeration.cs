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
}