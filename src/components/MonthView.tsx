import { useMemo } from "react"
import { getWeeksByYearAndMonth, weeks, weekdays } from "../helpers/calendar"

const MonthView = ({year, month, day}:{year: number, month: number, day: number}) => {
    const weeksByYearAndMonth = useMemo(
        () => getWeeksByYearAndMonth(year, month),
        [year, month]
    );

    return (
        <div className="flex flex-col relative">
            <div className="w-full grid grid-cols-7 border border-base-300 text-sm font-medium sticky top-0">
                {weekdays.map((weekday, i) => (
                    <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
                        {weekday.longName}
                    </div>
                ))}
            </div>
            {weeks.map((weekNo) => (
                <div className="w-full grid grid-cols-7 border border-base-300 text-sm font-medium" key={weekNo}>
                    {weekdays.map((weekday, i) => (
                        <div className={`h-20 flex justify-center items-center w-full bg-base-100 border-r border-base-300 ${weeksByYearAndMonth[weekNo][weekday.index] == day ? "bg-info text-info-content" : ""}`} key={i}>
                            {weeksByYearAndMonth[weekNo][weekday.index]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MonthView
