import { useMemo } from "react"
import { getWeeksByYearAndMonth, weeks, weekdays, timeRanges } from "../helpers/calendar"

const DayView = ({ year, month, day }: { year: number, month: number, day: number }) => {
    const weeksByYearAndMonth = useMemo(
        () => getWeeksByYearAndMonth(year, month),
        [year, month]
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

export default DayView
