<script>
  export let messages;
  export let loading;
</script>

<div
  class="message-list-container flex-grow size-full min-h-[65vh] sm:min-h-[80vh] sm:p-5"
>
  {#if loading}
    <ul class="flex flex-col h-full absolute inset-0">
      <li
        class="loading flex flex-col items-center justify-center h-full text-center"
      >
        <i
          class="size-10 border-[0.4em] border-gray-200 dark:border-base-dark border-t-transparent dark:border-t-transparent rounded-full animate-spin"
        ></i>
        <h4 class="mb-2">Cargando...</h4>
        <h5 class="text-[10px] opacity-40">Paciencia, por favor.</h5>
      </li>
    </ul>
  {:else}
    <ul class="flex flex-col h-full">
      {#each messages as message (message.id)}
        <li class="group flex flex-col mx-1 px-1 py-2 message {message.sender}">
          <span
            class="user-image flex items-center justify-center size-8 rounded-full bg-base-full-dark font-xs"
          >
            {#if message.sender === "user" && message.imageUrl}
              <img
                src={message.imageUrl}
                alt="User Avatar"
                class="size-8 rounded-full shadow-md"
              />
            {:else if message.sender === "bot"}
              <img
                src="/e-logomark-on-dark.webp"
                alt="Essentia AI"
                class="size-5 rounded-full shadow-md"
              />
            {/if}
          </span>
          <p
            class="px-5 py-2 mt-1 rounded-full bg-transparent text-base-color dark:text-white group-[.user]:text-base-color group-[.user]:dark:text-white group-[.user]:bg-white dark:group-[.user]:bg-base-dark"
          >
            {@html message.text}
          </p>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .message {
    &.user {
      align-self: flex-end;
      align-items: flex-end;
    }

    &.bot {
      align-self: flex-start;
    }
  }
</style>
