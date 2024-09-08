import { useMemo } from "react"
import { weekdays, timeRanges, getWeekByYearMonthAndDate } from "../helpers/calendar"

const WeekView = ({ year, month, day }: { year: number, month: number, day: number }) => {
    const weekByYearMonthAndDate = useMemo(
        () => getWeekByYearMonthAndDate(year, month, day),
        [year, month, day]
    );

    return (
        <div className="flex flex-col relative">
            <div className="w-full grid grid-cols-8 border border-base-300 text-sm font-medium sticky top-0">
                <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300"></div>
                {weekdays.map((weekday, i) => (
                    <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
                        {weekday.longName}
                    </div>
                ))}
            </div>
            <div className="w-full grid grid-cols-8 border border-base-300 text-sm font-medium">
                <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300"></div>
                {weekByYearMonthAndDate.map((day, i) => (
                    <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300 text-xs font-light" key={i}>
                        {day.day} {day.month}
                    </div>
                ))}
            </div>
            {timeRanges.map((timeRange, i) => (
                <div className="w-full grid grid-cols-8 border border-base-300 text-sm font-medium" key={i}>
                    <div className="h-auto py-2 flex justify-center items-center w-full bg-base-100 border-r border-base-300">
                        {timeRange.start} <br /> {timeRange.end}
                    </div>
                    {weekdays.map((day, i) => (
                        <div className="h-auto flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
                            {day.index}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default WeekView
