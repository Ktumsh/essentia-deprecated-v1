<script lang="ts">
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  console.log(currentHour);

  let greeting = "";

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Buenos días";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }
</script>

{greeting}
