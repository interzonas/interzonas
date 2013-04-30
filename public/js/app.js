$(document).ready(function(){
  //Efecto proyectos
  var cancel;
  var container = document.getElementById('container');
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

  function resize() {
    renderer.setSize(slide.offsetWidth, slide.offsetHeight);
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
         $('#slide3').css("background-size", "107%");
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
      }
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
})
