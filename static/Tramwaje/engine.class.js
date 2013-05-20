function Engine() {
	var tramwajs = new Array(),
		stage,
		time_calc,
		layer,
		time_step,
		size_of_time,
		width,height,
		animacja,
		harmonogram,
		desc,
		time_height_half,
		time_height=1800;
	
		
	var frameCount = 0;
	var currentSecond = 0;
	var frameRate = 0;

	findDates = function () {
		var fd = new Array();
		var now = new Date().getTime();
		var thh = time_height_half*1000;
		var from  = now	 - (thh + 3*60 *1000);
		var to  = now	 + thh ;
		//console.log(from);
		//	console.log(to);
		
		for (var i=0;i<harmonogram.length;i++){
			if ((harmonogram[i]>= from) &&
				(harmonogram[i]<= to)) {
				fd.push(harmonogram[i]);
				console.log(harmonogram[i]);
			}
				
		}
		
		return fd;
	}

	findPos = function () {		
		var now = new Date().getTime();
		var thh = time_height_half*1000;
		var from  = now	 - (thh + 3*60 *1000);
		var to  = now	 +thh;
		//console.log(from);
		//	console.log(to);
		
		for (var i=0;i<harmonogram.length;i++){
			if (harmonogram[i]>=from)
				return i;
			}
		
		return -1;
	}

	/*initTramwaj = function(line_number) {		
		h = findDates();

		for (var i=0;i<h.length;i++) {
			tramwajs[i] = new Tramwaj();
			//var tramwaj  = new Tramwaj();
			tramwajs[i].init(20, h[i], line_number, time_calc, time_height / height);		
			tramwajs[i].addTramwaj(layer);
			//tramwajs.push(tramwaj);
		}
		
	}*/
	
	initTramwaj = function(line_number) {		
		var off =findPos();
		for (var i=0;i<2;i++) {
			tramwajs[i] = new Tramwaj();
			//var tramwaj  = new Tramwaj();
			
			tramwajs[i].init(20, harmonogram[off +i], line_number, time_calc, time_height / height);		
			tramwajs[i].addTramwaj(layer);			
			
		}
		
	}
	
	initDesc = function () {
		desc = new Kinetic.Text({
			x: 100,
			y:0,
			text: "Następny za:",
			fontSize: 24,
			fontFamily: 'Arial',
			fill: 'black',
			align:'center',
			width:150
		});	
		layer.add(desc);
	}
	
	setText = function (t) {
		desc.setText(t);
	}
	
	
	
	initBackground = function (){
		var rect = new Kinetic.Rect({
			x:0,
			y:0,
			width: 100,
			height:height / 2,
			fillLinearGradientStartPoint: [0, 0],
			fillLinearGradientEndPoint: [0, height/2],
			fillLinearGradientColorStops: [0, 'rgb(20,20,20)', 1, 'rgb(60,60,60)']		
		});		
		
		layer.add(rect);
		
		
		
		var rect2 = new Kinetic.Rect({
			x:0,
			y:height / 2,
			width: 100,
			height:height / 2,
			fillLinearGradientStartPoint: [0, 0],
			fillLinearGradientEndPoint: [0, height / 2],
			fillLinearGradientColorStops: [0, 'rgb(70,70,70)', 1, 'rgb(110,110,110)']		
		});		
		
		layer.add(rect2);
		
		
		var rect3 = new Kinetic.Rect({
			x:100,
			y:0,
			width: width - 100,
			height:height ,
			fill: 'rgb(110,110,110)'		
		});		
		
		layer.add(rect3);
		
		
		line = new Kinetic.Line({
                    points: [35, 0, 35, height],
                    stroke: 'rgb(210,210,210)'
                });
		layer.add(line);
		
		line2 = new Kinetic.Line({
                    points: [65, 0, 65, height],
                    stroke: 'rgb(210,210,210)'
                });
		layer.add(line2);
	}
	
	
	this.init = function (id, harm, ln) {
		harmonogram = harm;
		width = 250;
		height = 300;
		time_height_half  =time_height / 2;

		time_calc = new TimeToPos();		
		time_calc.init(height, time_height_half, time_height_half);
		
		stage = new Kinetic.Stage({
			container: id,
			width: width,
			height: height
      });
		
		layer = new Kinetic.Layer();		
		
		
		
		initBackground();
		initTramwaj(ln);
		initDesc();
		
		stage.add(layer);

		initAnim();
	}
	
	updateFrameRate = function(time) {
		pos = time;
	}
	
	getTimeFromSeconds = function (seconds) {
		var minutes = Math.floor(seconds / 60);
		var sec = Math.floor(seconds - (minutes *60) );
		var hours = Math.floor(minutes / 60);
		if (hours>0){
			minutes-= hours*60;
		}
		
		console.log(seconds);
		return hours+":"+minutes+":"+sec;
	}
	
	initAnim = function (){
		animacja = new Kinetic.Animation(function(frame) {		
			var second = Math.floor(frame.time / 1000); // ms to integer seconds
			if (second != currentSecond) {
				var off =findPos();
				//frameRate = frameCount;
				//frameCount = 0;
				//console.log(off)
				currentSecond = second;
				var tim = new Date().getTime();
				for (var i=0;i<tramwajs.length;i++) {
					//if (harmonogram.length < i + off) {
						if (tim<harmonogram[i + off]) {
							setText("Następny za:\n"+ getTimeFromSeconds ((harmonogram[i + off] - tim)/1000)
							);
						}
						
						//if (off +i < harmonogram.length) 
							tramwajs[i].updateTramwajTime(harmonogram[i + off]);					
						//else 	
						//	tramwajs[i].updateTramwajTime(harmonogram[0]+1000000);					
						tramwajs[i].setTime();					
					//}
				
				}	
			}
			//frameCount ++;
		//updateFrameRate(frame.time);
				
		}, layer);
		
	}

	this.destroy = function () {
		delete animasja;
		for (var i=0;i<tramwajs.length;i++)
			tramwajs[i].destroy();
		//delete tramwaj;	
		delete stage;
		delete layer;
		delete time_calc;
	}

	this.animStart = function () {
		animacja.start();
	}

	this.animStop = function () {
		animacja.stop();
		this.destroy();
	}


}
