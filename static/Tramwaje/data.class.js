function Data(){
	this.loadLine  = function (line_number, line_number_id, przystanek){
		$.ajax({			
			//url: "http://tramwaje.leszniak.pl/data/",
			url: "http://localhost:8000/data/",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({"jsonrpc": "2.0",
				"method": "getLine", 
				"params": [line_number_id, przystanek], 
				"id": 1,
			}),
			dataType: "json",
			success: function(response) {
				//alert(response.result);
				if (engine!= undefined) {
					engine.animStop();
					delete engine;
				}
				
				engine = new Engine();
				engine.init("prezentacja", JSON.parse(response.result), line_number);
				engine.animStart();
				

			},
		});

	
	}

}
