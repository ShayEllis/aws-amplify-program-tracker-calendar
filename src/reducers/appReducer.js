// Utils
import { convertServerData } from '../utils/utils'

// Initial state
export const initialState = {
  todaysDate: new Date(),
  calendarMonth: new Date(),
  dayData: {},
  selectedDay: null,
  exsistingDayData: null,
  settings: {},
}

// Reducers
export const reducer = (state, action) => {
  switch (action.type) {
    case 'app/loadCalenderDayData': {
      const formatedServerData = convertServerData(action.payload)

      return { ...state, dayData: { ...state.dayData, ...formatedServerData } }
    }
    case 'app/setUsername': {
      return {
        ...state,
        settings: { ...state.settings, username: action.payload },
      }
    }
    case 'app/setDefaultCalendarSettings': {
      const defaultSettings = {
        programStart: null,
        programType: 'hard',
        programLength: 75,
        programPhase: 'standard',
      }
      return { ...state, settings: { ...state.settings, ...defaultSettings } }
    }
    case 'app/changeSettingValues': {
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload.inputName]: action.payload.value,
        },
      }
    }
    case 'app/loadCalendarSettings': {
      return { ...state, settings: action.payload }
    }
    case 'calendar/previousMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() - 1,
          1
        ),
      }
    }
    case 'calendar/nextMonth': {
      return {
        ...state,
        calendarMonth: new Date(
          state.calendarMonth.getFullYear(),
          state.calendarMonth.getMonth() + 1,
          1
        ),
      }
    }
    case 'day/dayClick': {
      if (!state.dayData[action.payload]) {
        return {
          ...state,
          selectedDay: action.payload,
          exsistingDayData: false,
          dayData: {
            ...state.dayData,
            [action.payload]: {
              diet: false,
              noAlcoholOrCheatMeal: false,
              indoorWorkout: false,
              outdoorWorkout: false,
              oneGallonOfWater: false,
              progressPicture: false,
              read: false,
              task1: false,
              task2: false,
              task3: false,
              coldShower: false,
              activeVisualization: false,
            },
          },
        }
      } else {
        return { ...state, selectedDay: action.payload, exsistingDayData: true }
      }
    }
    case 'modal/clearDayValues': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload]: {
            ...state.dayData[action.payload],
            diet: false,
            noAlcoholOrCheatMeal: false,
            indoorWorkout: false,
            outdoorWorkout: false,
            oneGallonOfWater: false,
            progressPicture: false,
            read: false,
            task1: false,
            task2: false,
            task3: false,
            coldShower: false,
            activeVisualization: false,
          },
        },
      }
    }
    case 'modal/changeInputValue': {
      return {
        ...state,
        dayData: {
          ...state.dayData,
          [action.payload.dayIdentifier]: {
            ...state.dayData[action.payload.dayIdentifier],
            [action.payload.inputName]: action.payload.value,
          },
        },
      }
    }
    case 'modal/removeSelectedDay': {
      return { ...state, selectedDay: null, exsistingDayData: null }
    }
    case 'modal/deleteCalendarDayData': {
      const newDayData = { ...state.dayData }
      delete newDayData[action.payload]
      return { ...state, dayData: newDayData }
    }
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}
