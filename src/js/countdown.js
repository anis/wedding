window.addEventListener('load', function () {
    var dueDate = new Date(2016, 9, 22, 14, 30, 0),
        containers = {
            'months': document.getElementById('months'),
            'days': document.getElementById('days'),
            'hours': document.getElementById('hours'),
            'minutes': document.getElementById('minutes'),
            'seconds': document.getElementById('seconds')
        };

    function refresh() {
        var months = 0,
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0,
            now = new Date(Date.now() + ((abs - rel) * 1000)),
            d;

        if (now.getTime() < dueDate.getTime()) {
            // months
            months = Math.max(0, dueDate.getMonth() - now.getMonth() - 1);

            // days
            if (now.getMonth() !== dueDate.getMonth()) {
                d = new Date()
                d.setDate(d.getDate() + 1);

                while (d.getMonth() === now.getMonth()) {
                    days += 1;
                    d.setDate(d.getDate() + 1);
                }

                days += dueDate.getDate() - 1;
            } else {
                days += Math.max(0, dueDate.getDate() - now.getDate() - 1);
            }

            // total seconds
            if (now.getMonth() !== dueDate.getMonth() || now.getDate() !== dueDate.getDate()) {
                // remaining of today
                seconds += (new Date(now.getYear(), now.getMonth(), now.getDate(), 23, 59, 59).getTime() - now.getTime()) / 1000;

                // the d-day
                seconds += (dueDate.getTime() - new Date(dueDate.getYear(), dueDate.getMonth(), dueDate.getDate(), 0, 0, 0).getTime()) / 1000;
            } else {
                seconds += (dueDate.getTime() - now.getTime()) / 1000;
            }

            // convert the seconds into days/hours/minutes/seconds
            days += Math.floor(seconds / (24 * 3600));
            seconds = seconds % (24 * 3600);

            if (days > 31) {
                months += Math.floor(days / 31);
                days -= Math.floor(days / 31) * 31;
            }

            hours += Math.floor(seconds / 3600);
            seconds = seconds % 3600;

            minutes += Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);
        }

        // the end of a long journey, goddamit
        containers.months.innerHTML = months;
        containers.days.innerHTML = days;
        containers.hours.innerHTML = hours < 10 ? '0' + hours : hours;
        containers.minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        containers.seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }

    window.showCountdown = function () {
        refresh();
        setInterval(refresh, 1000);

        document.getElementById('countdown').style.opacity = 1;
    };
});