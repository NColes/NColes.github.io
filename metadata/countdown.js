var endDate = new Date("2016-12-25");

function getTimeRemaining(endtime){
  t = Date.parse(endtime) - Date.parse(new Date());
  seconds = Math.floor( (t/1000) % 60 );
  minutes = Math.floor( (t/1000/60) % 60 );
  hours = Math.floor( (t/(1000*60*60)) % 24 );
  days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
};

function updateClock(){
    var t = getTimeRemaining(endDate);

    document.getElementById("daysSpan").innerHTML = t.days;
    document.getElementById("hoursSpan").innerHTML = t.hours;
    document.getElementById("minutesSpan").innerHTML = t.minutes;
    document.getElementById("secondsSpan").innerHTML = t.seconds;
};

updateClock(endDate); // run function once at first to avoid delay
var timeinterval = setInterval(updateClock,1000);