function TimeToPos(){
	var size,
		time_size,
		pixel_step,
		//jstart_time,
		future,
		past
		;
	
	this.init = function (s, p, f) {
		//var date = new Date();	
		size = s;
		future = f;
		past = p;
		time_size = past+future;
		//start_time = date.getTime() ;
		pixel_step = size / time_size;	
		
			
	}
	
	
	//czas w sekundach
	this.getPos = function (time) {
		var date = new Date();	
		var result = future +  ( date.getTime()  - time) /1000;
		//console.log(size - (result * pixel_step));
		return size - (result * pixel_step);	
	}
	
	
	//długość w sekundach
	this.getSize = function (seconds) {
		return pixel_step * seconds;
	}
}
