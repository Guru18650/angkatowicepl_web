<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { page } from '$app/stores';  
	import logo from '$lib/assets/icon.png'
	export let href;

page.subscribe((value) => {
    href = value.route.id;

})
  $: active = href === $page.url.pathname;
</script>
<AppBar padding='p-2'>
	<svelte:fragment slot="lead">{#if href.length != 1}<a href="/" class="btn bg-red-500 h-7">Wróć</a>{:else}<p class="text-xl">Angielski</p>{/if}</svelte:fragment>
	<svelte:fragment slot="trail"><p>Nie zalogowano</p></svelte:fragment>
</AppBar>
<slot />
