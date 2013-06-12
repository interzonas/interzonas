$(document).ready(function(){
  //Efecto proyectos
  var cancel;
  //var container = document.getElementById('container');
  var slide = document.getElementById('slide2');
  var renderer = new FSS.CanvasRenderer();
  var scene = new FSS.Scene();
  var light = new FSS.Light('#0f0f0f', '#53555C');
  var geometry = new FSS.Plane(slide.offsetWidth,  slide.offsetHeight, 18, 18);
  var material = new FSS.Material('#ffffff', '#ffffff');
  var mesh = new FSS.Mesh(geometry, material);
  var now, start = Date.now();

  //init
  function initialise() {
    scene.add(mesh);
    scene.add(light);
    container.appendChild(renderer.element);
    renderer.setSize(slide.offsetWidth, slide.offsetHeight);
    light.setPosition(10,10,30);
    renderer.render(scene);
  }

  function animate() {
    now = Date.now() - start;
    light.setPosition(600*Math.sin(now*0.0006), 600*Math.cos(now*0.0002), 30);
    renderer.render(scene);
    cancel = requestAnimationFrame(animate);
  }

  $("section#slide2").mouseenter(function(){
    initialise();
    animate()
  }).mouseleave(function(){
    cancelAnimationFrame(cancel);
  });
  //fin efecto entrada

  //Fondo fotos instragram 
  var fondoinst = function(){
    var urls = ['https://api.instagram.com/v1/users/35055330/media/recent/?access_token=35055330.467ede5.671e3e299f1c4e4dababa2a32671161c', 
                'https://api.instagram.com/v1/users/30654164/media/recent/?access_token=30654164.467ede5.0c52cd56ea634cb9981e8b7d6039d684'];
    var url = urls[Math.floor(Math.random() * urls.length)];

    $.ajax({
      type: 'GET',
      url: url,
      async: false,
      jsonpCallback: 'jsonCallback',
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(json) {
        var numero = Math.floor((Math.random()*json.data.length)+1);
         $('#slide3').css("background-repeat", "none");
         $('#slide3').css("background-image", "url("+json.data[numero].images.standard_resolution.url+")"); 
         $('#slide3').css("background-size", "cover");
        },
      error: function(e) {
         console.log(e.message);
      }
    });
  }

  $('ul.nav a').smoothScroll({
      afterScroll: function() {
        $('ul.nav li a').each(function(){
          $(this).removeClass('active');
        })

        $(this).addClass('active')
      },
      easing: 'swing',
      speed: 2000,
      autoCoefficent: 3

    });

  try{
    Typekit.load();
  }catch(e){
    console.log(e);
  }

  $('#f-contacto').hide();
  $('#formulario').click(function(e){
     e.preventDefault();
    $('#f-contacto').fadeIn('600');
    formularioContacto(this);
  });

  var formularioContacto = function(id){
    $.smoothScroll({
      scrollTarget:'#f-contacto'
    });
  }

  $(document).keyup(function(e) {
    if(e.keyCode === 37 || e.keyCode === 39){
      fondoinst();
    }
    if (e.keyCode === 27) { 
     $('#proyectos-slide').css("visibility", "hidden");
     $('#proyectos-slide').css("left", "100%");
    }
  });

  $('.proyectos').click(function(){
    $('#proyectos-slide').css("visibility", "visible");
    $('#proyectos-slide').css("left", "0");
    //return false;
  });

  $('.close').click(function(){
    $('#proyectos-slide').css("visibility", "hidden");
    $('#proyectos-slide').css("left", "100%");
  });

  $('.pregunta').click(function(){
    $('#proyectos-slide').css("visibility", "hidden");
    $('#proyectos-slide').css("left", "100%");
  });

  $('#enter').click(function(e){
    e.preventDefault();
    var data = {};
    data.nombre = $('#formularioNombre').val();
    data.texto = $('#formularioTexto').val()
    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: 'http://localhost:3000/enter', 
      success: function(data) {
      }
    });
    $('#f-contacto').fadeOut('600');
  });

  $('.x').click(function(e){
    e.preventDefault();
    $('#f-contacto').fadeOut('600');
  });
  
  fondoinst(); 



      var stage = document.getElementById('stage');
      
      var color = "#" + genHex();
      var springs = [];
      var storeY;
      var extend = 100;
      var fK = .95;
      var particles = [];
      var currentDrag = null;
      var mouseX = 0;
      var mouseY = 0;
      var stageWidth = $('#footer').width();
      var stageHeight = $('#footer').height();
      stage.width = stageWidth;
      stage.height = stageHeight;
      
      var IE = document.all ? true : false;
      if(!IE) document.addEventListener(Event.MOUSEMOVE, getMouseXY, false);
      $("section#footer").mouseenter(function(){
        document.onmousemove = getMouseXY;
      }).mouseleave(function(){
      });
      
      
      generate();
      
      var drawingCanvas = document.getElementById('stage');
      if(drawingCanvas.getContext)
      {
        var context = drawingCanvas.getContext('2d');
        setInterval(render, 20);
      }
      
      
      function genHex()
      {
        colors = new Array(14)
        colors[0]="0"
        colors[1]="1"
        colors[2]="2"
        colors[3]="3"
        colors[4]="4"
        colors[5]="5"
        colors[5]="6"
        colors[6]="7"
        colors[7]="8"
        colors[8]="9"
        colors[9]="a"
        colors[10]="b"
        colors[11]="c"
        colors[12]="d"
        colors[13]="e"
        colors[14]="f"
        
        digit = new Array(5)
        color=""
        for (i=0;i<6;i++)
        {
          digit[i]=colors[Math.round(Math.random()*14)]
          color = color+digit[i]
        }
        
        return '00a3d9';
      }
      
      
      function generate()
      {
        var total = Math.ceil(stageWidth / 25);
        springs = [];
        particles = [];
        
        var space = (stageWidth + extend) / total;
        var xpos = (space * .5) - (extend * .5);
        var ypos = stageHeight * .5;
        
        for(var i = 0; i < total; i++)
        {
          var particle = {};
          particle.x = particle.xpos = xpos;
          particle.y = particle.ypos = particle.origY = ypos;
          particle.ay = 0;
          particle.vy = 0;
          particle.mass = 10;
          particles[particles.length] = particle;
          
          xpos += space;
        }
        
        
        storeY = mouseY;
        for(var u = 0; u < particles.length-1; u++) springs.push({iLengthY:(particles[u+1].y - particles[u].y)});
      }
      
      
      function mouseMove()
      {
        var particle = null;
        var smallestDist = Infinity;
        var target = null;
        
        var j = particles.length;
        while(--j > -1)
        {
          var dx = mouseX - particles[j].x;
          var dy = mouseY - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          
          if(dist < smallestDist)
          {
            particle = particles[j];
            smallestDist = dist;
            target = j;
          }
        }
        
        if(particle && mouseY > particle.y)
        {
          var speed = mouseY - storeY;
          
          particles[target - 2].vy = speed / 6;
          particles[target - 1].vy = speed / 5;
          particles[target].vy = speed / 3;
          particles[target + 1].vy = speed / 5;
          particles[target + 2].vy = speed / 6;
        
          storeY = mouseY;
        }
      }
      
      
      function render()
      {
        for(var u = particles.length-1; u >= 0; --u)
        {
          var fExtensionY = 0;
          var fForceY = 0;
        
          if(u > 0)
          {
            fExtensionY = particles[u-1].y - particles[u].y - springs[u-1].iLengthY;
            fForceY += -fK * fExtensionY;
          }
          
          if(u < particles.length-1)
          {
            fExtensionY = particles[u].y - particles[u+1].y - springs[u].iLengthY;
            fForceY += fK * fExtensionY;
          }
          
          fExtensionY = particles[u].y - particles[u].origY;
          fForceY += fK/15 * fExtensionY;
          
          particles[u].ay = -fForceY/particles[u].mass;
          particles[u].vy += particles[u].ay;
          particles[u].ypos += particles[u].vy;
          particles[u].vy /= 1.04;
        }
        
        context.clearRect(0, 0, stageWidth, stageHeight);
        context.fillStyle = color;
        context.beginPath();
        
        for(u = 0; u < particles.length; u++)
        {
          if(u==0)
          {
            context.moveTo(particles[u].xpos+(particles[u+1].xpos-particles[u].xpos)/2,particles[u].ypos+(particles[u+1].ypos-particles[u].ypos)/2);
          }
          else if(u < particles.length-1)
          {
            context.quadraticCurveTo(particles[u].xpos,particles[u].ypos,particles[u].xpos+(particles[u+1].xpos-particles[u].xpos)/2,particles[u].ypos+(particles[u+1].ypos-particles[u].ypos)/2);
          }
          particles[u].x = particles[u].xpos;
          particles[u].y = particles[u].ypos;
        }
        
        context.lineTo(stageWidth+50, stageHeight+50);
        context.lineTo(-50, stageHeight+50);
        context.lineTo(-50, stageHeight/2);
        context.closePath();
        context.fill();
        
        /*var i = particles.length;
        while(--i > -1)
        {
          context.fillStyle = "#000000";
          context.beginPath();
          context.arc(particles[i].x,particles[i].y,1,0,Math.PI*2,true);
          context.closePath();
          context.fill();

        }*/
      }
      
      function getMouseXY(e)
      {
          if(IE)
          {
            mouseX = event.clientX + document.body.scrollLeft
            mouseY = event.clientY + document.body.scrollTop
          }
          else
          {
            mouseX = e.pageX
            mouseY = e.pageY
          }  
          
          if(mouseX < 0) {mouseX = 0;}
          if(mouseY < 0) {mouseY = 0;}  
          
          mouseMove();
          
          return true;
      }

})
