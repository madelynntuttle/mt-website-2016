// NAV Toggle
(function (window, document) {
var menu = document.getElementById('menu'),
    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

function toggleHorizontal() {
    [].forEach.call(
        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
        function(el){
            el.classList.toggle('pure-menu-horizontal');
        }
    );
};

function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains('open')) {
        setTimeout(toggleHorizontal, 500);
    }
    else {
        toggleHorizontal();
    }
    menu.classList.toggle('open');
    document.getElementById('toggle').classList.toggle('x');
};

function closeMenu() {
    if (menu.classList.contains('open')) {
        toggleMenu();
    }
}

document.getElementById('toggle').addEventListener('click', function (e) {
    toggleMenu();
});

window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
})(this, this.document);


(function ($) {
    var $body = $('body');
    
    // About page - Look Around
    if ($body.hasClass('about')) {
        var steps = 12;
        var stepDivisor = 360 / steps;
        var $avatarImg = $('#me');
        var $avatar = $('#me-container');

        $body.mousemove(function(event) {
          // Get position of mouse
          var mX = event.pageX;
          var mY = event.pageY;

          // Get position of avatar
          var aX = $avatar.offset().left + $avatar.width() / 2;
          var aY = $avatar.offset().top + $avatar.height() / 2;
          // Avatar radius
          var aR = Math.min($avatar.width() / 2, $avatar.height() / 2);

          // Find the distance between them
          var d = Math.sqrt( (mX-aX)*(mX-aX) + (mY-aY)*(mY-aY) );

          // Is mouse near center?
          if (d <= aR) {
            $avatarImg.css('bottom', '0');
          }
          else {
            // Calculate the step angle
            var angle = (Math.atan2(aY - mY, aX - mX) * 180 / Math.PI) - 90;
              if (angle < 0) {
                  angle += 360;
              }
            var stepAngle = Math.round(angle / stepDivisor) * -300 - 300;
            $avatarImg.css('bottom', stepAngle);
          }
        });    
        
    }
    
    // Homepage - replace text
    if ($body.hasClass('home')) {
        $("#typed").typed({
        strings: ["purposeful", "focused", "thoughtful"],
        typeSpeed: 125,
        startDelay: 1000,
        backSpeed: 100,
        backDelay: 1000,
        loop: false
      });
    }
    
})(jQuery)