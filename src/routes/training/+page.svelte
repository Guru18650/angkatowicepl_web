<script>
  import { enhance } from "$app/forms";
  import { FileButton } from "@skeletonlabs/skeleton";
  import { invalidateAll } from "$app/navigation";
  let categories = [],
    subcategories = [],
    finalwords = [],
    finalsubcategories = [];
    let finalextended = [];
  export let data;
  let langmode, playmode;
  data.subcategories.forEach((element) => {
    subcategories = [... subcategories, { name: element.name, status: false, category:element.category}];
  });
  function catClicked(e) {
    var y = subcategories.indexOf(
      subcategories.find((x) => x.name === e.target.name)
    );
    subcategories[y].status = !subcategories[y].status;
    getFinalWords();    
  }

  function extendSwitch(){
    extended = !extended;
    getFinalWords();
  }

  function getFinalWords(){
  
    finalwords = [];

    data.words.forEach(element => {
     if(subcategories.find(x => x.name === element.subcategory).status){
      if(extended){
          finalwords = [... finalwords, element];
      } else {
        if(!element.extended){
          finalwords = [... finalwords, element];
        }
      }
     }
    });
  }

  let selectedCategory, extended = false;

  let playing = false;

  function start() {
    goodAnswers = 0;
    badAnswers = 0;
    i = 1;

    playing = true;
    if (playmode == 0) {
      play0randomword();
    } else {
      play1randomword();
    }
  }

  let rword;

  function play1randomword() {
    switch (langmode) {
      case "0":
        switchWords1("english", "polish");
        break;
      case "1":
        switchWords1("polish", "english");
        break;
      case "2":
        if (Math.floor(Math.random() * 2)) switchWords1("polish", "english");
        else switchWords1("english", "polish");
        break;
      default:
        break;
    }
  }

  function play0randomword() {
    switch (langmode) {
      case "0":
        switchWords0("english", "polish");
        break;
      case "1":
        switchWords0("polish", "english");
        break;
      case "2":
        if (Math.floor(Math.random() * 2)) switchWords0("polish", "english");
        else switchWords0("english", "polish");
        break;
      default:
        break;
    }
  }
  let guess, prev, guessnt;

  function switchWords1(l1, l2) {
    guess = l1;
    guessnt = l2;
    rword = finalwords[Math.floor(Math.random() * finalwords.length)];
    word = rword[l2];
  }

  function switchWords0(l1, l2) {
    guess = l1;
    rword = finalwords[Math.floor(Math.random() * finalwords.length)];
    word = rword[l2];
    o1 = rword[l1];
    o2 = rword[l1];
    o3 = rword[l1];
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        while (o2 == o1 || o3 == o1 || o2 == o3) {
          o2 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
          o3 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
        }
        break;
      case 1:
        while (o2 == o1 || o3 == o1 || o2 == o3) {
          o1 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
          o3 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
        }
        break;
      case 2:
        while (o2 == o1 || o3 == o1 || o2 == o3) {
          o1 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
          o2 = finalwords[Math.floor(Math.random() * finalwords.length)][l1];
        }
        break;
      default:
        break;
    }
  }

  function restart(){
    finish = false;
    good = false;
    bad = false;
    start();
  }

  function submitAnswer(e) {
    good = false;
    bad = false;
    if (playmode == 0) {
      if (e.target.name == rword[guess]) {
        goodAnswers++;
        good = true;
      } else {
        badAnswers++;
        bad = true;
      }
      i++;
      if (i - 1 == imax) {
        finish = true;
      } else play0randomword();
    } else {
      if (odpowiedz1 == rword[guess]) {
        goodAnswers++;
        good = true;
      } else {
        badAnswers++;
        bad = true;
      }
      i++;
      if (i - 1 == imax) {
        finish = true;
      } else prev = rword[guessnt] + " = " + rword[guess];
      play1randomword();
    }
  }

  function reload() {
    playing = false;
    finish = false;
    good = false;
    bad = false;
  }

  let word,
    o1,
    o2,
    o3,
    i,
    imax = 10,
    good,
    bad,
    finish = false,
    goodAnswers,
    badAnswers,
    odpowiedz1;
