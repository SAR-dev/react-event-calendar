import { useMemo } from "react";
import { timeRanges, months, getWeekday } from "../helpers/calendar"
import { CalendarDataType, TimeRangeEventsType } from "../types/types"

function matchTimeRange(eventStartAt: string) {
    const eventTime = new Date(eventStartAt).toTimeString().substring(0, 5); // Extract HH:mm from event start_at

    // Find the time range that contains the event time
    return timeRanges.find((range) => {
        const { start, end } = range;
        // Handle edge case for midnight (00:00)
        if (end === "00:00") return eventTime >= start || eventTime < "01:00";
        return eventTime >= start && eventTime < end;
    });
}

function filterData(year: number, month: number, day: number, data: CalendarDataType[]): TimeRangeEventsType[] {
    // Add the timeRange property to each event and filter by the given date
    const res = data.map((event) => {
        const timeRange = matchTimeRange(event.start_at);
        return {
            ...event,
            timeRange
        };
    }).filter((event) => {
        const eventDate = new Date(event.start_at);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() + 1 === month &&
            eventDate.getDate() === day
        );
    });

    // Filter the events to fit within the defined timeRanges
    return timeRanges.map(timeRange => {
        return {
            ...timeRange,
            events: res.filter(event =>
                event.timeRange && // Ensure timeRange is defined
                event.timeRange.start >= timeRange.start &&
                event.timeRange.end <= timeRange.end
            ),
        };
    });
}

const DayView = ({
    year,
    month,
    date,
    data
}: {
    year: number,
    month: number,
    date: number,
    data: CalendarDataType[]
}) => {
    const events:TimeRangeEventsType[] = useMemo(
        () => filterData(year, month, date, data),
        [year, month, date, data]
    );

    return (
        <div className="flex flex-col divide-y divide-base-300 border border-base-300 relative">
            <div className="w-full flex border-x border-base-300 text-sm font-medium sticky top-0">
                <div className="w-[8rem] flex-shrink-0 justify-center items-center w-full bg-base-100 border-r border-base-300"></div>
                <div className="w-full">
                    <div className="py-2 flex items-center justify-between px-3">
                        <div>{date} {months.find(e => e.index == month)?.longName}, {year}</div>
                        <div className="ml-auto">{getWeekday(year, month, date)}</div>
                    </div>
                </div>
            </div>
            {timeRanges.map((timeRange, i) => (
                <div className="w-full flex border-x border-base-300 text-sm font-medium" key={i}>
                    <div className="w-[8rem] flex-shrink-0 h-auto py-2 flex justify-center items-center w-full bg-base-100 border-r border-base-300">
                        {timeRange.start} - {timeRange.end}
                    </div>
                    <div className="w-auto h-auto flex justify-center items-center w-full bg-base-100 border-r border-base-300">
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DayView
