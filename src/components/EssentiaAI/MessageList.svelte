<script>
  import Star from "@/icons/svelte/star.svelte";

  export let messages;
  export let intro;
</script>

<div class="message-list-container pb-32 sm:pb-44 pt-4 sm:pt-28 lg:pt-10">
  <div class="relative h-full mx-auto max-w-2xl px-4">
    {#if intro}
      <div class="pb-[200px] pt-4 md:pt-10">
        <div class="mx-auto max-w-2xl px-4">
          <div
            class="bg-white dark:bg-base-dark flex flex-col gap-2 rounded-lg border border-gray-200 dark:border-white/10 p-8"
          >
            <div class="flex items-center gap-2">
              <h1
                class="text-lg text-base-color-h dark:text-base-color-dark font-bold"
              >
                Bienvenido a Essentia AI
              </h1>
              <span
                ><Star
                  className="size-3 text-yellow-400 dark:text-yellow-600"
                /></span
              >
            </div>
            <p class="text-base-color-m dark:text-base-color-dark-m">
              Haz preguntas sobre salud y bienestar, ejercicio, nutrición,
              bienestar emocional, salud sexual y más. Recibe información
              confiable y toma decisiones informadas sobre tu salud.
            </p>
          </div>
        </div>
        <div class="h-px w-full"></div>
      </div>
    {:else}
      <ul class="group flex flex-col h-full">
        {#each messages as message (message.id)}
          <li
            class="{message.sender === 'user'
              ? 'md:-mr-12 sm:self-end sm:flex-row-reverse'
              : 'md:-ml-12'}
              group relative flex items-start font-dmsans message {message.sender}"
          >
            <span
              class="user-image flex size-[25px] shrink-0 select-none items-center justify-center rounded-md bg-white dark:bg-base-dark border border-gray-200 dark:border-white/10 shadow-md overflow-hidden"
            >
              {#if message.sender === "user" && message.imageUrl}
                <img src={message.imageUrl} alt="User Avatar" class="" />
              {:else if message.sender === "bot"}
                <img
                  width="15"
                  height="15"
                  src="/e-logomark-on-dark.webp"
                  alt="Essentia AI"
                />
              {/if}
            </span>
            <p
              class="{message.sender === 'user'
                ? 'ml-4 pl-2 sm:mr-4 sm:pr-2'
                : 'ml-4 pl-2'}
              flex-1 space-y-2 overflow-hidden text-base-color-h dark:text-base-color-dark"
            >
              {@html message.text}
            </p>
          </li>
          <div
            role="none"
            class="shrink-0 border-b border-gray-200 dark:border-white/10 h-px w-full my-4 last:hidden"
          ></div>
        {/each}
      </ul>
    {/if}
  </div>
</div>
