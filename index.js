var cout = 2;
function addTable() {
    var check = document.getElementById("my_table");
    if (check !== null) {
        alert("Table already exists");
        return;
    }
    var table = document.createElement("table");
    table.setAttribute("id", "my_table");

    var tr1 = document.createElement("tr");
    var th1 = document.createElement("th");
    th1.innerHTML = "Number";
    var th2 = document.createElement("th");
    th2.innerHTML = "Message";
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    table.appendChild(tr1);


    var tr2 = document.createElement("tr");
    var td11 = document.createElement("td");
    td11.innerHTML = "1";
    tr2.appendChild(td11);
    var td12 = document.createElement("td");
    td12.innerHTML = "Hello";
    tr2.appendChild(td12);
    table.appendChild(tr2);


    var tr3 = document.createElement("tr");
    var td21 = document.createElement("td");
    td21.innerHTML = "2";
    tr3.appendChild(td21);
    var td22 = document.createElement("td");
    td22.innerHTML = "Hi";
    tr3.appendChild(td22);
    table.appendChild(tr3);

    document.getElementById("root").appendChild(table);

    document.getElementById("btn1").disabled = false;
    document.getElementById("btn2").disabled = false;

}

function addRow() {
    cout++;
    var table = document.getElementById("my_table");
    var mess = document.getElementById("mess");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "" + cout;
    cell2.innerHTML = mess.value;
    mess.value = "";
    showAddSuccessToast();
}

function deleteRow() {
    var table = document.getElementById("my_table");
    var num = document.getElementById("num").value;
    //check num is number
    if (isNaN(num) || num === "") {
        alert("Please enter a number");
        return;
    }
    var length = table.rows.length;
    if (num > length) {
        showErrorToast();
    }
    table.deleteRow(num);
    document.getElementById("num").value = "";

    if (length === 1) {
        document.getElementById("btn1").disabled = true;
        document.getElementById("btn2").disabled = true;
        table.setAttribute("id", "");
        table.deleteRow(0);
    }
    for (var i = num; i < length; i++) {
        table.rows[i].cells[0].innerHTML = "" + i;
    }
    showDeleteSuccessToast();
}


function showDeleteSuccessToast() {
    toast({
        title: "Sucess",
        message: "Delete row successfully.",
        type: "success",
        duration: 1000
    });
}
function showAddSuccessToast() {
    toast({
        title: "Sucessfully!",
        message: "Add row successfully.",
        type: "success",
        duration: 1000
    });
}

function showErrorToast() {
    toast({
        title: "Failed!",
        message: "Row number is not exist.",
        type: "error",
        duration: 1000
    });
}
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}
