// ========================================================================================================
// =====================================     json_preprocessor.js     =====================================
// ========================================================================================================
class JsonPP {
	static OFFLINE_MODE = "OFFLINE_MODE";
	
	static INCLUDE_DIRECTIVE = "@include";
	
	static CONSTANTS = "@constants";
	static SRC       = "#src";
    static PRELOADED = "#preloaded";
	static TYPE      = "#type";	
	
	static COLOR_PALETTE = "COLOR_PALETTE";	
	static MAIN_JSON     = "MAIN_JSON";
	
	static Attributes = { "OFFLINE_MODE": false };
	static ITEM_NAME = "ITEM_NAME";
	
	static JSON_DATA_ITEMS = {};
	
	static Constants = {};

    // -------------------- Attributes --------------------
	static SetAttribute( name, value ) {
		JsonPP.Attributes[name] = value;
	} // JsonPP.SetAttribute()	
	
	static GetAttribute( name ) {
		// console.log(" JsonPP.GetAttribute() name: " + name);
		let value = "";
		if ( JsonPP.Attributes[name] != undefined ) {
			value = JsonPP.Attributes[name];
		}
		return value;
	} // JsonPP.GetAttribute()
	
	static GetAttributeKeys() {
		return Object.keys(JsonPP.Attributes);
	} // JsonPP.GetAttributeKeys()
	// -------------------- Attributes
	
	
	// -------------------- JSON_DATA_ITEMS --------------------
	static SetJsonData( name, in_json_data ) {
		// console.log(" JsonPP.SetJsonData() name: " + name);
		JsonPP.JSON_DATA_ITEMS[name] = in_json_data;
	} // JsonPP.SetJsonData()
	
	static GetJsonData( name ) {
		// console.log(" JsonPP.GetJsonData() name: " + name);
		let out_json_data = {};
		if ( JsonPP.JSON_DATA_ITEMS[name] != undefined ) {
			out_json_data = JsonPP.JSON_DATA_ITEMS[name];
		}
		return out_json_data;
	} // JsonPP.GetJsonData()
	
	static GetJsonDataKeys() {
		return Object.keys(JsonPP.JSON_DATA_ITEMS);
	} // JsonPP.GetJsonDataKeys()
	// -------------------- JSON_DATA_ITEMS
	

    static async Run( json_data_in ) {
        if ( json_data_in == undefined || json_data_in == null ) json_data_in = {};
        // console.log("> JsonPP.Run typeof " + typeof json_data_in);
		if ( typeof json_data_in == 'string' ) {
			json_data_in = JSON.parse(json_data_in_str);
		}

        let json_data_out = {};
        let keys = Object.keys( json_data_in );

		for (let i=0; i < keys.length; i++) {
			let key = keys[i];
			let json_data = json_data_in[key];
			// console.log( "  key[" + i + "]: " + "'" + key + "'");
			if ( key == JsonPP.INCLUDE_DIRECTIVE ) {
				// console.log( "  >> INCLUDE FOUND");
				
				let preloaded_include = json_data[JsonPP.PRELOADED];
				// console.log( "  preloaded_include: " + preloaded_include);
				
				let include_type = json_data[JsonPP.TYPE];
				// console.log( "  include_type: " + include_type);
				
				let include_json_data = {};
				if ( preloaded_include = true ) {
					include_json_data = JsonPP.GetJsonData(include_type);
				}
				else {
					include_json_data = await JsonPP.ProcessInclude( json_data );
                }

				// console.log( "  loaded include_json_data: " + JSON.stringify(include_json_data));

				let constants_data = include_json_data[JsonPP.CONSTANTS];
				// console.log( "  loaded constants: " + JSON.stringify(constants_data));
				JsonPP.ReadConstants( constants_data );
			}
			else { 
				// console.log( "  key NOT include: " + key + " " + JSON.stringify(json_data));
				json_data = JsonPP.ReplaceConstants( json_data );
				json_data_out[key] = json_data;
			}
		}
		// JsonPP.PrintConstants();
		// console.log( "   json_data OUT in Run(): " + JSON.stringify(json_data_out));
		
		return json_data_out;
    } // JsonPP.Run()

