import { query } from "$lib/api";
export async function load({ params }) {
	var words = await query('/words/getall',{});
    return {words:words};
}