</script>

<div
  class="container h-full mx-auto flex justify-center card shadow-2xl flex-col p-4 pt-0 items-center md:mt-28 md:w-1/3 w-full"
>
  {#if !playing}
    <div class="grid grid-cols-2 items-center w-full">
      <div class="pt-3 font-medium text-small">
        <label class="label mt-3">
          <span>Kategoria</span>
          <select
            class="input rounded-lg"
            name="category"
            bind:value={selectedCategory}
          >
            {#each data.categoriesnames as element}
              <option>{element.name}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="m-auto mt-14">
        <label class="flex items-center space-x-2">
          <p>Rozszerzenie</p>
          <input class="checkbox" type="checkbox" on:click={extendSwitch}/>
        </label>
      </div>
    </div>
    <div
      class="grid grid-cols-1 md:grid-cols-3 w-full items-start text-left mt-10"
    >
      {#each subcategories as category}
        {#if category.category == selectedCategory}
          <label class="flex items-start space-x-2">
            <input
              class="checkbox"
              type="checkbox"
              name={category.name}
              on:click={catClicked}
              checked={category.status}
            />
            <p>{category.name}</p>
          </label>
        {/if}
      {/each}
    </div>
    Zaznaczono {finalwords.length}
    <div class="grid grid-cols-1 w-full items-center mt-5">
      <label class="label m-2">
        <span>Tryb języka</span>
        <select class="select" bind:value={langmode}>
          <option value="0">Polski -> Angielski</option>
          <option value="1">Angielski -> Polski</option>
          <option value="2">Losowo</option>
        </select>
      </label>
      <label class="label m-2">
        <span>Tryb treningu</span>
        <select class="select" bind:value={playmode}>
          <option value="0">Wybieranie</option>
          <option value="1">Wpisywanie</option>
        </select>
      </label>
      <label class="label m-2">
        <span>Ilość powtórzeń</span>
        <input type="number" class="input rounded-lg" bind:value={imax} />
      </label>
    </div>
    <button class="btn variant-filled-tertiary m-2" on:click={start} disabled={finalwords.length<1}
      >Start</button
    >
  {:else if finish}
    <p class="text-2xl mt-5">Koniec</p>
    <p>Dobrze: {goodAnswers}</p>
    <p>Źle: {badAnswers}</p>
    <p>Wynik: {(goodAnswers / (goodAnswers + badAnswers)) * 100}%</p>
    <button class="btn variant-filled-primary mt-5" on:click={reload}
      >Kontynuuj</button
    >
    <button class="btn variant-filled-secondary mt-5" on:click={restart}
      >Powtórz</button
    >
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
        class="btn variant-filled-primary rounded-lg m-2"
        name={o1}
        on:click={submitAnswer}>{o1}</button
      >
      <button
        class="btn variant-filled-primary rounded-lg m-2"
        name={o2}
        on:click={submitAnswer}>{o2}</button
      >
      <button
        class="btn variant-filled-primary rounded-lg m-2"
        name={o3}
        on:click={submitAnswer}>{o3}</button
      >
    </div>
  {:else}
    {#if bad}
      <p class="text-red-600 text-xl">Poprawna odpowiedź: <b>{prev}</b></p>
    {/if}
    {#if good}
      <p class="text-green-600 text-xl">Dobrze</p>
    {/if}
    {#if !bad && !good}
      <p class="text-xl">Wpisz odpowiedź</p>
    {/if}
    <p class="text-center text-4xl mt-2">{word}</p>
    <div class="grid grid-cols-1 w-full mt-5">
      <label class="label mt-3">
        <span>Tłumaczenie</span>
        <input class="input rounded-lg" bind:value={odpowiedz1} />
      </label>
      <button
        class="btn variant-filled-primary rounded-lg mt-4"
        on:click={submitAnswer}>Zatwierdź</button
      >
    </div>
  {/if}
</div>
