document.getElementById("get").addEventListener("click", async () => {
  try {
    const data = await fetch("/get", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await data.json();
  } catch (error) {
    console.log(error);
  }
});
