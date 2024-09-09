import { useState } from "react"
import { months, getYearsRange, getDaysOfMonth } from "./helpers/calendar"
import { CalendarDataType, CalendarViewTypes } from "./types/types"
import MonthView from "./components/MonthView"
import WeekView from "./components/WeekView"
import DayView from "./components/DayView"

const data: CalendarDataType[] = [
  {
    title: "Team Meeting",
    start_at: "2024-09-09T10:00:00+09:00",
    end_at: "2024-09-09T11:30:00+09:00"
  },
  {
    title: "Project Designing",
    start_at: "2024-09-09T10:00:00+09:00",
    end_at: "2024-09-09T12:00:00+09:00"
  },
  {
    title: "Project Deadline",
    start_at: "2024-09-09T15:00:00+09:00",
    end_at: "2024-09-09T16:00:00+09:00"
  },
  {
    title: "Client Presentation",
    start_at: "2024-09-09T09:30:00+09:00",
    end_at: "2024-09-09T10:30:00+09:00"
  },
  {
    title: "Workshop",
    start_at: "2024-09-09T14:00:00+09:00",
    end_at: "2024-09-09T17:00:00+09:00"
  },
  {
    title: "Monthly Review",
    start_at: "2024-09-25T11:00:00+09:00",
    end_at: "2024-09-25T12:00:00+09:00"
  }
]

const App = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [date, setDate] = useState(new Date().getDate())
  const [view, setView] = useState<CalendarViewTypes>(CalendarViewTypes.DAY)

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full flex justify-between items-center mb-3">
        <div className="flex gap-3">
          <select
            value={date}
            className="select select-xs select-bordered w-14"
            onChange={e => setDate(parseInt(e.target.value))}
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
      {view == CalendarViewTypes.DAY && <DayView year={year} month={month} date={date} data={data} />}
      {view == CalendarViewTypes.WEEK && <WeekView year={year} month={month} date={date} data={data} />}
      {view == CalendarViewTypes.MONTH && <MonthView year={year} month={month} date={date} data={data} />}
    </div>
  )
}

export default App
