import { timeRanges, months, getWeekday } from "../helpers/calendar"
import { CalendarDataType } from "../types/types"

const DayView = ({ 
    year, 
    month, 
    day,
    data
}: { 
    year: number, 
    month: number, 
    day: number,
    data: CalendarDataType[]
}) => {
    return (
        <div className="flex flex-col divide-y divide-base-300 border border-base-300 relative">
            <div className="w-full flex border-x border-base-300 text-sm font-medium sticky top-0">
                <div className="w-[8rem] flex-shrink-0 justify-center items-center w-full bg-base-100 border-r border-base-300"></div>
                <div className="w-full">
                    <div className="py-2 flex items-center justify-between px-3">
                        <div>{day} {months.find(e => e.index == month)?.longName}, {year}</div>
                        <div className="ml-auto">{getWeekday(year, month, day)}</div>
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
