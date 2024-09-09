import { useState } from "react"
import { months, getYearsRange, getDaysOfMonth } from "./helpers/calendar"
import { CalendarViewTypes } from "./types"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import DayView from "./components/DayView"

function App() {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [day, setDay] = useState(new Date().getDate())
  const [view, setView] = useState<CalendarViewTypes>(CalendarViewTypes.DAY)

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex gap-3">
          <select
            value={day}
            className="select select-xs select-bordered w-14"
            onChange={e => setDay(parseInt(e.target.value))}
          >
            {getDaysOfMonth(year, month).map(e => (
              <option value={e}>{e}</option>
            ))}
          </select>
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
      {view == CalendarViewTypes.DAY && <DayView year={year} month={month} day={day} />}
      {view == CalendarViewTypes.WEEK && <WeekView year={year} month={month} day={day} />}
      {view == CalendarViewTypes.MONTH && <MonthView year={year} month={month} day={day} />}
    </div>
  )
}

export default App
