const MINUTE = 60000
const SECOND = 1000
const SECTOR = 6

function timeLoop() {
  const nowTime = new Date(Date.now())
  const nowMinutes = nowTime.getMinutes()
  const nowSeconds = nowTime.getSeconds()

  let delayMinutes = SECTOR - (nowMinutes % SECTOR)
  let delaySeconds = 60 - nowSeconds

  // Clear Sectors
  if (nowMinutes == 0 && nowSeconds == 0) {
    let sectorList = document.querySelectorAll('.sector')
    sectorList.forEach(el => el.classList.remove('highlighted'))
    sectorList[0].classList.add('highlighted')
  }

  // console.log(`${nowMinutes % SECTOR} : ${nowSeconds}`)
  if (nowMinutes % SECTOR == 0 && nowSeconds == 0) {
    sound.play()

    // Highlight Sectors
    let sectorList = document.querySelectorAll('.sector')

    sectorList.forEach(el => {
      if (nowMinutes >= el.dataset.minutes) {
        el.classList.add('highlighted')
      } else {
        el.classList.remove('highlighted')
      }
    })
  }

  let delayDiv = document.querySelector('.delay')

  let displayMinutes = delayMinutes < 10 ? `0${(delayMinutes - 1).toString()}` : delayMinutes.toString()
  let displaySeconds = delaySeconds < 10 ? `0${delaySeconds.toString()}` : delaySeconds.toString()
  delayDiv.innerText = `${displayMinutes} : ${displaySeconds}`

  window.setTimeout(timeLoop, 1000)
}

let sound

window.addEventListener('load', (e) => {
  console.log('starting')

  //setup sectors
  const nowTime = new Date(Date.now())
  const nowMinutes = nowTime.getMinutes()
  const nowHour = nowTime.getHours()
  const displayHour = nowHour < 10 ? `0${nowHour.toString()}` : nowHour.toString()

  const sectorContainer = document.querySelector('.sectors')
  for (let min = 0; min < 60; min += SECTOR) {
    let displayMin = min < 10 ? `0${min.toString()}` : min.toString()

    let sector = document.createElement('div')
    sector.innerText = `${displayHour}:${displayMin}`
    sector.classList.add('sector')
    sector.dataset.minutes = min

    if (nowMinutes >= min) {
      sector.classList.add('highlighted')
    }
    sectorContainer.appendChild(sector)

    // console.log(`00:${displayMin}`)
  }

  sound = new Audio('sound.wav')

  timeLoop()
})
