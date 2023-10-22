<script>
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { enhance } from '$app/forms';

</script>

<div class="p-6 card  rounded-2xl shadow-4xl sm:max-w-md m-auto md:mt-32 mt-32">
  <h1 class="text-xl leading-tight tracking-tight md:text-2xl">
    Logowanie
  </h1>
  <form method="POST"
	use:enhance={() => {
		return ({result, update }) => {
      if(result.data == "fail"){
        toastStore.trigger({message: 'Wrong email or password'})
			  update({ reset: false });}
        else{
          window.location.href = "/admin";
        }
		};
	}}>
  <div class="pt-3 font-medium text-small">
    <label class="label mt-3">
        <span>Adres email</span>
        <input class="input rounded-lg" type="text" name="uname"/>
      </label>
      <label class="label mt-3">
      <span>Hasło</span>
      <input class="input rounded-lg" type="password" name="pass"/>
    </label>
   
  </div>
  <button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Zaloguj się</button>
</form>

  
</div>