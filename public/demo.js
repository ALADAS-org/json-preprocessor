// =============================================================================================
// ================================           demo.js           ================================
// =============================================================================================
const run_demo = async () => {
	console.log(">> ======== JSON preprocessor Demo (express server) ========");	
    console.log("----- Demo script ('demo.js') -----");
	
	let url = "http://127.0.0.1:8080/include_test.json";
	console.log("url: " + url);  

	// https://gist.github.com/nhuxhr/043b8148a65ff6a77275c61946b226a2
    let json_data = await fetch( url ).then(res => res.json());
	
	console.log("   ---- Description: include test ----");	
    console.log("   >> -------- BEFORE Preprocessing --------");	
	console.log(JSON.stringify(json_data));
	
	let json_data_pp = await JsonPP.Run(json_data);
	console.log("   >> -------- AFTER Preprocessing --------");
	console.log(JSON.stringify(json_data_pp));
}; // run_demo()

run_demo();