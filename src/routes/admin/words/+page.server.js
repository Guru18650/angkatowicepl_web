import { query } from "$lib/api";
export async function load({ params }) {
	var words = await query('/words/getall',{});
	var categories = await query('/words/categories',{});
    return {words:words.data, categories:categories.data};
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = data.get('id');
        const rows = await query('/words/deleteword', {id:id});
        return (rows.msg == "Success");
    }
}