import { useState } from "react"
import { getMonths, getWeekdays } from "./constants/calendar"

function App() {
  const weekdays = getWeekdays()
  const months = getMonths()

  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(0)

  return (
    <div className="w-full h-screen p-5">
      <div className="w-full flex justify-center mb-3">
        {months[month].longName} {year}
      </div>
      <div className="flex flex-col">
        <div className="w-full grid grid-cols-7 border border-gray-300 text-sm font-medium">
          {getWeekdays().map((weekday, i) => (
            <div className="h-8 flex justify-center items-center w-full bg-gray-100 border-r border-gray-300" key={i}>
              {weekday.longName}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
