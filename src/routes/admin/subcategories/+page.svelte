<script>
    export let data;
	import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { enhance } from '$app/forms';
    import { invalidate, invalidateAll } from '$app/navigation';
	let cat;
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-5 items-center md:mt-28 mt-20 md:w-1/3 w-full">
	<label class="label mt-3">
		<span>Kategoria</span>
		<select class="input rounded-lg" name="category" bind:value={cat}>
			{#each data.categories2 as element}
				<option>{element.name}</option>
			{/each}
		</select>
	</label>

<div class="table-container mt-5 bg-primary-400 shadow-2xl">
	<table class="table table-hover ">
		<thead>
			<tr>
				<th class="text-center">Nazwa</th>
				<th class="text-center">Akcja</th>
			</tr>
		</thead>
		<tbody>
			{#each data.categories as row}
			{#if row.category == cat}
			<tr>
				<td class="text-center">{row.name}</td>
				<td class="!p-2"><form method="POST"
					use:enhance={({form}) => {return ({result, update }) => {
						if(result.data != true){
							toastStore.trigger({message:'Failed'});
						} else {
							toastStore.trigger({message:'Success'});
							form.reset();
							invalidateAll();
						}
					}}}><input type="hidden" value={row.name} name="name"/><input type="hidden" value={row.category} name="cat"/><button class="btn variant-filled-error rounded w-full">Usuń</button></form></td>
			</tr>
			{/if}
			{/each}
		</tbody>

	</table>
</div>
</div>
