<script>
    export let data;
</script>

<div class="container h-full mx-auto flex justify-center card shadow-2xl flex-col md:p-5 pt-5 items-center md:mt-16 mt-5w-full">
<h1 class="text-2xl">Czasowniki niereguralne</h1>
<h3 class="text-center">138 czasowników z podręcznika, to nie wszystkie istniejące</h3>
<div class="grid grid-cols-1 md:grid-cols-2 w-full ">
	<div class="md:m-5 md:mt-0">
	<div class="table-container mt-5 bg-primary-400 shadow-2xl">
		<table class="table table-hover">
			<thead>
				<tr>
					<th class="text-center">Tłumaczenie</th>
					<th class="text-center">Infinitive</th>
					<th class="text-center">Past simple</th>
					<th class="text-center">Past participle</th>
				</tr>
			</thead>
			<tbody>
				{#each data.words as row}
	
				<tr>
					<td class="text-center">{row.pl}</td>
					<td class="text-center">{row.f1}</td>
					<td class="text-center">{row.f2}</td>
					<td class="text-center">{row.f3}</td>
				</tr>
				{/each}
			</tbody>
	
		</table>
	</div>
</div>
	<div class="md:m-5 md:mt-0">
	<div class="table-container mt-5 bg-primary-400 shadow-2xl">
		<table class="table table-hover">
			<thead>
				<tr>
					<th class="text-center">Tłumaczenie</th>
					<th class="text-center">Infinitive</th>
					<th class="text-center">Past simple</th>
					<th class="text-center">Past participle</th>
				</tr>
			</thead>
			<tbody>
				{#each data.words2 as row}
	
				<tr>
					<td class="text-center">{row.pl}</td>
					<td class="text-center">{row.f1}</td>
					<td class="text-center">{row.f2}</td>
					<td class="text-center">{row.f3}</td>
				</tr>
				{/each}
			</tbody>
	
		</table>
	</div>
</div>
</div>

</div>
