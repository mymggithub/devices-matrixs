  var font_size = 5;
  var c_arr = [];
  var ctx_arr = [];
  var drops = [];
  var str_arr = "";
  // var colors = ["#ff0a22","#42ecff","#02d82d"];
  // var c_color = [];
  $(".matrix").each(function(index, el) {
  	c_arr[index] = $(this)[0];
  	ctx_arr[index] = c_arr[index].getContext("2d");
  	str_arr = $(c_arr[index]).text().split("");
  	// c_color[index] = colors[Math.floor(Math.random() * 3)];
  });


  //making the canvas full screen
  matrix_resize_init();
  $( window ).resize(function() {
    matrix_resize_init();
  });

  function matrix_resize_init(argument) {
  	$(".matrix").each(function(index, el) {
	    c_arr[index].height = $(c_arr[index]).parent().height()+20//window.innerHeight;
	    c_arr[index].width = $(c_arr[index]).parent().width()+20//window.innerWidth;
	    var columns = c_arr[index].width/font_size; //number of columns for the rain
	    //an array of drops - one per column
	    drops[index] = [];
	    //x below is the x coordinate
	    //1 = y co-ordinate of the drop(same for every drop initially)
	    for(var x = 0; x < columns; x++)
	      drops[index][x] = 1;
  	});
  }


  //drawing the characters
  function draw()
  {
  	for (var i = 0; i < ctx_arr.length; i++) {
	    //Black BG for the canvas
	    //translucent BG to show trail
	    ctx_arr[i].fillStyle = "rgba(0, 0, 0, 0.05)";
	    ctx_arr[i].fillRect(0, 0, c_arr[i].width, c_arr[i].height);
	    ctx_arr[i].fillStyle = "#42ecff"; //green text
	    ctx_arr[i].font = font_size + "px arial";
	    //looping over drops
	    for(var j = 0; j < drops[i].length; j++)
	    {
	      var text = str_arr[Math.floor(Math.random()*str_arr.length)];
	      //x = i*font_size, y = value of drops[i]*font_size
	      // console.log();
	      ctx_arr[i].fillText(text, j*font_size, drops[i][j]*font_size);
	      //sending the drop back to the top randomly after it has crossed the screen
	      //adding a randomness to the reset to make the drops scattered on the Y axis
	      if(drops[i][j]*font_size > c_arr[i].height && Math.random() > 0.975)
	        drops[i][j] = 0;
	      //incrementing Y coordinate
	      drops[i][j]++;
	    }
  	}
  }

  setInterval(draw, 33);