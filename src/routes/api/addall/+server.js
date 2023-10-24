import { json } from '@sveltejs/kit';
import { query } from "$lib/api";

export async function POST({ request }) {
    let { polish, english, category, subcategory, extended } = await request.json();
    if(polish!=""||english!=""||category!=""||subcategory!=""||extended!=""){
        let payload;
        if(extended=="Podstawa")
            extended = 0;
        else
            extended = 1;
        payload = {polish:polish, english:english, category:category, subcategory:subcategory, extended:extended};
        console.log(payload);
        var resp = await query('/words/addword', payload);
    return json("Success");}
}