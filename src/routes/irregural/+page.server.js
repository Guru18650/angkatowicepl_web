import { query } from "$lib/api";
import array from '$lib/assets/irregural.json';


const midIndex = Math.floor(array.length / 2);
const firstPart = array.slice(0, midIndex);
const secondPart = array.slice(midIndex);

export async function load({ params }) {

    return {words:firstPart, words2:secondPart};
}