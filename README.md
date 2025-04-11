# @aladas-org/json-preprocessor 0.0.2

#### 1. Purpose    
This is a _JSON Preprocessor_ designed initially to work in tandem with `@aladas-org/P5-patterns` but it should be usable with other projects.   
By design the _Preprocessor input_ is fully compatible with `JSON`, this is meant to avoid a mix between preprocessor directives (eg. `@include`) and regular `JSON`. 
The advantage is to preserve the benefit of tools like _JSON validators_ 
, on the other hand there is no _Invalid JSON_ statements such as _Comments_. 

#### 2. How to run the demo

2.1. Install [`NodeJS`](https://nodejs.org/en) from https://nodejs.org/en      
   
2.2. Open a Command Line interpreter (CLI)    
- Window menu then input `cmd.exe` in the _Search_ field   

2.3. Import `json-preprocessor` repository     
`git clone https://github.com/ALADAS-org/json-preprocessor.git`  

2.4. Download the prerequisites (`Express.js`)    
- Use this command: `npm install` 

2.5. Start local _Http server_    
+ Use this command: `run_server.bat`  
+ This starts a local _Http server_ at url `http://127.0.0.1:8080/`    
+ This local _Http server_ provides access to static files under `public` folder

2.6. Launch _Demo_    
- Double click on the `demo` shortcut    
- This shortcut is a _URL_ (`http://127.0.0.1:8080/`) which opens the `index.html` under `public` folder	  

#### 3. Preprocessor directives 
   
3.1. `@include` directive    

    +3.1.1. Define _Constants_ in an `include file` (e.g. `public\includes\color_palette_basic.json`)    
    - To _define_ a _Constant_ use the `@constants` directive then define elements of a _Key/Value_ array      

``` 
	"@constants": [
		{ "name": "red", "value": "#ff0000" },
		...
	]
```  

	+3.1.2. Import _Constants_ from an `include file` (see `public\include_test.json`)    
    - Use the `@include` directive (and provide the `src` key to locate the path to the `include file`), 
	- Then you can use the _Constants_ values by prefixing their _Name_ with a `$` (e.g. `$red`) 


``` 
	{
		"name": "Inclusion test",
		"description": "inclusion test for color_palette",
		"@include": { "src": "./includes/color_palette_basic.json", "#type": "COLOR_PALETTE" },
		"Shapes": {	
			"0": { "bgColor": "$red" },
			...
		}
	}
```

#### 4. Preprocessor API 
		
4.1. `JsonPP` class (provided by `public\src\json_preprocessor.js`)    
    +4.1.1. The main service of the API is `JsonPP.Run()` (see example in `public\demo.js`, loaded by `index.html`)    

```
	let url = "http://127.0.0.1:8080/include_test.json";
    let json_data = await fetch( url ).then(res => res.json());
	
    console.log("   >> -------- BEFORE Preprocessing --------");	
	console.log(JSON.stringify(json_data));
	
	let json_data_pp = await JsonPP.Run(json_data); // ** Call of 'JsonPP.Run' **  
	console.log("   >> -------- AFTER Preprocessing --------");
	console.log(JSON.stringify(json_data_pp));
 ```