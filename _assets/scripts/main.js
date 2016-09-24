(function () {
    var logoFiles = ["/assets/images/logo1.png", 
                     "/assets/images/logo2.png", 
                     "/assets/images/logo3.png", 
                     "/assets/images/logo4.png", 
                     "/assets/images/logo5.png", 
                     "/assets/images/logo6.png", 
                     "/assets/images/logo7.png", 
                     "/assets/images/logo8.png", 
                     "/assets/images/logo9.png", 
                     "/assets/images/logo10.png"];

    var randomNumberPrev = 0;

    var logoTimer = function () {
        var randomNumber = Math.floor(Math.random() * 10); 
        if (randomNumber === randomNumberPrev) {
            randomNumber = (randomNumber + 1) % 10;
        }
        var t = logoFiles[randomNumber];

        document.getElementById("logo").src = t;
        randomNumberPrev = randomNumber;
    };

    var changeLogo = setInterval(logoTimer, 1000);
})(document);