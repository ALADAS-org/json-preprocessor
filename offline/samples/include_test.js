JsonPP.SetJsonData( 
    JsonPP.GetAttribute(JsonPP.MAIN_JSON),
	{
		"name": "Inclusion test",
		"description": "inclusion test for color_palette",
		"@include": { "src": "./includes/color_palette_basic.json", "#type": "COLOR_PALETTE", "#preloaded": true },
		"Shapes": {	
			"0": { "bgColor": "$red" },
			"1": { "bgColor": "$green" },
			"2": { "bgColor": "$blue" },
			"3": { "bgColor": "$yellow" },
			"4": { "bgColor": "$cyan" },
			"5": { "bgColor": "$magenta" }
		}
	}
);