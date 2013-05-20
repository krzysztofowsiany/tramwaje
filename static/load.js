var engine;

/*Modernizr.load({
    load: [  
	//libs
	//'/static/libs/jquery.min.js',
	'/static/libs/kinetic-v4.4.2.min.js',
	'/static/Tramwaje/TimeToPos.class.js',
			'/static/Tramwaje/tramwaj.class.js',		
			'/static/Tramwaje/engine.class.js'


			//test
			//'script/tdd.js'
	    ],
		complete: function () {	
			
				
		}
	
	});

*/

function f(){
var d = new Data();
d.loadLine(1, 300);

}

var engine=undefined;
//var t;

$(document).on('pageshow','[id=pt]', function(){
//	console.log('create');
//
	//if (engine==undefined)	{
	//	engine = new Engine();
		//engine.init("prezentacja");
	//}

	//engine.animStart();
	//f();
	
	//if (t==undefined)
	//t = new TimeToPos();
	//t.init(600, 900, 900);


});

$(document).on('pagehide','[id=pt]', function(){
engine.animStop();
//delete engine;
//engine = undefined;

console.log('remove');
});



