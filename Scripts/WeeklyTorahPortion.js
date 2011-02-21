WeeklyTorahPortion = function()
{
}

WeeklyTorahPortion.prototype =
{
    /// #region Public API
    get_WeeklyTorahPortionByCivilDate: function(civilDate)
    {
        var hebrewDate = null;
        
        hebrewDate = this._ConvertCivilDateToHebrewDate(civilDate);
        return this.get_WeeklyTorahPortionByHebrewDate(hebrewDate);
    },
    
    get_WeeklyTorahPortionByHebrewDate: function(hebrewDate)
    {
    },
    /// #endregion Public API
    
    /// #region Private API
    _ConvertCivilDateToHebrewDate: function(civilDate)
    {
    },
    /// #region Private API
    
    dispose: function()
    {
    }
}