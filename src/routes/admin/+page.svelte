<script lang="ts">
    export let data, polish, english, fastInput, fastCategory, addAllbtn;
    let fastI = 0;
    let addArray = [];
	import { enhance } from '$app/forms';
    import { getToastStore } from '@skeletonlabs/skeleton';
    const toastStore = getToastStore();
    import { invalidateAll } from '$app/navigation';
    var temp = {polish:"",english:"",category:""};

    function enterPressed(e){
        if(e.key == "Enter"){
            switch (fastI) {
                case 0:
                    if(fastInput.value == "")
                    return;
                    temp = {polish:"",english:"",category:fastCategory.value};
                    fastInput.placeholder = "Polski"
                    temp.english = fastInput.value;
                    fastInput.value = "";
                    fastI++;
                    break;
                case 1:
                    if(fastInput.value == "")
                    return;
                    fastInput.placeholder = "Angielski"
                    temp.polish = fastInput.value;
                    fastInput.value = "";
                    fastI--;
                    addArray = [...addArray, temp];
                    addAllbtn.disabled = false;
                    break;
                default:
                    break;
            }
        }
    }

    function removeFast(e){
        addArray.splice(e.target.name,1);
        addArray = addArray;
        if(addArray.length == 0){
            addAllbtn.disabled = true;
        }
    }

    function addAll(){
        addArray.forEach(async (element) => {
            await fetch('/api/addall', {
			method: 'POST',
			body: JSON.stringify({ polish:element.polish, english:element.english, category:element.category}),
			headers: {
				'content-type': 'application/json'
			}
		});
        });
        toastStore.trigger({message:'Sukces'});
        addArray = [];
        addAllbtn.disabled = true;
    }

</script>
<div class="p-6 card rounded-2xl shadow-4xl sm:max-w-2xl m-auto md:mt-10 mt-5 text-center">
    <h1 class="text-xl leading-tight text-center tracking-tight md:text-3xl">
        Panel Administratora
    </h1>
</div>
<div class="grid grid-rows-1 xl:grid-cols-3 grid-cols-1">
    <div class="p-4 md:p-6 w-full  sm:max-w-2xl m-auto card rounded-2xl shadow-4xl md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Kategorie
        </h1>
        <form method="POST" action="?/addCategory" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.hasOwnProperty('data') != true){
                toastStore.trigger({message:'Błąd'});
            } else {
                toastStore.trigger({message:'Sukces'});
                form.reset();
                invalidateAll();

            }
        }}}>
        <div class="pt-3 font-medium text-small">

            <label class="label mt-3">
                <span>Nazwa</span>
                <input class="input rounded-lg mt-3" type="text" name="name"/>
            </label>
            <div class="grid grid-cols-2">
                <div class="m-2"><a href="/admin/categories" class="btn variant-filled-secondary w-full rounded-lg mt-5">Lista</a></div>
                <div class="m-2"><button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Dodaj</button></div>
            </div>
          </div>
        </form>
    </div>
    <div class="p-4 md:p-6 w-full  sm:max-w-2xl m-auto card rounded-2xl shadow-4xl md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Słówka
        </h1>
        <form method="POST" action="?/addWord" 
        use:enhance={({form}) => {return ({result, update }) => {
            if(result.hasOwnProperty('data') != true){
                toastStore.trigger({message:'Błąd'});
            } else {
                toastStore.trigger({message:'Sukces'});
                polish.value = "";
                english.value = "";
            }
        }}}>
        <div class="pt-3 font-medium text-small">
            <label class="label mt-3">
                <span>Angielski</span>
                <input class="input rounded-lg mt-3" type="text" name="english" bind:this={english}/>
            </label>
            <label class="label mt-3">
                <span>Polski</span>
                <input class="input rounded-lg mt-3" type="text" name="polish" bind:this={polish}/>
            </label>
            <label class="label mt-3">
                <span>Kategoria</span>
                <select class="input rounded-lg" name="category">
                    {#each data.categories as element}
                        <option>{element.name}</option>
                    {/each}
                </select>
            </label>
            <div class="grid grid-cols-2">
                <div class="m-2"><a href="/admin/words" class="btn variant-filled-secondary w-full rounded-lg mt-5">Lista</a></div>
                <div class="m-2"><button type="submit" class="btn variant-filled-primary w-full rounded-lg mt-5">Dodaj</button></div>
            </div>
          </div>
        </form>
    </div>

    <div class="p-4 md:p-6 w-full  sm:max-w-2xl m-auto card rounded-2xl shadow-4xl md:mt-10 mt-5 text-center">
        <h1 class="text-lg leading-tight text-center tracking-tight md:text-3xl">
            Szybkie dodawanie
        </h1>
       
        <div class="pt-3 font-medium text-small">
            <label class="label mt-3">
                <span>Kategoria</span>
                <select class="input rounded-lg" name="category" bind:this={fastCategory}>
                    {#each data.categories as element}
                        <option>{element.name}</option>
                    {/each}
                </select>
            </label>
            <label class="label mt-3">
                <input class="input rounded-lg mt-3" placeholder="Angielski" type="text" name="polish" bind:this={fastInput} on:keydown={enterPressed}/>
            </label>
            <div class="table-container mt-5 bg-primary-400 shadow-2xl">
                <table class="table table-hover ">
                    <thead>
                        <tr>
                            <th class="text-center">Polski</th>
                            <th class="text-center">Angielski</th>
                            <th class="text-center">Kategoria</th>
                            <th class="text-center">Akcja</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each addArray as row, id}
                        <tr>
                            <td class="text-center">{row.polish}</td>
                            <td class="text-center">{row.english}</td>
                            <td class="text-center">{row.category}</td>
                            <td class="!p-2"><button class="btn variant-filled-error rounded w-full" name={id} on:click={removeFast}>Usuń</button></td>
                        </tr>
                        {/each}
                    </tbody>
            
                </table>
            </div>
            <button class="btn variant-filled-primary w-full rounded-lg mt-5" disabled on:click={addAll} bind:this={addAllbtn}>Dodaj wszystkie</button>
          </div>
    </div>
    
</div>
