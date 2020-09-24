const daysEl= document.getElementById("days")
const hoursEl = document.getElementById("hours")
const minsEl= document.getElementById("minutes")
const secondsEl= document.getElementById("seconds")
// const daysEl = document.getElementById("days");
// const hoursEl = document.getElementById("hours");
// const minsEl = document.getElementById("mins");
// const secondsEl = document.getElementById("seconds");

const newYears = `1 Jan 2021`

function countDown(){
    const newYearsDate = new Date(newYears);   
    const currentDate= new Date();
    const totalseconds = Math.floor((newYearsDate - currentDate) / 1000)
    const daysd = Math.floor(totalseconds / 3600/ 24)
    const hoursd = Math.floor( totalseconds / 3600) % 24
    const minutesd = Math.floor( totalseconds / 60) % 60
    const secondsd = totalseconds % 60 
       

    daysEl.innerHTML = daysd
    hoursEl.innerHTML = hoursd
    minsEl.innerHTML = minutesd
    secondsEl.innerHTML = secondsd

    // console.log(days,hours,minutes,seconds);




    // console.log(Date(newYearsDate - currentDate) );
}
// initial Call
// countDown()

setInterval(countDown,1000)