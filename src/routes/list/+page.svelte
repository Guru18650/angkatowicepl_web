<script>
	let subcategories = [];
	let selectedCategory, extended;
    export let data;
	data.subcategories.forEach((element) => {
    subcategories = [... subcategories, { name: element.name, status: false, category:element.category}];
  });

  function catClicked(e) {
    var y = subcategories.indexOf(
      subcategories.find((x) => x.name === e.target.name)
    );
    subcategories[y].status = !subcategories[y].status;
  }


</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-5 items-center md:mt-28 md:w-2/3 w-full">
	<div class="grid grid-cols-2 items-center w-full">
		<div class="pt-3 font-medium text-small">
			<label class="label mt-3">
				<span>Kategoria</span>
				<select class="input rounded-lg" name="category" bind:value={selectedCategory}>
					{#each data.categoriesnames as element}
						<option>{element.name}</option>
					{/each}
				</select>
			</label>
		</div>
		<div class="m-auto mt-14">
		<label class="flex items-center space-x-2">
			<p>Rozszerzenie</p>
			<input class="checkbox" type="checkbox" bind:checked={extended}/>
		</label>
	</div>
</div>
	
	<div class="grid grid-cols-1 md:grid-cols-3 w-full items-start text-left mt-10">
			{#each subcategories as category}
			{#if category.category == selectedCategory}
			<label class="flex items-start space-x-2 ">
				<input class="checkbox" type="checkbox" name={category.name} on:click={catClicked} checked={category.status}/>
				<p>{category.name} </p>
			</label>
			{/if}
			{/each}
	</div>

<div class="table-container mt-5 bg-primary-400 shadow-2xl">
	<table class="table table-hover ">
		<thead>
			<tr>
				<th class="text-center">Angielski</th>
				<th class="text-center">Polski</th>
				<th class="text-center md:table-cell hidden">Kategoria</th>
				<th class="text-center md:table-cell hidden">Subkategoria</th>
			</tr>
		</thead>
		<tbody>
			{#each data.words as row}
			{#if subcategories.find(x => x.name === row.subcategory).status}
			{#if extended}
			<tr class="{row.extended ? "!variant-glass-primary" : ""}">
				<td class="text-center">{row.english}</td>
				<td class="text-center">{row.polish}</td>
				<td class="text-center md:table-cell hidden">{row.category}</td>
				<td class="text-center md:table-cell hidden">{row.subcategory}</td>
			</tr>
			{/if}
			{#if !extended}
			{#if !row.extended}
			<tr class="{row.extended ? "!variant-glass-primary" : ""}">
				<td class="text-center">{row.english}</td>
				<td class="text-center">{row.polish}</td>
				<td class="text-center md:table-cell hidden">{row.category}</td>
				<td class="text-center md:table-cell hidden">{row.subcategory}</td>
			</tr>
			{/if}
			{/if}
			{/if}
			{/each}
		</tbody>

	</table>
</div>
</div>
