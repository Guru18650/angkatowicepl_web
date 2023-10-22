import { redirect } from "@sveltejs/kit";

export async function query(endpoint, data) {
    var rows = await fetch('http://localhost:3000'+endpoint,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      var data = await rows.json();
      return data;
}

export async function verify(cookies, admin) {
var payload;
const jwt = cookies.get('key');
  if(jwt === undefined){
      return false;
  } else {
      payload = {key:jwt, admin:admin}
      var resp = await query('/auth/verify',payload); 
      if(!resp.hasOwnProperty('data')){
          return false;
      } else {
          return true;
      }
  }
}

export async function protectedPage(cookies){
  if(!await verify(cookies, 0)){
      throw redirect(307, '/login');
  }
}

export async function adminProtected(cookies){
  const x = await verify(cookies, 1);
  if(!x){
      throw redirect(307, '/admin/login');
  }
}