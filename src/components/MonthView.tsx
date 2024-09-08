import { useMemo } from "react"
import { getWeeksByYearAndMonth, weeks, weekdays } from "../helpers/calendar"

const MonthView = ({year, month}:{year: number, month: number}) => {
    const weeksByYearAndMonth = useMemo(
        () => getWeeksByYearAndMonth(year, month),
        [year, month]
    );

    return (
        <div className="flex flex-col">
            <div className="w-full grid grid-cols-7 border border-base-300 text-sm font-medium">
                {weekdays.map((weekday, i) => (
                    <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
                        {weekday.longName}
                    </div>
                ))}
            </div>
            {weeks.map((weekNo) => (
                <div className="w-full grid grid-cols-7 border border-base-300 text-sm font-medium" key={weekNo}>
                    {weekdays.map((day, i) => (
                        <div className="h-20 flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
                            {weeksByYearAndMonth[weekNo][day.index]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default MonthView
