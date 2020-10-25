$(function() {
  var mode = 0;
  var timecounter = 0;
  var lapcounter = 0;
  var action;
  var lapnumber = 0;
  var timeminutes,
    timeseconds,
    timecentiseconds,
    lapminutes,
    lapseconds,
    lapcentiseconds;
  hideshowbuttons("#startbutton", "#lapbutton");
  $("#startbutton").click(function() {
    mode = 1;
    hideshowbuttons("#stopbutton", "#lapbutton");
    startAction();
  });
  $("#stopbutton").click(function() {
    hideshowbuttons("#resumebutton", "#resetbutton");
    clearInterval(action);
  });
  $("#resumebutton").click(function() {
    hideshowbuttons("#stopbutton", "#lapbutton");
    startAction();
  });
  $("#resetbutton").click(function() {
    location.reload();
  });
  $("#lapbutton").click(function() {
    if (mode) {
      clearInterval(action);
      lapcounter = 0;
      addLap();
      startAction();
    }
  });
  function hideshowbuttons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }
  function startAction() {
    action = setInterval(function() {
      timecounter++;
      if (timecounter == 100 * 60 * 100) timecounter = 0;
      lapcounter++;
      if (timecounter == 100 * 60 * 100) timecounter = 0;
      updateTime();
    }, 10);
  }
  function updateTime() {
    timeminutes = Math.floor(timecounter / 6000);
    timeseconds = Math.floor((timecounter % 6000) / 100);
    timecentiseconds = Math.floor((timecounter % 6000) % 100);
    $("#timeminute").text(format(timeminutes));
    $("#timesecond").text(format(timeseconds));
    $("#timecentisecond").text(format(timecentiseconds));
    lapminutes = Math.floor(lapcounter / 6000);
    lapseconds = Math.floor((lapcounter % 6000) / 100);
    lapcentiseconds = Math.floor((lapcounter % 6000) % 100);
    $("#lapminute").text(format(lapminutes));
    $("#lapsecond").text(format(lapseconds));
    $("#lapcentisecond").text(format(lapcentiseconds));
  }
  function format(number) {
    if (number < 10) return "0" + number;
    else return number;
  }
  function addLap() {
    lapnumber++;
    var mylapdetails =
      "<div class='lap'>" +
      "<div class='laptimetitle'>" +
      "Lap" +
      lapnumber +
      "</div>" +
      "<div class='laptime'>" +
      "<span>" +
      format(lapminutes) +
      "</span>" +
      ":<span>" +
      format(lapseconds) +
      "</span>" +
      ":<span>" +
      format(lapcentiseconds) +
      "</span>" +
      "</div>" +
      "</div>";
    $(mylapdetails).prependTo("#laps");
  }
});
