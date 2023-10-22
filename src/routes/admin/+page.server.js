import { Redirect, redirect } from "@sveltejs/kit";
import { adminProtected } from "$lib/api";
import { query } from "$lib/api";

export async function load({ params, cookies }) {
    await adminProtected(cookies);
    var categories = await query('/words/categorynames',{});
    return {categories:categories.data}
};

export const actions = {
    addWord: async ({ request, cookies }) => {
        const data = await request.formData();
        const polish = data.get('polish');
        const english = data.get('english');
        const category = data.get('category');
        if(polish!=""||english!=""||category!=""){
            let payload;
            payload = {polish:polish, english:english, category:category};
            var resp = await query('/words/addword', payload);
            return (resp.status == 200)
        }
        return false;
    },
    addCategory: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name');
        if(name!=""){
            let payload;
            payload = {name:name};
            var resp = await query('/words/addcategory', payload);
            return (resp.status == 200)
        }
        return false;
    }
}
 