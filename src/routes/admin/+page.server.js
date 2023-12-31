import { Redirect, redirect } from "@sveltejs/kit";
import { adminProtected } from "$lib/api";
import { query } from "$lib/api";

export async function load({ params, cookies }) {
    await adminProtected(cookies);
    var categories = await query('/words/categorynames',{});
    var subcategories = await query('/words/subcategorynames',{});
    return {categories:categories.data, subcategories:subcategories.data}
};

export const actions = {
    addWord: async ({ request, cookies }) => {
        const data = await request.formData();
        const polish = data.get('polish');
        const english = data.get('english');
        const category = data.get('category');
        const subcategory = data.get('subcategory');
        if(polish!=""||english!=""||category!=""||subcategory!=""){
            let payload;
            payload = {polish:polish, english:english, category:category, subcategory:subcategory};
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
    },
    addSubCategory: async ({ request, cookies }) => {
        const data = await request.formData();
        const name = data.get('name');
        const category = data.get('category');
        if(name!=""||category!=""){
            let payload;
            payload = {name:name, category:category};
            var resp = await query('/words/addsubcategory', payload);
            return (resp.status == 200)
        }
        return false;
    }
}
 