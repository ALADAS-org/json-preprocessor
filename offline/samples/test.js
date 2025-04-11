// =======================================================================================================
// =====================================           test.js           =====================================
// =======================================================================================================
const test = async () => {
	console.log(">> ======== JSON preprocessor TEST (offline) ========");	
    // console.log(JSON.stringify(JsonPP.GetJsonData(JsonPP.COLOR_PALETTE)));
	
	// https://medium.com/@kaklotarrahul79/how-to-use-javascript-async-await-fetch-api-like-a-pro-1c2cb266145b
	
	console.log("   ---- Description: include test ----");
    let json_data = JsonPP.GetJsonData(JsonPP.MAIN_JSON);
	
    console.log("   >> -------- BEFORE Preprocessing --------");	
	console.log(JSON.stringify(json_data));
	
	let preprocessed_json_data = await JsonPP.Run(json_data);
	console.log("   >> -------- AFTER Preprocessing --------");
	console.log(JSON.stringify(preprocessed_json_data));
}; // test()

test();