<script>
  export let text = "";
  export let position = "";
  export let origin = "";
  export let delay = "";
</script>

<div class="group relative flex flex-col items-center justify-center">
  <slot></slot>
  <div
    class="tooltip-text absolute top-full left-1/2 -translate-y-2 mt-3 whitespace-nowrap text-xs z-10 px-2.5 py-1 rounded-medium shadow-small bg-white dark:bg-base-full-dark text-base-color-h dark:text-base-color-dark-h opacity-0 invisible scale-75 transition group-hover:visible group-hover:opacity-100 group-hover:scale-100 {position} {origin} {delay}"
  >
    {text}
  </div>
</div>
