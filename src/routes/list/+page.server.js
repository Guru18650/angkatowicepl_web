import { query } from "$lib/api";
export async function load({ params }) {
	var words = await query('/words/getall',{});
	var categories = await query('/words/categories',{});
    return {words:words.data, categories:categories.data};
}