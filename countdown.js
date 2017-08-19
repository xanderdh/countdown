function countdown(data) {
    var set = {
        expire: {
            year: data.year ? data.year : 0,
            month: data.month ? data.month : 0,
            day: data.day ? data.day : 0,
            hour: data.hour ? data.hour : 0,
            min: data.min ? data.min : 0
        },
        callback: data.callback,
        end: data.end,
        expired: data.expired
    };

    function initializeTimer() {
        var endDate = new Date(set.expire.year, set.expire.month - 1, set.expire.day, set.expire.hour, set.expire.min);
        var currentDate = new Date();
        var seconds = (endDate - currentDate) / 1000;
        if (seconds > 0) {
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            
            minutes = (hours - Math.floor(hours)) * 60;
            hours = Math.floor((days - Math.floor(days)) * 24);
            seconds = Math.floor((minutes - Math.floor(minutes)) * 60);
            minutes = Math.floor(minutes);
            days = Math.floor(days);

            setTimePage(days, hours, minutes, seconds);

            function secOut() {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (hours === 0) {
                            if (days === 0) {
                                showMessage(timerId)
                            } else {
                                days--;
                                hours = 23;
                                minutes = 59;
                                seconds = 59;
                            }
                        }
                        else {
                            hours--;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                    else {
                        minutes--;
                        seconds = 59;
                    }
                }
                else {
                    seconds--;
                }
                setTimePage(days, hours, minutes, seconds);
            }

            timerId = setInterval(secOut, 1000);
        }
        else {
            set.expired();
        }
    }

    function setTimePage(d, h, m, s) {
        set.callback(d, h, m, s);
    }

    function showMessage(timerId) {
        set.end();
        clearInterval(timerId);
    }

    return initializeTimer();
}
