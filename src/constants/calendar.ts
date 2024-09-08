export const getWeekdays = () => {
    const weekdays = [];
    const date = new Date();

    // Loop through days 0 (Sunday) to 6 (Saturday)
    for (let i = 0; i < 7; i++) {
        // Setting date to the ith day of the week
        date.setDate(i);

        const longName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const shortName = date.toLocaleDateString('en-US', { weekday: 'short' });

        weekdays.push({
            shortName: shortName,
            longName: longName
        });
    }

    return weekdays;
};

export const getMonths = () => {
    const months = [];
    const date = new Date();

    // Loop through months 0 (January) to 11 (December)
    for (let i = 0; i < 12; i++) {
        date.setMonth(i); // Set month to the ith month

        const longName = date.toLocaleDateString('en-US', { month: 'long' });
        const shortName = date.toLocaleDateString('en-US', { month: 'short' });

        months.push({
            shortName: shortName,
            longName: longName
        });
    }

    return months;
}

export const getDaysByYearAndMonth = (year: number, month: number) => {
    const days = [];
    const date = new Date(year, month - 1); // months are 0-indexed in JS (0 for January)

    // Loop through all days of the month
    while (date.getMonth() === month - 1) {
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        days.push({
            day: date.getDate(),
            dayName: dayName
        });
        date.setDate(date.getDate() + 1); // Move to the next day
    }

    return days;
}