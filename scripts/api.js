document.getElementById("prompt-form").addEventListener("submit", function(event) {
    event.preventDefault();


    const promptText = document.getElementById("inputPrompt").value;


    document.getElementById("image").src = "../assets/load.svg";
    document.getElementById("inputPrompt").setAttribute("disabled", "")
    document.getElementById("button-addon").setAttribute("disabled", "")

    fetch("imagecanary.squareweb.app/image", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: promptText })
    })
    .then(response => response.json()) // Parse da resposta para JSON
    .then(data => {
        const image = `data:image/png;base64,${data.image}`;
        document.getElementById("image").src = image;
        console.log("Imagem gerada");
        let download = document.getElementById("download-button")
        download.setAttribute("href", `${image}`)
        download.setAttribute("download", "geradoPorIA.png")
        download.style.visibility = "visible"
        document.getElementById("inputPrompt").removeAttribute("disabled")
        document.getElementById("button-addon").removeAttribute("disabled")
    })
    .catch(error => {
        console.error("Erro ao gerar a imagem:", error);
    });
});
