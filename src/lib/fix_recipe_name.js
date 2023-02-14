	const XML_UNESCAPE = {
	  amp: '&',
	  lt: '<',
	  gt: '>',
	  quot: '"',
	  apos: "'",
	  '#39': "'",
	  '#039': "'",
	  'eacute': "é",
	  'oacute': "ö",
	  'rsquo': "'"
	};
	export default function fix_recipe_name(value) {
	  return value.replace(/&(amp|lt|gt|quot|apos|#39|#039|eacute|oacute|rsquo);/g, xmlUnescapeReplace);
	}

	function xmlUnescapeReplace(value, entity) {
	  return XML_UNESCAPE[entity];
	}