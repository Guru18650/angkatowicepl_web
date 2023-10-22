<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import { page } from '$app/stores';  
	import logo from '$lib/assets/icon.png'
	export let href, href2;
	import { storePopup } from '@skeletonlabs/skeleton';

	import { Toast, getToastStore } from '@skeletonlabs/skeleton';

	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();



	page.subscribe((value) => {
    	href = value.route.id;
	});
  $: active = href === $page.url.pathname;

  page.subscribe((value) => {
    	href2 = value.route.id;
		const firstSlashIndex = href2.lastIndexOf('/');
  		if (firstSlashIndex !== -1) {
  		  href2 = href2.slice(0, firstSlashIndex + 1);
  		}
	});
  $: active2 = href2 === $page.url.pathname;
</script>
<AppBar padding='p-2'>
	<svelte:fragment slot="lead">{#if href.length != 1}<a href={href2} class="btn bg-red-500 h-7">Wróć</a>{:else}<p class="text-xl">Angielski</p>{/if}</svelte:fragment>
	<svelte:fragment slot="trail"><p>Nie zalogowano</p></svelte:fragment>
</AppBar>
<slot />
<Toast background="bg-purple-700"/>
