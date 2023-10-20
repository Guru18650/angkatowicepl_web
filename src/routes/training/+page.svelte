
<script>
    import { enhance } from '$app/forms';
	let categories = [];
    export let data;
    let langmode, playmode;
	data.categories.forEach(element => {
		categories.push({element:element.category, status:false});
	});
	categories[0].status = true;
	function catClicked(e){
		var y = categories.indexOf(categories.find(x => x.element === e.target.name));
		categories[y].status = !categories[y].status;
	}
    let playing = false;
    function start(){
        playing = true;
    }
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-4 items-center md:mt-28 mt-20 md:w-1/3 w-full">
    {#if !playing}
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
            <select class="select" bind:value={langmode}>
                <option value="1">Polski -> Angielski</option>
                <option value="2">Angielski -> Polski</option>
                <option value="3">Losowo</option>
            </select>
        </label>
        <label class="label m-4">
            <span>Tryb treningu</span>
            <select class="select" bind:value={playmode}>
                <option value="1">Wybieranie</option>
                <option value="2">Wpisywanie</option>
            </select>
        </label>
    </div>
			<button class="btn variant-filled-tertiary m-2" on:click={start}>Start</button>
    {:else}
    <p>{langmode} || {playmode}</p>
    {/if}

            </div>
