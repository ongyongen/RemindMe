const textInput = document.getElementById("text-input")
const timerDurationInput = document.getElementById("timer-duration-input")
const timeInput = document.getElementById("time-input")

const saveBtn = document.getElementById("save-btn")
const reminderElement = document.getElementById("reminder")

const formatDisplayHour = (setHour) => {
    const displayHour = setHour == 0 || setHour == 12 ? 12 
                        : setHour >= 13 ? setHour % 12 >= 10 ? `${setHour % 12}` : `0${setHour % 12}`
                        : setHour
    return displayHour
}

const formatDisplaySetTime = (setHour, displayHour, displayMin) => {
    return setHour >= 12 ? `${displayHour}:${displayMin} PM` : `${displayHour}:${displayMin} AM`
}

const formatDisplayMessage = (reminder, displaySetTime, duration) => {
    return `${reminder} at ${displaySetTime} (Notify ${duration} mins before)`
}

saveBtn.addEventListener("click", () => { 
    const reminder = textInput.value
    const duration = timerDurationInput.value
    const setTime =  timeInput.value
    const setTimeHourMins = timeInput.value.split("T")[1]

    const setHour = setTimeHourMins.split(":")[0]
    const displayMin = setTimeHourMins.split(":")[1]

    const displayHour = formatDisplayHour(setHour)
    const displaySetTime = formatDisplaySetTime(setHour, displayHour, displayMin)
    reminderElement.textContent = formatDisplayMessage(reminder, displaySetTime, duration)

    chrome.storage.sync.set(
        {reminder, duration, setTime}, 
        () => {
            console.log(`${reminder}, ${duration}, ${setTime}`)
        })
})

chrome.storage.sync.get(["reminder","duration", "setTime"], (res) => {
    const reminder = res.reminder
    const duration = res.duration
    const setTimeHourMins = res.setTime.split("T")[1]

    const setHour = setTimeHourMins.split(":")[0]
    const displayMin = setTimeHourMins.split(":")[1]
    const displayHour = formatDisplayHour(setHour)
    const displaySetTime = formatDisplaySetTime(setHour, displayHour, displayMin)
    reminderElement.textContent = formatDisplayMessage(reminder, displaySetTime, duration)
})

