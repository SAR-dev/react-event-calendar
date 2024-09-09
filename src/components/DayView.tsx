import { useMemo } from "react";
import { timeRanges, months, getWeekday } from "../helpers/calendar"
import { CalendarDataType, TimeRangeEventsType } from "../types/types"
import { stringToColor } from "../helpers/color";

function formatTimestampToTime(timestamp: string) {
    const date = new Date(timestamp);
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`;
}

function filterData(year: number, month: number, day: number, data: CalendarDataType[]): TimeRangeEventsType[] {
    // Add the timeRange property to each event and filter by the given date
    const res = data.filter((event) => {
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
                formatTimestampToTime(event.start_at) >= timeRange.start &&
                formatTimestampToTime(event.start_at) < timeRange.end
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
    const timeRangeEvents: TimeRangeEventsType[] = useMemo(
        () => filterData(year, month, date, data),
        [year, month, date, data]
    );

    return (
        <div className="flex flex-col divide-y divide-base-300 border border-base-300 relative">
            <div className="w-full flex border-x border-base-300 text-sm font-medium sticky top-0">
                <div className="w-[8rem] flex-shrink-0 justify-center items-center bg-base-100 border-r border-base-300"></div>
                <div className="w-full">
                    <div className="py-2 flex items-center justify-between px-3">
                        <div>{date} {months.find(e => e.index == month)?.longName}, {year}</div>
                        <div className="ml-auto">{getWeekday(year, month, date)}</div>
                    </div>
                </div>
            </div>
            {timeRangeEvents.map((timeRangeEvent, i) => (
                <div className="w-full flex border-x border-base-300 text-sm font-medium" key={i}>
                    <div className="w-[8rem] flex-shrink-0 h-auto py-2 flex justify-center items-start bg-base-100 border-r border-base-300">
                        {timeRangeEvent.start}
                    </div>
                    <div className="w-auto h-auto flex flex-col justify-center gap-1 w-full bg-base-100 p-2">
                        {timeRangeEvent.events.map((e, i) => (
                            <div className="flex gap-2 items-center text-xs" key={i}>
                                <div className="h-3 w-3 rounded-full" style={{backgroundColor: `${stringToColor(e.title)}`}}></div>
                                <div>{formatTimestampToTime(e.start_at)} - {formatTimestampToTime(e.end_at)} {e.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DayView
