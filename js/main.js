function createTimer(targetDate) {
  const daysContainer = document.querySelector('.js-timer-days');
  const hoursContainer = document.querySelector('.js-timer-hours');
  const minutesContainer = document.querySelector('.js-timer-minutes');

  const daysPluralContainer = document.querySelector('.js-timer-days-plural');
  const hoursPluralContainer = document.querySelector('.js-timer-hours-plural');
  const minutesPluralContainer = document.querySelector('.js-timer-minutes-plural');

  function stepTimer() {
    const currentDate = new Date();

    let minutesRemaining = Math.floor(((targetDate - currentDate) / 1000) / 60); // milliseconds to seconds to minutes

    let hoursRemaining = Math.floor(minutesRemaining / 60);
    minutesRemaining -= Math.floor(hoursRemaining * 60);

    const daysRemaining = Math.floor(hoursRemaining / 24);
    hoursRemaining -= Math.floor(daysRemaining * 24);

    daysContainer.innerText = daysRemaining;
    hoursContainer.innerText = hoursRemaining;
    minutesContainer.innerText = minutesRemaining;

    daysPluralContainer.innerText = (daysRemaining === 1) ? '' : 's';
    hoursPluralContainer.innerText = (hoursRemaining === 1) ? '' : 's';
    minutesPluralContainer.innerText = (minutesRemaining === 1) ? '' : 's';

    requestAnimationFrame(stepTimer);
  }

  requestAnimationFrame(stepTimer);
}

const weddingDate = new Date(2022, 8 - 1, 26, 13);
createTimer(weddingDate);
