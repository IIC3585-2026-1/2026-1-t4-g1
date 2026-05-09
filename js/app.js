const participants = {};

// Registrar Service Worker
if ("serviceWorker" in navigator) {
    // Espera que la página termine de cargar
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./../service-worker.js")
        .then(res => console.log("Service Worker registrado"))
        .catch(err => console.log("Service Worker no registrado", err))
  })
};

const addParticipant = () => {
    const participant = document.getElementById("participantName");
    const participantCount = document.getElementById("participantsCount");
    const participantName = participant.value.trim();
    
    if (
        participantName === null  || 
        participantName === undefined || 
        participantName === ""
    ) {
        alert("Nombre del participante no puede estar vacío.");
        return;
    };
    
    if (participantName in participants) {
        alert("Nombre de usuario ya utilizado");
        return;
    };

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
        participantCount.textContent = parseInt(participantCount.textContent) - 1;
        delete participants[participantName];

        // Eliminar gastos asociados al participante
        const expensesList = document.getElementById("expensesList");
        const totalAmount = document.getElementById("totalAmount");

        expensesList.querySelectorAll(".expense-item").forEach(item => {
            const meta = item.querySelector(".expense-meta");
            if (meta.textContent === `Pagó ${participantName}`) {
                const amount = item.querySelector(".expense-amount").textContent.slice(1);
                totalAmount.textContent = `$${parseFloat(totalAmount.textContent.slice(1)) - parseFloat(amount)}`;
                item.remove();
            }
        });

        updateBalance();
    });

    li.appendChild(deleteButton);
    participants_list.appendChild(li);
    select.appendChild(option);
    participantCount.textContent = parseInt(participantCount.textContent) + 1;

    participants[participantName] = []
    participant.value = "";

    updateBalance();
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
    const totalAmount = document.getElementById("totalAmount");


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
    deleteButton.addEventListener("click", () => {
        div.remove();
        totalAmount.textContent = `$${parseFloat(totalAmount.textContent.slice(1)) - parseFloat(amount)}`;
        
        // Remover transaccion del arreglo asociado al participante
        const index = participants[payer].findIndex((tx) => {
            return tx.description == description && tx.amount == parseFloat(amount);
        });

        if (index !== -1) {
            participants[payer].splice(index, 1);
        }

        updateBalance();
    });

    div.appendChild(info);
    div.appendChild(amountEl);
    div.appendChild(deleteButton);
    expensesList.appendChild(div);
    totalAmount.textContent = `$${parseFloat(totalAmount.textContent.slice(1)) + parseFloat(amount)}`;

    participants[payer].push({
        description:  description,
        amount: parseFloat(amount)
    })
    
    descrip.value = "";
    am.value = "";
    selectPayer.value = "";

    updateBalance();
};

const updateBalance = () => {
    const balanceList = document.getElementById("balanceList");
    const balanceBox = document.getElementById("balanceBox");
    const amountPerPerson = document.getElementById("amountPerPerson");
    balanceList.innerHTML = "";
    balanceBox.innerHTML = "";

    if (Object.keys(participants).length < 2) return;

    const hayTransacciones = Object.values(participants).some(txs => txs.length > 0);
    if (!hayTransacciones) return;

    let total = 0;
    Object.keys(participants).forEach((p) => {
        participants[p].forEach(tx => total += tx.amount);
    });

    parte = total / Object.keys(participants).length;


    // Balance de cada uno
    const balances = {};
    Object.keys(participants).forEach(p => {
        const pagado = participants[p].reduce((sum, tx) => sum + tx.amount, 0);
        balances[p] = pagado - parte;
        const item = document.createElement("div");
        item.className = balances[p] > 0 ? "balance-item receives" : "balance-item owes";
        item.innerHTML = `
            <span><strong>${p}</strong></span>
            <span>$${balances[p].toFixed(2)}</span>
        `;
        balanceBox.appendChild(item);
    });

    const deudores = Object.entries(balances).filter(([_, b]) => b < 0);
    const acreedores = Object.entries(balances).filter(([_, b]) => b > 0);

    deudores.forEach(([deudor, deuda]) => {
        acreedores.forEach(([acreedor, credito]) => {
            const monto = Math.min(Math.abs(deuda), credito);
            if (monto < 0.01) return;

            const item = document.createElement("div");
            item.className = "balance-item";
            item.innerHTML = `
                <span><strong>${deudor}</strong> le paga a <strong>${acreedor}</strong></span>
                <span>$${monto.toFixed(2)}</span>
            `;
            balanceList.appendChild(item);
        });
    });
};