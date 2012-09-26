(function(Countdown, $, undefined) {
    //Nov 6, 2012 12:01 am

    var targetTime = new Date(2012, 10, 6, 0, 1),
 
    // digits 0 through 9
    segments = [
            ["t", "tl", "bl", "b", "br", "tr"],
            ["tr", "br"],
            ["t", "tr", "m", "bl", "b"],
            ["t", "tr", "m", "br", "b"],
            ["tl", "m", "tr", "br"],
            ["t", "tl", "m", "br", "b"],
            ["t", "tl", "m", "br", "b", "bl"],
            ["t", "tr", "br"],
            ["t", "tl", "bl", "b", "br", "tr", "m"],
            ["t", "tl", "b", "br", "tr", "m"]
        ],
    $container, digitWidth = 25,

    // offset and interval in deciseconds
    offset = 0, maxOffset = 50, interval = 0;

    $(function() {
        $container = $(".timer");
	setInterval(Countdown.refreshTimer, 100);
        Countdown.refreshTimer();
    });

    Countdown.refreshTimer = function ()
    {
	if (interval > 0) {
	    interval--;
	    return;
	}

        $container.find(".digit").remove();

	var timeRemaining = ((targetTime.getTime() - new Date().getTime()) / 1000) + offset/10;
        var daysRemaining = 0;
        var hoursRemaining = 0;
        var minutesRemaining = 0;
        var secondsRemaining = 0;
        if (timeRemaining > 0)
        {
            daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60));
            timeRemaining -= (daysRemaining * 24 * 60 * 60);
            hoursRemaining = Math.floor(timeRemaining / (60 * 60));
            timeRemaining -= hoursRemaining * 60 * 60;
            minutesRemaining = Math.floor(timeRemaining / 60);
            timeRemaining -= minutesRemaining * 60;
            secondsRemaining = Math.floor(timeRemaining);
        }

//        console.log(daysRemaining,hoursRemaining,minutesRemaining,secondsRemaining);

        Countdown.drawNumberString(frontPad(daysRemaining, 4), 5, 5);
        Countdown.drawNumberString(frontPad(hoursRemaining, 2), 132, 2);
        Countdown.drawNumberString(frontPad(minutesRemaining, 2), 212, 1);
        Countdown.drawNumberString(frontPad(secondsRemaining, 2), 291, 0);

	var chance = Math.floor(Math.random()*100+1);
	console.log(chance);
	if (chance > 97) {
	    // Skip a tick
	    // console.log("skip");
	    interval = 20;
	} else if (chance < 10) {
	    // More likely to slow down if offset near ceiling,
	    // and more likely to speed up offset near floor.
	    var direction = Math.floor(Math.random()*2*maxOffset-maxOffset+1);
	    if (direction < offset) {
		offset = Math.max(offset-3, maxOffset*-1);
		interval = 13;
		// console.log("slower");
	    } else {
		offset = Math.min(offset+2, maxOffset);
		interval = 7;
		// console.log("faster");
	    }
	} else {
	    // Regular tick
	    // console.log("normal");
	    interval = 10;
	}
    };

    frontPad = function (number, digits)
    {
        var numberString = "" + number;
        var len = numberString.length;
        if (len < digits)
        {
            for (var i = 0; i < digits - len; i++)
            {
                numberString = "0" + numberString;
            }
        }
        return numberString;
    };

    Countdown.drawNumberString = function (numberString, x, y)
    {
        var len = numberString.length;
        for (var i = 0; i < len; i++)
        {
            var c = numberString.charCodeAt(i);
            var digit = c - "0".charCodeAt(0);
            Countdown.drawDigit(digit, x, y);
            x += digitWidth;
        }
    };

    Countdown.drawDigit = function (digit, x, y) {
        var $digit = $("<div class='digit'></div>");
        $.each(segments[digit], function () {
            var $segment = $("<div></div>");
            $segment.addClass("segment-" + this);
            $digit.append($segment);
        });
        $container.append($digit);
        $digit.css({"left": x, "top": y});
    };

})(window.Countdown = window.Countdown || {}, jQuery);