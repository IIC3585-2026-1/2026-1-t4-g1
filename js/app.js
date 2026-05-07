const addParticipant = () => {
    const participantName = document.getElementById("participantName").value.trim();
    
    if (participantName === null  || participantName === undefined || participantName === "") {
        alert("Nombre del participante no puede estar vacío.");
        return;
    }

    const participants_list = document.getElementById("participantsList");

    const li = document.createElement("li");
    li.textContent = participantName;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => li.remove());

    li.appendChild(deleteButton);
    participants_list.appendChild(li);
}