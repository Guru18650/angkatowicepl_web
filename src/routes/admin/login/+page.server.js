import { query } from "$lib/api";

export const actions = {
	default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('uname');
        const password = data.get('pass');
		if(username != "" && password != ""){
            let payload = {username:username, password:password, admin: "1"};
            var resp = await query('/auth/login',payload);
            console.log(resp);
            if(resp.hasOwnProperty('data')){
            cookies.set('key',resp.data.key,{maxAge: 60 * 60 * 24 * 30});
            return "success";
        } 
    }
       return "fail";
	}
};