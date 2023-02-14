//mixing
	let mixture = {};
	let config = {
		"VGratio": 80,
		"amountToMake": 30,
		"weights":{
			"PG": 1.038,
			"VG": 1.26,
			"Nicotine": 1.01,
			"Concentrate":1
		}
	}

	function base() {
		let base = (config.weights.VG / 100) * config.VGratio;
		base += (config.weights.PG / 100) * (100 - config.VGratio)
		return base;
	}

	function calc_amount(weight, amountToMake, percentage){
		let amount = amountToMake * (percentage / 100) * weight;
		return amount.toFixed(2);
	}

	export function mix_it(recipe, amountToMake = config.amountToMake){
		let percentage = 0;
		recipe.forEach((v) => percentage += +v.percentage * 1000);
		percentage = percentage / 1000;
		mixture.amountToMake = amountToMake
		mixture.totalFlavor = percentage;
		mixture.base_percentage = (100 - percentage);
		mixture.base_percentage = mixture.base_percentage.toFixed(2);

		mixture.base = amountToMake * base() * mixture.base_percentage / 100;
		mixture.base = mixture.base.toFixed(2);
		mixture.recipe = [];
		for( let ingredient in recipe){
			//if( !ingredient.percentage ) continue
			mixture.recipe[ingredient] = 
				calc_amount( 
					config.weights.Concentrate, 
					amountToMake, 
					recipe[ingredient].percentage
					);
		}
		return mixture
	}

