import {writable} from 'svelte/store'

export const search_and_filter = writable({
	flavor_filter_1: null,
	flavor_filter_2: null,
	flavor_filter_3: null,
	sort_by_coverage: false,
})