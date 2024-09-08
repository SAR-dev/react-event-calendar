import { useState } from "react"
import { months, getYearsRange } from "./helpers/calendar"
import { CalendarViewTypes } from "./types"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import DayView from "./components/DayView"

function App() {
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(2)
  const [view, setView] = useState<CalendarViewTypes>(CalendarViewTypes.DAY)

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
          <button
            className={`btn btn-sm join-item ${view === CalendarViewTypes.DAY ? "btn-active" : ""}`}
            onClick={() => setView(CalendarViewTypes.DAY)}
          >
            Day
          </button>
          <button
            className={`btn btn-sm join-item ${view === CalendarViewTypes.WEEK ? "btn-active" : ""}`}
            onClick={() => setView(CalendarViewTypes.WEEK)}
          >
            Week
          </button>
          <button
            className={`btn btn-sm join-item ${view === CalendarViewTypes.MONTH ? "btn-active" : ""}`}
            onClick={() => setView(CalendarViewTypes.MONTH)}
          >
            Month
          </button>
        </div>
      </div>
      {view == CalendarViewTypes.DAY && <DayView year={year} month={month} day={5} />}
      {view == CalendarViewTypes.WEEK && <WeekView year={year} month={month} day={26} />}
      {view == CalendarViewTypes.MONTH && <MonthView year={year} month={month} />}
    </div>
  )
}

export default App
