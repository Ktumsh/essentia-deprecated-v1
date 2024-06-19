<script>
  import { onMount } from "svelte";

  let greeting = "";

  onMount(() => {
    console.log("Component mounted");
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Buenos días";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Buenas tardes";
    } else {
      greeting = "Buenas noches";
    }

    console.log("Greeting set to:", greeting);
  });
</script>

{greeting}
