import { query } from "$lib/api";
export async function load({ params }) {
	var categories = await query('/words/subcategorynames',{});
	var categories2 = await query('/words/categorynames',{});
    return {categories:categories.data, categories2:categories2.data};
}


export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name');
        const cat = data.get('cat');
        const rows = await query('/words/deletesubcategory', {name:name, category:cat});
        return (rows.msg == "Success");
    }
}