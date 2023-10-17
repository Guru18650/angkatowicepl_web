import { Redirect, redirect } from "@sveltejs/kit";
export function load({ params, cookies }) {
    let x = cookies.get("jwt");
    if(x == undefined || x == "" || x == null){
        throw redirect(307, "/admin/login");
    }
};