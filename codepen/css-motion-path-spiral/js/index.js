var m = document.querySelectorAll('.mover');

if (CSS && CSS.supports && CSS.supports('motion-offset', 0)) {
  var time = 9000;
  for (var i = 0, len = m.length; i < len; ++i) {
    var player = m[i].animate([
      { motionOffset: '100%' },
      { motionOffset: 0 }
    ], {
      duration: time,
      iterations: Infinity,
      fill: 'both',
      easing: 'ease-in',
      delay: time * (i / m.length)
    });
    var scaler = m[i].animate([
      { transform: 'scale(.01)', opacity: .01, offset: 0 },
      { transform: 'scale(1)', opacity: 1, offset: .01 },
      { transform: 'scale(.01)', opacity: .01, offset: 1 }
    ], {
      duration: time,
      iterations: Infinity,
      direction: 'normal',
      fill: 'both',
      easing: 'cubic-bezier(0.55,0.055,0.675,0.19)',
      delay: time * (i / m.length)
    });
  }
} else {
  document.documentElement.className = 'no-motionpath'
}