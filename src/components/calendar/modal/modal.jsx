// React
import { useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
// Styles
import './modal.css'
// State
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../../context/calendarContexts'
// Utils
import { calendarServer } from '../../../utils/calendarServer'
// Material UI
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const formControlLabelStyles = {
  marginRight: 0,
  marginTop: '.5rem',
}

export const Modal = ({ showConfetti }) => {
  // Main calendar state and dispatch function
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)

  // Reference to the modal, this will be used later to open and close it.
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const clearDayValues = () => {
    dispatch({ type: 'modal/clearDayValues', payload: state.selectedDay })
  }

  const modalInputChange = (event, dayIdentifier) => {
    const allowedInputNames = [
      'diet',
      'noAlcoholOrCheatMeal',
      'indoorWorkout',
      'outdoorWorkout',
      'oneGallonOfWater',
      'progressPicture',
      'read',
      'task1',
      'task2',
      'task3',
      'coldShower',
      'activeVisualization',
    ]
    if (allowedInputNames.includes(event.target.name)) {
      dispatch({
        type: `modal/changeInputValue`,
        payload: {
          dayIdentifier,
          inputName: event.target.name,
          value: !state.dayData[dayIdentifier][event.target.name],
        },
      })
    } else {
      console.error(`No input with the name '${event.target.name}'`)
    }
  }

  // Open the modal if a day is currently selected
  useEffect(() => {
    if (state.selectedDay) showModal()
  })

  // Allow the modal to be closed when the enter key on the keyboard is pressed
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') closeModal()
  }
  // Allow the modal to be closed by clicking on the backdrop
  const handleBackdropClick = (event) => {
    if (event.target.id === 'modal') closeModal()
  }

  // Sends data to the server when the modal is closed
  const handleModalClose = () => {
    const inputValues = state.dayData[state.selectedDay]
    const allInputValuesFalse = Object.values(inputValues).every((value) => {
      if (typeof value !== 'boolean') return true
      return value === false
    })

    if (state.exsistingDayData) {
      if (allInputValuesFalse) {
        calendarServer.deleteCalendarDayData(state.settings.username, state.selectedDay)
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      } else {
        // ****** Add another check to only update if inputs actually changed? ******
        calendarServer.updateCalendarDayData(state.settings.username, state.selectedDay, inputValues)
      }
    } else {
      if (!allInputValuesFalse) {
        const dayData = {
          dateString: state.selectedDay,
          ...inputValues,
        }
        calendarServer.createCalendarDayData(state.settings.username, dayData)
      } else {
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      }
    }

    // Trigger confetti
    const numInputsTrue = Object.values(
      state.dayData[state.selectedDay]
    ).filter((inputVal) => inputVal === true).length
    const inputsTrueGoal = state.settings.programPhase === 'standard' ? 7 : 12
    if (numInputsTrue >= inputsTrueGoal) {
      showConfetti()
    }
    dispatch({ type: 'modal/removeSelectedDay' })
  }

  return (
    <div>
      <dialog
        id='modal'
        className='dialog'
        onKeyDown={handleKeyDown}
        onClose={handleModalClose}
        onMouseDown={handleBackdropClick}
        ref={modalRef}>
        <Box>
          <FormGroup>
            <FormControlLabel
              label='Follow a diet'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='diet'
                  checked={state.dayData[state.selectedDay].diet}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='No alcohol or cheat meal'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='noAlcoholOrCheatMeal'
                  checked={
                    state.dayData[state.selectedDay].noAlcoholOrCheatMeal
                  }
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='45 min indoor workout'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='indoorWorkout'
                  checked={state.dayData[state.selectedDay].indoorWorkout}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='45 min outdoor workout'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='outdoorWorkout'
                  checked={state.dayData[state.selectedDay].outdoorWorkout}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Drink one gallon of water'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='oneGallonOfWater'
                  checked={state.dayData[state.selectedDay].oneGallonOfWater}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Progress picture'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='progressPicture'
                  checked={state.dayData[state.selectedDay].progressPicture}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Read ten pages'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='read'
                  checked={state.dayData[state.selectedDay].read}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            {state.settings.programPhase === 'phase1' && (
              <>
                <FormControlLabel
                  label='Task 1'
                  sx={formControlLabelStyles}
                  control={
                    <Checkbox
                      color='secondary'
                      name='task1'
                      checked={state.dayData[state.selectedDay].task1}
                      onChange={(event) =>
                        modalInputChange(event, state.selectedDay)
                      }
                    />
                  }
                />
                <FormControlLabel
                  label='Task 2'
                  sx={formControlLabelStyles}
                  control={
                    <Checkbox
                      color='secondary'
                      name='task2'
                      checked={state.dayData[state.selectedDay].task2}
                      onChange={(event) =>
                        modalInputChange(event, state.selectedDay)
                      }
                    />
                  }
                />
                <FormControlLabel
                  label='Task 3'
                  sx={formControlLabelStyles}
                  control={
                    <Checkbox
                      color='secondary'
                      name='task3'
                      checked={state.dayData[state.selectedDay].task3}
                      onChange={(event) =>
                        modalInputChange(event, state.selectedDay)
                      }
                    />
                  }
                />
                <FormControlLabel
                  label='Cold Shower'
                  sx={formControlLabelStyles}
                  control={
                    <Checkbox
                      color='secondary'
                      name='coldShower'
                      checked={state.dayData[state.selectedDay].coldShower}
                      onChange={(event) =>
                        modalInputChange(event, state.selectedDay)
                      }
                    />
                  }
                />
                <FormControlLabel
                  label='Active Visualization'
                  sx={formControlLabelStyles}
                  control={
                    <Checkbox
                      color='secondary'
                      name='activeVisualization'
                      checked={
                        state.dayData[state.selectedDay].activeVisualization
                      }
                      onChange={(event) =>
                        modalInputChange(event, state.selectedDay)
                      }
                    />
                  }
                />
              </>
            )}
          </FormGroup>
          <div>
            <Stack
              direction='row'
              pt={2}
              justifyContent='center'
              alignItems='center'
              spacing={2}
              color='secondary'>
              <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={closeModal}>
                Save
              </Button>
              <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={clearDayValues}>
                Clear
              </Button>
            </Stack>
          </div>
        </Box>
      </dialog>
    </div>
  )
}

Modal.propTypes = {
  showConfetti: PropTypes.func.isRequired,
}
