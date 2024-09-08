import { useState } from "react"
import { getMonths, getWeekdays } from "./constants/calendar"
import { CalendarViewTypes } from "./types"

function App() {
  const weekdays = getWeekdays()
  const months = getMonths()

  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(0)
  const [view, setView] = useState<CalendarViewTypes>(CalendarViewTypes.MONTH)

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full flex justify-between items-center mb-3">
        <div>
          {months[month].longName} {year}
        </div>
        <div className="join join-horizontal">
          <button className="btn btn-sm join-item">Day</button>
          <button className="btn btn-sm join-item">Week</button>
          <button className="btn btn-sm join-item">Month</button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full grid grid-cols-7 border border-base-300 text-sm font-medium">
          {getWeekdays().map((weekday, i) => (
            <div className="h-8 flex justify-center items-center w-full bg-base-100 border-r border-base-300" key={i}>
              {weekday.longName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
