export const weekdays = [
    {
        longName: "Monday",
        shortName: "Mon",
        index: 1
    },
    {
        longName: "Tuesday",
        shortName: "Tue",
        index: 2
    },
    {
        longName: "Wednesday",
        shortName: "Wed",
        index: 3
    },
    {
        longName: "Thursday",
        shortName: "Thu",
        index: 4
    },
    {
        longName: "Friday",
        shortName: "Fri",
        index: 5
    },
    {
        longName: "Saturday",
        shortName: "Sat",
        index: 6
    },
    {
        longName: "Sunday",
        shortName: "Sun",
        index: 7
    }
];

export const months = [
    {
        longName: "January",
        shortName: "Jan",
        index: 1
    },
    {
        longName: "February",
        shortName: "Feb",
        index: 2
    },
    {
        longName: "March",
        shortName: "Mar",
        index: 3
    },
    {
        longName: "April",
        shortName: "Apr",
        index: 4
    },
    {
        longName: "May",
        shortName: "May",
        index: 5
    },
    {
        longName: "June",
        shortName: "Jun",
        index: 6
    },
    {
        longName: "July",
        shortName: "Jul",
        index: 7
    },
    {
        longName: "August",
        shortName: "Aug",
        index: 8
    },
    {
        longName: "September",
        shortName: "Sep",
        index: 9
    },
    {
        longName: "October",
        shortName: "Oct",
        index: 10
    },
    {
        longName: "November",
        shortName: "Nov",
        index: 11
    },
    {
        longName: "December",
        shortName: "Dec",
        index: 12
    }
];

export const weeks = [1, 2, 3, 4, 5]

export const getYearsRange = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    const endYear = currentYear + 5;

    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    return years;
}


const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstMonday = startOfMonth.getDay() === 0 ? 1 : 2 - startOfMonth.getDay();
    const adjustedDay = date.getDate() - firstMonday;
    return Math.ceil((adjustedDay + 1) / 7) + (adjustedDay >= 0 ? 0 : 1); // Handle offset for negative adjustedDay
}

const getDayOfWeekIndex = (date: Date): number => {
    // getDay() returns 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const day = date.getDay();
    // Adjust so Monday is 1 and Sunday is 7
    return day === 0 ? 7 : day;
};

export const getWeeksByYearAndMonth = (year: number, month: number) => {
    const weeks: { [key: number]: { [key: number]: number } } = {}; // Store weeks as key-value pairs
    const date = new Date(year, month - 1, 1); // Start from the first day of the month

    // Loop through all days of the month
    while (date.getMonth() === month - 1) {
        const dayPosition = getDayOfWeekIndex(date);
        const weekNo = getWeekOfMonth(date); // Get week number starting from Monday

        // If the week number doesn't exist, initialize it as an empty array
        if (!weeks[weekNo]) {
            weeks[weekNo] = {};
        }

        // Push the day into the corresponding week
        weeks[weekNo][dayPosition] = date.getDate();

        date.setDate(date.getDate() + 1); // Move to the next day
    }

    return weeks;
};