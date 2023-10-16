<script>
    export let data;
    console.log(data.words[0]);
</script>

<div class="container h-full mx-auto flex justify-center items-center mt-60 md:w-1/3 w-full">
<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th class="text-center">Polski</th>
				<th class="text-center">Angielski</th>
				<th class="text-center">Kategoria</th>
			</tr>
		</thead>
		<tbody>
			{#each data.words as row}
				<tr>
					<td class="text-center">{row.polish}</td>
					<td class="text-center">{row.english}</td>
					<td class="text-center">{row.category}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th colspan="2">Suma</th>
				<td>{data.words.length}</td>
			</tr>
		</tfoot>
	</table>
</div>
</div>
