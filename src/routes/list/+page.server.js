import { query } from "$lib/api";
export async function load({ params }) {
	var words = await query('/words/getall',{});
	var categories = await query('/words/categories',{});
	var categoriesnames = await query('/words/categorynames',{});
	var subcategories = await query('/words/subcategorynames',{});


    return {words:words.data, categories:categories.data, categoriesnames:categoriesnames.data, subcategories:subcategories.data};
}