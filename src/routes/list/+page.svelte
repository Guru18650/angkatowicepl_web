<script>
	let categories = [];
    export let data;
	data.categories.forEach(element => {
		categories.push({element:element, status:false});
	});
	categories[0].status = true;
	function catClicked(e){
		var y = categories.indexOf(categories.find(x => x.element === e.target.name));
		categories[y].status = !categories[y].status;
	}
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-5 items-center mt-60 md:w-1/3 w-full">
	<div class="grid grid-cols-3 w-full items-center text-center">
			{#each data.categories as category, index}
			<label class="flex items-center space-x-2 m-auto">
				<input class="checkbox" type="checkbox" name={category} on:click={catClicked} checked={index==0}/>
				<p>{category}</p>
			</label>
			{/each}
	</div>
	
<div class="table-container mt-5 bg-primary-400">
	<table class="table table-hover">
		<thead>
			<tr>
				<th class="text-center">Angielski</th>
				<th class="text-center">Polski</th>
				<th class="text-center">Kategoria</th>
			</tr>
		</thead>
		<tbody>
			{#each data.words as row}
			{#if categories.find(x => x.element === row.category).status}

			<tr>
				<td class="text-center">{row.english}</td>
				<td class="text-center">{row.polish}</td>
				<td class="text-center">{row.category}</td>
			</tr>
			{/if}
			{/each}
		</tbody>

	</table>
</div>
</div>
