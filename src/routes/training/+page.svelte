
<script>
	let categories = [];
    export let data;
	data.categories.forEach(element => {
		categories.push({element:element.category, status:false});
	});
	categories[0].status = true;
	function catClicked(e){
		var y = categories.indexOf(categories.find(x => x.element === e.target.name));
		categories[y].status = !categories[y].status;
	}
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-5 items-center mt-60 md:w-1/3 w-full">
    <header class="card-header text-4xl">Trening</header>
	
    <div class="grid grid-cols-3 w-full items-center text-center mt-5">
        {#each data.categories as category, index}
        <label class="flex items-center space-x-2 m-auto">
            <input class="checkbox" type="checkbox" name={category.category} on:click={catClicked} checked={index==0}/>
            <p>{category.category} ({category.count})</p>

        </label>
        {/each}
	</div>
    <div class="grid grid-cols-2 w-full items-center mt-5">
        <label class="label m-4">
            <span>Tryb języka</span>
            <select class="select">
                <option value="1">Polski -> Angielski</option>
                <option value="2">Angielski -> Polski</option>
                <option value="3">Losowo</option>
            </select>
        </label>
        <label class="label m-4">
            <span>Tryb treningu</span>
            <select class="select">
                <option value="1">Wybieranie</option>
                <option value="2">Wpisywanie</option>
            </select>
        </label>
    </div>
			<a href="/training" class="btn variant-filled-tertiary m-2">Start</a>

            </div>
