/* DOC READY FUNC */
$( document ).ready(function() {
	
	// Make a single request in order to discern the ammount of data (response["count"])
	
	var num = 1;

	var endpoint = 'http://realtime.influenceexplorer.com/api//candidates/';

	var options = 
	{ data: { format: "json",
				page: num.toString(),
				page_size: "100",
				office: "P",
				apikey: 'YOURAPIKEY'} }; // ********************************* INCLUDE AN API KEY HERE !!!!!!!!!!!!!!!!

	var testRequest = $.ajax(endpoint, options)
								.done(showResponse);
    function showResponse (response) {
		
	// Calculate the nuber of new requests needed to be made by dividing the length by page size (response["count"]/ 100)
		
		var pagesReturned;
		
		var pagesReturned = Math.ceil(response["count"] / 100);
		console.log("Pages returned = " + pagesReturned);
		
		// Make x (pagesReturned) requests to the API to get the full data set
		
		for (i = 1; i <= pagesReturned; i++) { 
		    
			// alert([i]);
			var options1 = 
			{ data: { format: "json",
						page: [i].toString(),
						page_size: "100", // intiget 1-100, 100 max is reason this code is needed
						office: "P", // P, S and H for President, House and Sennats filters
						apikey: 'YOURAPIKEY'} }; // ********************************* INCLUDE AN API KEY HERE !!!!!!!!!!!!!!!!
			
			var fullRequest = $.ajax(endpoint, options1)
							.done(showResponse1);
		} /* END LOOP FUNC */
			
			var allData = [];
		
			function showResponse1 (d) {
				// (ELSE) Append each new request to the array (allData)
				// (IF) If it is the last response in the set push it to the et (allData.push) before flattening (d3.merge) to new vriable (flatData)
				
				if ( allData.length === pagesReturned -1 ) {
					allData.push(d.results);
					console.log(allData);
					var flatData = d3.merge(allData);
					console.log(flatData);
				}
				// Else append all other pages of data to the array here
				else {
					allData.push(d.results);
					// console.log(allData)
				}
			} /* END RESPONSE*1* FUNC */
	}  /* END RESPONSE FUNC */
}); /* END DOC READY FUNC */


						
