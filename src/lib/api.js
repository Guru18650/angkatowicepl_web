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