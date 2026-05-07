const addParticipant = () => {
    const participant = document.getElementById("participantName");
    const participantName = participant.value.trim();
    
    if (
        participantName === null  || 
        participantName === undefined || 
        participantName === ""
    ) {
        alert("Nombre del participante no puede estar vacío.");
        return;
    }

    const participants_list = document.getElementById("participantsList");

    const li = document.createElement("li");
    li.textContent = participantName;

    // Para agregarlo al selector en la parte de gastos
    const select = document.getElementById("expensePayer");
    const option = document.createElement("option");
    option.value = participantName;
    option.textContent = participantName;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
        const opt = select.querySelector(`option[value="${participantName}"]`);
        opt.remove();
        li.remove();
    });

    li.appendChild(deleteButton);
    participants_list.appendChild(li);
    select.appendChild(option);
    participant.value = "";
};

const addTransaction = () => {
    
    const descrip = document.getElementById("expenseDescription");
    const description = descrip.value.trim();
    
    const am = document.getElementById("expenseAmount");
    const amount = am.value;

    const selectPayer = document.getElementById("expensePayer");
    const payer = selectPayer.value.trim();

    const checkField = (field, value) => {
        if (field === "Monto") {
            if (isNaN(value)) {
                alert(`${field} faltante.`);
                return false;
            }
        }

        if (
            value === null  || 
            value === undefined || 
            value === ""
        ) {
            alert(`${field} faltante.`);
            return false;
        }

        return true;
    }
    
    if (!checkField("Descripcion", description)) return;
    if (!checkField("Monto", amount)) return;
    if (!checkField("Pagador", payer)) return;
    
    const expensesList = document.getElementById("expensesList");


    const div = document.createElement("div");
    div.className = "expense-item";

    const info = document.createElement("div");
    const desc = document.createElement("p");
    desc.className = "expense-desc";
    desc.textContent = description;

    const meta = document.createElement("p");
    meta.className = "expense-meta";
    meta.textContent = `Pagó ${payer}`;

    info.appendChild(desc);
    info.appendChild(meta);

    const amountEl = document.createElement("span");
    amountEl.className = "expense-amount";
    amountEl.textContent = `$${amount}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => div.remove());

    div.appendChild(info);
    div.appendChild(amountEl);
    div.appendChild(deleteButton);
    expensesList.appendChild(div);
    
    descrip.value = "";
    am.value = "";
    selectPayer.value = "";
};