<script>

import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { enhance } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';

	let categories = [];
    export let data;
	data.categories.forEach(element => {
		categories.push({element:element.category, status:true});
	});
	categories[0].status = true;
	function catClicked(e){
		var y = categories.indexOf(categories.find(x => x.element === e.target.name));
		categories[y].status = !categories[y].status;
	}
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-5 items-center md:mt-28 mt-20 md:w-1/3 w-full">
	<div class="grid grid-cols-3 w-full items-center text-center">
			{#each data.categories as category, index}
			<label class="flex items-center space-x-2 m-auto">
				<input class="checkbox" type="checkbox" name={category.category} on:click={catClicked} checked/>
				<p>{category.category} ({category.count})</p>
			</label>
			{/each}
	</div>
	
<div class="table-container mt-5 bg-primary-400 shadow-2xl">
	<table class="table table-hover ">
		<thead>
			<tr>
				<th class="text-center">ID</th>
				<th class="text-center">Angielski</th>
				<th class="text-center">Polski</th>
				<th class="text-center">Kategoria</th>
				<th class="text-center">Subkategoria</th>
				<th class="text-center">Akcja</th>
			</tr>
		</thead>
		<tbody>
			{#each data.words as row}
			{#if categories.find(x => x.element === row.category).status}

			<tr>
				<td class="text-center">{row.id}</td>
				<td class="text-center">{row.english}</td>
				<td class="text-center">{row.polish}</td>
				<td class="text-center">{row.category}</td>
				<td class="text-center">{row.subcategory}</td>
				<td class="!p-2"><form method="POST"
					use:enhance={({form}) => {return ({result, update }) => {
						if(result.data != true){
							toastStore.trigger({message:'Failed'});
						} else {
							toastStore.trigger({message:'Success'});
							form.reset();
							invalidateAll();
						}
					}}}><input type="hidden" value={row.id} name="id"/><button class="btn variant-filled-error rounded w-full">Usuń</button></form></td>
			</tr>
			{/if}
			{/each}
		</tbody>

	</table>
</div>
</div>
