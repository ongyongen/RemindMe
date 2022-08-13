chrome.alarms.create({
    periodInMinutes: 1/60,
})

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.sync.get(["reminder", "duration", "setTime"], (res) => {
        const reminder = res.reminder
        const duration = res.duration
        const setTime = Date.parse(res.setTime)
        const currentTime = Date.parse(new Date())
        const diffTime = setTime - currentTime
        const triggerWindowTime = duration * 60000
        console.log(diffTime)
        if (diffTime == triggerWindowTime) {
            this.registration.showNotification("", {
                body: `${reminder} in ${duration} mins`,
                icon: "icon.png"
            }) 
        } 
    })

})


