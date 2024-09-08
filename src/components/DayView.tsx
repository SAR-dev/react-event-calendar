import { timeRanges, months } from "../helpers/calendar"

const DayView = ({ year, month, day }: { year: number, month: number, day: number }) => {
    return (
        <div className="flex flex-col relative">
            <div className="w-full flex border border-base-300 text-sm font-medium sticky top-0">
                <div className="w-32 h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300"></div>
                <div className="w-auto">
                    <div className="h-8 flex items-center px-3">
                        {day} {months.find(e => e.index == month)?.longName}, {year}
                    </div>
                </div>
            </div>
            {timeRanges.map((timeRange, i) => (
                <div className="w-full flex border border-base-300 text-sm font-medium" key={i}>
                    <div className="w-32 h-auto py-2 flex justify-center items-center w-full bg-base-100 border-r border-base-300">
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
