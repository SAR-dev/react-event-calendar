import { useMemo, useState } from "react"
import { getWeeksByYearAndMonth, weeks, weekdays, months, getYearsRange } from "./helpers/calendar"
import { CalendarViewTypes } from "./types"

function App() {
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(2)
  const [view, setView] = useState<CalendarViewTypes>(CalendarViewTypes.MONTH)

  const weeksByYearAndMonth = useMemo(
    () => getWeeksByYearAndMonth(year, month),
    [year, month]
  );

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex gap-3">
          <select 
            value={month} 
            className="select select-xs select-bordered w-28" 
            onChange={e => setMonth(parseInt(e.target.value))}
          >
            {months.map(e => (
              <option value={e.index}>{e.longName}</option>
            ))}
          </select>
          <select 
            value={year} 
            className="select select-xs select-bordered w-28" 
            onChange={e => setYear(parseInt(e.target.value))}
          >
            {getYearsRange().map(e => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>
        <div className="join join-horizontal">
          <button className="btn btn-sm join-item">Day</button>
          <button className="btn btn-sm join-item">Week</button>
          <button className="btn btn-sm join-item">Month</button>
        </div>
      </div>
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
    </div>
  )
}

export default App
