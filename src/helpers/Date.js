const DateHelpers = {
    getNearestDay: function () {
        let d = new Date();
        let day = d.toLocaleString(window.navigator.language, { weekday: 'long' });
        if(day == 'Saturday' || day == 'Sunday') return 'Monday';
        else return day;
    }
}

export default DateHelpers;