	static ReplaceConstants( json_data ) {
		// console.log("> JsonPP.ReplaceConstants");
		// console.log( "   json_data IN: " + JSON.stringify(json_data));
		if (typeof json_data == "object") {
			let keys = Object.keys( json_data );
		    for ( let i=0; i < keys.length; i++ ) {
				let key = keys[i];
				let value_data = json_data[key];
				// console.log( "   key[" + i + "]: " + key + "  value[" + i + "]: " + JSON.stringify(value_data));
				if ( typeof value_data == "string") {
					let constant_keys = Object.keys(JsonPP.Constants);
					let index_of_value_data = constant_keys.indexOf(value_data);
					if ( index_of_value_data != -1) {
						let constant_values = Object.values(JsonPP.Constants);
						let constant_value = constant_values[index_of_value_data];
						// console.log( "   FOUND '" + value_data + "' in Constants value is: " + constant_value);
						json_data[key] = constant_value;
					}
				}
				else if ( typeof value_data == "object") {
					json_data[key] = JsonPP.ReplaceConstants(value_data);
				}
			}
		}
		// console.log( "   json_data OUT: " + JSON.stringify(json_data));
		return json_data;
	} // JsonPP.ReplaceConstants()
	
	// https://stackoverflow.com/questions/30008114/how-do-i-promisify-native-xhr
	static async Load( url ) {
		console.log("> JsonPP.Load");

		// https://gist.github.com/nhuxhr/043b8148a65ff6a77275c61946b226a2
        const json_data = await fetch( url ).then(res => res.json());
		return json_data;
	} // JsonPP.Load()
	
	static async ProcessInclude( json_data_in ) {
		console.log("> JsonPP.ProcessInclude");
        if ( json_data_in == undefined || json_data_in == null ) json_data_in = {};
        // console.log("  json_data_in: " + JSON.stringify(json_data_in));
        let json_data_out = {};

        let keys = Object.keys( json_data_in );
		let values = Object.values( json_data_in );
		let index_of_src = keys.indexOf("src");
		console.log("  indexOf('src'): " + index_of_src);
		console.log("  values: " + JSON.stringify(values));
		if ( index_of_src != -1 ) {
			let key = keys[index_of_src];
			console.log("  key: " + key);
			let include_url = values[index_of_src]; 	
			//let url = Object.values( json_data_in )[index_of_src];		l
			console.log( " url: " + include_url );
			if ( include_url.endsWith(".json") ) {
				json_data_out = await JsonPP.Load(include_url);
			}
		}
		return json_data_out;
    } // JsonPP.ProcessInclude()
	
	static ReadConstants( json_data ) {
		console.log("> JsonPP.ReadConstants");
		// console.log("   ReadConstants json_data isArray: " + Array.isArray(json_data));
		// console.log("   ReadConstants json_data: " + JSON.stringify(json_data));
		
		// JsonPP.PrintConstants();

		if ( Array.isArray(json_data) ) {
			for (let i=0; i < json_data.length; i++) {
				let name  = json_data[i]['name'];
				if (! name.startsWith('$')) name = '$' + name;
				let value = json_data[i]['value'];
				JsonPP.Constants[name] = value;
				// JsonPP.PrintConstants();
			}
		};
		
		// JsonPP.PrintConstants();
	} // JsonPP.ReadConstants()	

	static PrintConstants() {
		console.log("> JsonPP.PrintConstants");
		let keys = Object.keys( JsonPP.Constants );
		for (let i=0; i < keys.length; i++) {
			let key = keys[i];
			console.log("Constants[" + i + "]: name: " + key + " = " + JsonPP.Constants[key])
		}
	} // JsonPP.PrintConstants()
} // JsonPP class

console.log(">> JsonPP loaded");

if (typeof exports === 'object') {
	exports.JsonPP = JsonPP
}