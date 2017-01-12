// potatoDie heuristic programming

var w, h, pov;

window.onload = function () {

  w = window.innerWidth,
    h = window.innerHeight;

  var box = new Box(w/4, w/6, w/7, {x:w/2, y:h/2, z: 0});

  // Drag the child through the plane of its parent
  Draggable.create(document.getElementsByTagName('figure'), 
                   {
    type: 'x',
    onDragStart: function(event) {
      this.draggedSide = this.target.parentElement.className;
      this.lastX = this.x;
    },
    onDrag: function(event) {
      console.log ( this.x )
      var dx = this.x - this.lastX;
      box.update(this.draggedSide, dx);
      box.draw();

      this.lastX = this.x;
    }
  });

  // Put the eye at the perspective origin
  var po = window.getComputedStyle(document.body)['perspective-origin'].split(' ');
  var eye = document.querySelector('#eye');
  eye.style.left = po[0];
  eye.style.top = po[1];
  Draggable.create(eye, 
                   {
    onDragStart: function() {
      // document.body.style.background = "red";
    },
    onDrag: function(event) {
      document.body.style['perspective-origin'] = event.clientX + "px " + event.clientY + "px";
    }
  });
}

var Box = function(w, h, d, pos) {
  this.width = w;
  this.height = h;
  this.depth = d;
  this.position = pos;

  this.sides = this.designSides();

  this.addBoxToDom();
}

// All sides are first rotated 45deg around Y, to prevent having any normal ending up at right angles within its coordinate system's XY plane
Box.prototype.preRotate = 45;       

Box.prototype.designSides = function() {
  return {
    front:  {
      distance: this.depth/2,
      rotate: "rotateY(-90deg)",
      width: this.width,
      height: this.height
    },
    back:   {
      distance: this.depth/2,
      rotate: "rotateY(90deg)",
      width: this.width,
      height: this.height
    },
    right:  {
      distance: this.width/2,
      rotate: "rotateY(0deg)",
      width: this.depth,
      height: this.height
    },
    left:   {
      distance: this.width/2,
      rotate: "rotateY(180deg)",
      width: this.depth,
      height: this.height
    },
    top:    {
      distance: this.height/2,
      rotate: "rotateZ(-90deg)",
      width: this.depth,
      height: this.width
    },
    bottom: {
      distance: this.height/2,
      rotate: "rotateZ(90deg)",
      width: this.depth,
      height: this.width
    }
  };
};

/**
       * adds box to DOM and draws it based on model
       */
Box.prototype.addBoxToDom = function() {
  // The dombox is a container of 6 sides
  var dombox = document.createElement('article');
  dombox.className = "box";
  dombox.style.transform =
    "translate3d("+this.position.x + "px, " + this.position.y + "px, " + this.position.z + "px)";

  for ( var d in this.sides ) {
    // console.log ( d, this.sides[d], this.sides[d].transform )
    var sd = this.sides[d];

    var normalElem = document.createElement('section');
    normalElem.className = d;
    normalElem.style.transform = 
      "rotateY(" + this.preRotate + "deg) " +
      sd.rotate +
      "translateX(" + sd.distance + "px)";

    var face = document.createElement('figure');

    face.style.width = sd.width + "px";
    face.style.height = sd.height + "px";

    // Set all sides perpendicular to the normal (parent element).
    // Then translate along the normal, so it ends up at the box center and
    // the normal is sticking out in front
    face.style.transform = 
      "rotateY(90deg) " +
      "translateZ(" + (-sd.width/2) + "px) " +
      "translateY(" + (-sd.height/2) + "px)";

    normalElem.appendChild(face);
    dombox.appendChild(normalElem);

    // Store references for updating lateron
    this.sides[d].$normal = normalElem;
    this.sides[d].$face = face;
  }

  document.body.appendChild(dombox);
  this.dombox = dombox;
}

/**
       * Redraws the sides of the box, based on model data
       * Also repositions the box
       */
Box.prototype.draw = function(){
  var dombox = document.querySelector('.box');

  dombox.style.transform =
    "translate3d("+this.position.x + "px, " + this.position.y + "px, " + this.position.z + "px)";        
  var sides = this.sides;
  var preRotate = this.preRotate;

  drawFace('front', this.width, this.height, this.depth);
  drawFace('back', this.width, this.height, this.depth);
  drawFace('top', this.depth, this.width, this.height);
  drawFace('bottom', this.depth, this.width, this.height);
  drawFace('left', this.depth, this.height, this.width);
  drawFace('right', this.depth, this.height, this.width);


  function drawFace ( face, w, h, d) {
    var style = sides[face].$face.style;
    style.width = w + "px";
    style.height = h + "px";

    style.transform = 
      "rotateY(90deg) " +
      "translateZ(" + (-w/2) + "px) " + // repares displacement in local X after rotate 
      "translateY(" + (-h/2) + "px)";

    sides[face].$normal.style.transform = 
      "rotateY(" + preRotate + "deg) " +
      sides[face].rotate +
      "translateX(" + d/2 + "px)";                        
  }
}

/**
       * updates the model
       * @param  {[type]} side_label [description]
       * @param  {float} d          distance of drag
       */
var sin = Math.sin(Math.PI/4);
Box.prototype.update = function(side_label, d){
  // Why the factor 2???
  switch ( side_label ) {
    case 'front':
      this.depth += 2*d;
      this.position.x += sin * d;
      this.position.z += sin * d;
      break;
    case 'left':
      this.width += 2*d;
      this.position.x += (-sin * d);
      this.position.z += (sin * d);
      break;
    case 'top':
      this.height += 2*d;
      this.position.y -= d;
      break;            
    case 'bottom':
      this.height += 2*d;
      this.position.y += d;
      break;             
  }
}