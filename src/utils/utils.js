export const generateCalendarDays = (currentDate) => {
  // Create a Date object and set it to the first of the month
  const startOfCalendar = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  // If the month does not start on SUN, the start of the calendar, get the correct day number for the previous month
  if (startOfCalendar.getDay() > 0) {
    startOfCalendar.setDate(
      startOfCalendar.getDate() - startOfCalendar.getDay()
    )
  }
  // Map the max number of days in the calendar and create an array to build the calendar from
  return Array(42)
    .fill(null)
    .map(() => {
      const currentDay = new Date(startOfCalendar)
      startOfCalendar.setDate(startOfCalendar.getDate() + 1)
      return currentDay
    })
}

export const calcDaysInWeek = (days, week) => {
  const dayArray = []
  for (let i = week * 7; i < week * 7 + 7; i++) {
    dayArray.push(days[i])
  }
  return dayArray
}

export const getDayIdentifier = (dayObj) => {
  return `${dayObj.getMonth()}${dayObj.getDate()}${dayObj.getFullYear()}`
}

export const convertDayStringToDate = (dateString) => {
  const month =
    parseInt(dateString.substring(0, 2)) <= 12
      ? dateString.substring(0, 2)
      : dateString.substring(0, 1)
  const year = dateString.substring(dateString.length - 4)
  const dayLength = dateString.length - month.length - year.length
  const day = dateString.substring(month.length, month.length + dayLength)
  return new Date(parseInt(year), parseInt(month), parseInt(day))
}

export const convertServerData = (serverData) => {
  return serverData.reduce((acc, val) => {
    const valInputValues = { ...val }
    delete valInputValues.dateString
    acc[val.dateString] = valInputValues
    return acc
  }, {})
}

export const convertUiData = (uiData) => {
  return Object.keys(uiData).reduce((acc, val) => {
    const convertedDayData = { dateString: val, ...uiData[val] }
    return [...acc, convertedDayData]
  }, [])
}

export const removeReadOnlyFields = (inputValues, includeUsername = true) => {
  const inputValuesCopy = { ...inputValues }
  const fieldsToRemove = ['createdAt', 'owner', 'updatedAt']
  if (includeUsername) fieldsToRemove.push('username')
  for (let field of fieldsToRemove) {
    delete inputValuesCopy[field]
  }
  return inputValuesCopy
}

export const calculateNumTrueInputs = (inputData, programPhase) => {
  const phase1Inputs = [
    'task1',
    'task2',
    'task3',
    'coldShower',
    'activeVisualization',
  ]

  return Object.keys(inputData).filter((inputName) => {
    if (programPhase === 'standard') {
      if (phase1Inputs.includes(inputName)) {
        return false
      }
      return inputData[inputName]
    } else {
      return inputData[inputName]
    }
  }).length
}

export const getCurrentStreak = (
  dayData,
  todaysDate,
  startDate,
  programPhase,
  programType
) => {
  const completedDays = Object.keys(dayData).filter((dayString) => {
    if (convertDayStringToDate(dayString).getTime() < startDate) return false

    const numTrueInputs = calculateNumTrueInputs(
      dayData[dayString],
      programPhase
    )

    if (programPhase === 'standard' && numTrueInputs === 7) {
      return true
    } else if (programPhase === 'phase1' && numTrueInputs === 12) {
      return true
    } else {
      return false
    }
  })

  if (programType === 'soft') {
    return completedDays.length
  } else {
    const sortedDayteStrings = completedDays.sort((a, b) => {
      const aDate = convertDayStringToDate(a)
      const bDate = convertDayStringToDate(b)

      if (aDate > bDate) {
        return 1
      } else {
        return -1
      }
    })

    let compareDate = new Date(startDate)
    let dayStreak = 0
    let programDays = Math.round(
      (todaysDate.getTime() - startDate) / (1000 * 60 * 60 * 24)
    )
    for (let i = 0; i < sortedDayteStrings.length; i++) {
      if (
        convertDayStringToDate(sortedDayteStrings[i]).getTime() ===
        compareDate.getTime()
      ) {
        dayStreak += 1
      } else {
        break
      }
      compareDate.setDate(compareDate.getDate() + 1)
    }

    if (dayStreak < programDays - 1) {
      return 0
    } else {
      return dayStreak
    }
  }
}
