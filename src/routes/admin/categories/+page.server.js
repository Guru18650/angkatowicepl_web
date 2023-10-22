import { query } from "$lib/api";
export async function load({ params }) {
	var categories = await query('/words/categorynames',{});
    return {categories:categories.data};
}


export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name');
        const rows = await query('/words/deletecategory', {name:name});
        return (rows.msg == "Success");
    }
}