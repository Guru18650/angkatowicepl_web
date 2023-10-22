<script>
  import { enhance } from "$app/forms";
  import { FileButton } from "@skeletonlabs/skeleton";
  import { invalidateAll } from '$app/navigation';
  let categories = [];
  export let data;
  let langmode, playmode;
  data.categories.forEach((element) => {
    categories.push({ element: element.category, status: false });
  });
  categories[0].status = true;
  function catClicked(e) {
    var y = categories.indexOf(
      categories.find((x) => x.element === e.target.name)
    );
    categories[y].status = !categories[y].status;
  }
  let playing = false;
  let finalwords = [],
  finalcategories = [];

  function start() {
    goodAnswers = 0;
    badAnswers = 0;
    i = 1;
    finalwords = [];
    finalcategories = [];
    categories.forEach((element) => {
      if (element.status) finalcategories.push(element.element);
    });
    data.words.forEach((element) => {
      if (finalcategories.includes(element.category)) {
        console.log(element);
        finalwords.push(element);
      }
    });
    playing = true;
    if (playmode == 0) {
      play0randomword();
    }
  }

  let rword;

  function play0randomword() {
    rword = finalwords[Math.floor(Math.random() * finalwords.length)];
    word = rword.english;
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        o1 = rword.polish;
        o2 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        o3 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        break;
      case 1:
        o1 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        o2 = rword.polish;
        o3 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        break;
      case 2:
        o1 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        o2 = finalwords[Math.floor(Math.random() * finalwords.length)].polish;
        o3 = rword.polish;
        break;
      default:
        break;
    }
  }

  function submitAnswer(e) {
    good = false;
    bad = false;
    if(e.target.name == rword.polish){
        goodAnswers++;
        good = true;
    } else {
        badAnswers++;
        bad = true;
    }
    i++;
    if(i-1==imax){
        finish = true;
    } else 
    play0randomword();
  }

  function reload(){
    window.location.reload()
  }

  let word,o1,o2,o3,i,imax = 10, good, bad, finish = false, goodAnswers, badAnswers;
</script>

<div
  class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-4 items-center md:mt-28 mt-20 md:w-1/3 w-full"
>
  {#if !playing}
    <header class="card-header text-4xl">Trening</header>
    <div class="grid grid-cols-3 w-full items-center text-center mt-5">
      {#each data.categories as category, index}
        <label class="flex items-center space-x-2 m-auto">
          <input
            class="checkbox"
            type="checkbox"
            name={category.category}
            on:click={catClicked}
            checked={index == 0}
          />
          <p>{category.category} ({category.count})</p>
        </label>
      {/each}
    </div>
    <div class="grid grid-cols-1 w-full items-center mt-5">
      <label class="label m-4">
        <span>Tryb języka</span>
        <select class="select" bind:value={langmode}>
          <option value="1">Polski -> Angielski</option>
          <option value="2">Angielski -> Polski</option>
          <option value="3">Losowo</option>
        </select>
      </label>
      <label class="label m-4">
        <span>Tryb treningu</span>
        <select class="select" bind:value={playmode}>
          <option value="0">Wybieranie</option>
          <option value="1">Wpisywanie</option>
        </select>
      </label>
      <label class="label m-4">
        <span>Ilość powtórzeń</span>
        <input type="number" class="input rounded-lg" bind:value={imax} />
      </label>
    </div>
    <button class="btn variant-filled-tertiary m-2" on:click={start}
      >Start</button
    >
  {:else if finish}
    <p class="text-2xl">Koniec</p>
    <p>Dobrze: {goodAnswers}</p>
    <p>Źle: {badAnswers}</p>
    <button class="btn variant-filled-primary" on:click={reload}>Kontynuuj</button>
  {:else if playmode == 0}
  <p>{i}/{imax}</p>

    {#if bad}
    <p class="text-red-600 text-xl">Źle</p>
    {/if}
    {#if good}
    <p class="text-green-600 text-xl">Dobrze</p>
    {/if}
    {#if !bad && !good} 
    <p class="text-xl">Wybierz odpowiedź</p>
    {/if}
    <p class="text-center text-4xl mt-2">{word}</p>
    <div class="grid md:grid-cols-3 grid-cols-1 w-full mt-5">
      <button
        class="btn variant-filled-primary rounded-lg m-2" name={o1}
        on:click={submitAnswer}>{o1}</button
      >
      <button
        class="btn variant-filled-primary rounded-lg m-2" name={o2}
        on:click={submitAnswer}>{o2}</button
      >
      <button
        class="btn variant-filled-primary rounded-lg m-2" name={o3}
        on:click={submitAnswer}>{o3}</button
      >
    </div>
  {:else}
    <p>Wpisywanie</p>
  {/if}
</div>
