function Tramwaj(){
	var rect,
		number,
		pos = 0,
		one_pixel,
		head,
		body,
		end,
		end_offset=32,
		
		t;
	
		
	loadImages = function (x_pos, pos) {
		var imgObj = new Image();

		imgObj.src='/static/images/head.png';

		head = new Kinetic.Image({
			x:x_pos,
			y:pos,
			image:imgObj,
			width:60,	
			height:33		
		});

		imgObj = new Image();
		imgObj.src='/static/images/end.png';

		end = new Kinetic.Image({
			x:x_pos,
			y:pos + 30,
			image:imgObj,
			width:60,	
			height:13		
		});


		var basewidth = 40 * one_pixel;
		
		if (basewidth < 180) {
			var w = 180 - basewidth;
			w /= one_pixel;
			end_offset = 30 + w;
			
			imgObj = new Image();
			imgObj.src='/static/images/body.png';
			
			body = new Kinetic.Image({
				x:x_pos,
				y:pos + 30,
				image:imgObj,
				width:60,	
				height:w		
			});
		}

	}

	this.init = function(x_pos, time, line, time_calc, one_p){
		pos =  time;
		t =time_calc ;
		one_pixel = one_p;
			
		loadImages(x_pos, pos);
			
		
		
		number = new Kinetic.Text({
			x: x_pos,
			y:pos+10,
			text: line,
			fontSize: 36,
			fontFamily: 'Arial Black',
			width:60,
			fill: 'black',
			align: 'center'
		});
		
	}
	
	
	this.updateTramwajTime = function(time){
		pos =  time;				
	}
	
	this.addTramwaj = function (layer){

		layer.add(head);
		if (body!=undefined)
			layer.add(body);
			
		layer.add(end);
		layer.add(number);
		
	}
	
	this.setTime = function (){
		//pos-=value;		
		var p = t.getPos(pos);
		head.setY(p);
		
		if (body!=undefined){			
			body.setY(p+32);
		}
		
		end.setY(p + end_offset);
		
		number.setY(p+10);
	}

	this.destroy = function() {
		delete head;
		delete body;
		delete end;
		delete number;
	}
}




