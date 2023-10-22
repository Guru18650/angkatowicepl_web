import { json } from '@sveltejs/kit';
import { query } from "$lib/api";

export async function POST({ request }) {
    const { polish, english, category } = await request.json();
    if(polish!=""||english!=""||category!=""){
        let payload;
        payload = {polish:polish, english:english, category:category};
        var resp = await query('/words/addword', payload);
    return json("Success");}
}