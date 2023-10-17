<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import logo from '$lib/assets/icon.png'
</script>
<!--<AppBar>
	<svelte:fragment slot="lead"><img src={logo}/></svelte:fragment>
	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>-->
<slot />
