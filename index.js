const casa = document.querySelector(".columns");


let columns = document.querySelectorAll(".column__cards")
let cards = document.querySelectorAll(".card")

const trash = document.querySelectorAll(".trash")
const adc = document.querySelectorAll(".adcionar")
const edits = document.querySelectorAll(".edit")
const duplicateThis = document.querySelectorAll(".copy")
const moveUp = document.querySelectorAll(".moveUp")
const moveDown = document.querySelectorAll(".moveDown")

const newFrame = document.querySelector(".adcionar_quadro")
const constructor = document.querySelector(".modal_confirm")

const innerTask = document.querySelectorAll(".innerTaskItems");
const innerTaskBox = document.querySelectorAll(".boxInnerTaskItems");
const innerTaskTitle = document.querySelectorAll(".innerTaskItems__title");
const innerTaskList = document.querySelectorAll(".innerTaskItems__list");
const innerTaskListItems = document.querySelectorAll(".innerListItem li");
const innerListItemsDelete = document.querySelectorAll(".removeThisItemFromList");
const innerTaskListItemsAdd = document.querySelectorAll(".innerTaskItems .addList");
const innerTaskListItemsDescription = document.querySelectorAll(".innerTaskItems__text");
const closeInnerTask = document.querySelectorAll(".closeInnerTask");
const innerTaskPriority = document.querySelectorAll(".innerTaskPriority input[type='color']");



let draggedCard;

const counter = () => {
    cards = document.querySelectorAll(".card");
    columns = document.querySelectorAll(".column__cards")
    const soma = document.querySelectorAll(".somar")

    soma.forEach((somar, index) => {

        const column = columns[index];
        const qtd = column.querySelectorAll(".card").length;
        somar.innerHTML = `<br>(${qtd} tarefas.)`;
    });

    document.querySelector("#MyTotal").innerHTML = `${columns.length} colunas e ${cards.length} tarefas`;
}

const deleteAll = () => {
    const modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    modal.style.scale = "1";
    modal.style.opacity = "1";

    event.target.closest(".column__cards").querySelectorAll(".card").forEach((card) => card.classList.add("card--pending"));

    modal.addEventListener("mouseenter", () => {

        const modalConfirm = document.querySelector(".delete_button");
        const cancel = document.querySelector(".cancel_button");

        modalConfirm.addEventListener("click", () => {
            modal.style.visibility = "hidden";
            modal.style.scale = "0";
            modal.style.opacity = "0";

            const cardsPending = document.querySelectorAll(".card--pending");

            cardsPending.forEach((card) => {
                card.remove();
                counter();
            });
        })

        cancel.addEventListener("click", () => {
            modal.style.visibility = "hidden";
            modal.style.scale = "0";
            modal.style.opacity = "0";
            counter()

            const cardsPending = document.querySelectorAll(".card--pending");

            cardsPending.forEach((card) => {
                card.classList.remove("card--pending");
            })
        })
    })


    counter();
}

const newFrameCreated = () => {
    const newFrame = document.createElement("section");
    newFrame.className = "column";

    const newName = document.createElement("h2");
    newName.className = "column__title";
    newName.innerHTML = "Novo Quadro";
    newName.innerHTML = `Novo Quadro <span class="somar"><br>(0 Tarefas)</span>`;
    newFrame.appendChild(newName);

    const addAndDelete = document.createElement("section");
    addAndDelete.className = "column__cards";

    const innerIcons = document.createElement("div");
    innerIcons.className = "itens";

    addAndDelete.appendChild(innerIcons);

    const lixeira = document.createElement("i");
    lixeira.className = "fa-solid fa-trash trash";
    lixeira.classList.add("trash");
    innerIcons.appendChild(lixeira);

    const add = document.createElement("i");
    add.className = "fa-solid fa-plus adcionar";
    innerIcons.appendChild(add);

    newFrame.appendChild(addAndDelete);
    const valueThis = newName.querySelector(".somar");

    add.addEventListener("click", create);
    lixeira.addEventListener("click", deleteAll);
    newFrame.addEventListener("dragover", dragOver);
    newFrame.addEventListener("drop", drop);
    newFrame.addEventListener("dragenter", dragEnter);
    newFrame.addEventListener("dragleave", dragLeave);
    valueThis.addEventListener("DomContentLoaded", counter);
    newFrame.addEventListener("mouseenter", menu);
    newFrame.addEventListener("mouseleave", function () {
        const menu = document.querySelector(".menu");
        if (menu) menu.remove();
        const hovered = document.querySelector(".hovered");
        hovered.classList.remove("hovered");
    })

    return newFrame;
}

const addFrame = () => {
    const modal = document.querySelector(".modal").cloneNode(true);

    modal.classList.add("modal_clone");
    constructor.appendChild(modal);
    modal.classList.remove("modal");

    const newName = document.createElement("input");
    newName.className = "input_frame";
    newName.type = "text";
    newName.placeholder = "Nome do Novo Quadro";

    modal.insertBefore(newName, modal.children.item(modal.children.length - 1));

    modal.querySelector("p").innerHTML = `Deseja adicionar um novo quadro?`;
    modal.querySelector(".delete_button").innerHTML = `Sim, adicionar!`;
    modal.querySelector(".cancel_button").innerHTML = `Nao, cancelar!`;


    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.scale = "1";

    const confirm = modal.querySelector(".delete_button");
    const cancel = modal.querySelector(".cancel_button");

    newName.focus();

    confirm.addEventListener("click", () => {
        const newFrame = newFrameCreated();
        if (newName.value) newFrame.querySelector(".column__title").innerHTML = `${newName.value.toUpperCase()} <span class="somar"><br>(0 Tarefas)</span>`

        casa.insertBefore(newFrame, casa.children.item(casa.children.length - 1));

        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modal.style.scale = "0";
        newName.remove();
        modal.remove();
        counter();
        if (columns.length === 1) {
            const newFrameCentralized = document.querySelector(".centralize");
            newFrameCentralized.classList.remove("centralize")
        }
    })

    cancel.addEventListener("click", () => {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modal.style.scale = "0";
        newName.remove();
        modal.remove();
    })

}

const moveThisFromRight = () => {
    const hovered = document.querySelector(".hovered");
    const proximoElemento = hovered.nextElementSibling.nextElementSibling;

    if (proximoElemento) {
        hovered.parentElement.insertBefore(hovered, proximoElemento);
        const menu = document.querySelector(".menu");
        menu.remove();
    } else { }
}


const moveThisFromLeft = () => {
    const hovered = document.querySelector(".hovered");
    const elementoAnterior = hovered.previousElementSibling;

    if (elementoAnterior) {
        hovered.parentElement.insertBefore(hovered, elementoAnterior);
        const menu = document.querySelector(".menu");
        menu.remove();
    } else { }
}

const moveThisFromUp = ({ target }) => {
    const card = target.closest(".card");
    const nextElement = card.previousElementSibling;

    if (nextElement && card.previousElementSibling.previousElementSibling) {
        card.parentElement.insertBefore(card, nextElement);
    }
}

const moveThisFromDown = ({ target }) => {
    const card = target.closest(".card");
    const nextElement = card.nextElementSibling.nextElementSibling;

    if (card.nextElementSibling) {
        card.parentElement.insertBefore(card, nextElement);
    }
}


const deleteFrame = ({ target }) => {
    target.parentElement.parentElement.classList.add("delete__this")
    const modalClone = document.querySelector(".modal").cloneNode(true);

    modalClone.classList.add("modal_clone");
    constructor.appendChild(modalClone);
    modalClone.classList.remove("modal");
    modalClone.querySelector("p").innerHTML = `Deseja deletar esse quadro?`;

    modalClone.style.visibility = "visible";
    modalClone.style.opacity = "1";
    modalClone.style.scale = "1";

    const confirm = modalClone.querySelector(".delete_button");
    const cancel = modalClone.querySelector(".cancel_button");

    const confirmEnter = () => {

        if (event.key === "13") {
            const thisFrameForDelete = document.querySelector(".delete__this");
            thisFrameForDelete.remove();
            modalClone.style.visibility = "hidden";
            modalClone.style.opacity = "0";
            modalClone.style.scale = "0";
            modalClone.remove();
            counter();
        } else {
            const thisFrameForDelete = document.querySelector(".delete__this");
            thisFrameForDelete.remove();
            modalClone.style.visibility = "hidden";
            modalClone.style.opacity = "0";
            modalClone.style.scale = "0";
            modalClone.remove();
            counter();
        }
        if (document.querySelectorAll(".column__cards").length == 0) {
            newFrame.classList.add("centralize")
        } else if (document.querySelectorAll(".column__cards").length >= 1) {
            newFrame.classList.remove("centralize")
        }
    }
    confirm.addEventListener("click", confirmEnter);
    confirm.addEventListener("keypress", confirmEnter);


    cancel.addEventListener("click", () => {
        modalClone.style.visibility = "hidden";
        modalClone.style.opacity = "0";
        modalClone.style.scale = "0";
        modalClone.remove();
    })

}

const menu = (event) => {

    event.target.classList.add("hovered");

    const menu = document.createElement("div");
    menu.className = "menu";
    menu.style.position = "absolute";
    menu.style.top = `50%`;
    menu.style.left = `${event.clientX}px`;
    menu.style.visibility = "visible";
    menu.style.scale = "1";
    menu.style.opacity = "1";

    const edit = document.createElement("i");
    edit.className = "fa-regular fa-pen-to-square edit";
    const deletee = document.createElement("i");
    deletee.className = "fa-solid fa-trash trash";
    menu.appendChild(edit);
    menu.appendChild(deletee);
    const moveRight = document.createElement("i");
    moveRight.className = "fa-solid fa-arrow-right move";
    menu.appendChild(moveRight);
    const moveLeft = document.createElement("i");
    moveLeft.className = "fa-solid fa-arrow-left move";
    menu.appendChild(moveLeft);

    edit.addEventListener("click", function () {

        this.parentElement.parentElement.querySelector(".column__title").contentEditable = "true";
        this.parentElement.parentElement.querySelector(".column__title").focus();
        this.parentElement.parentElement.querySelector(".column__title").style.cursor = "text";
        this.parentElement.parentElement.querySelector(".column__title").innerText = "Edite o nome do Quadro";
        document.execCommand("selectAll")


        this.parentElement.parentElement.addEventListener("focusout", () => {
            this.parentElement.parentElement.querySelector(".column__title").innerHTML = `${this.parentElement.parentElement.querySelector(".column__title").innerText.toUpperCase()} <span class="somar"> <br>(0 Tarefas)</span>`
            this.parentElement.parentElement.querySelector(".column__title").contentEditable = "false";

            counter();
        })

    })

    deletee.addEventListener("click", deleteFrame);

    moveRight.addEventListener("click", moveThisFromRight)

    moveLeft.addEventListener("click", moveThisFromLeft)

    event.target.appendChild(menu);
}

const closeTask = ({ target }) => {
    target.parentElement.parentElement.classList.remove("active")
    const newTitleforTask = target.parentElement.parentElement.querySelector(".innerTaskItems__title");
    target.parentElement.parentElement.parentElement.querySelector(".text").innerHTML = newTitleforTask.innerHTML
    widthOfPriority()
}


const createInnerContent = () => {

    const innerTask = document.createElement("div");
    innerTask.className = "innerTaskItems";

    const innerTaskBox = document.createElement("div");
    innerTaskBox.className = "boxInnerTaskItems";

    const innerTaskPriority = document.createElement("div");
    innerTaskPriority.className = "innerTaskPriority";

    const inputPriority = document.createElement("input");
    inputPriority.setAttribute("type", "color");
    inputPriority.setAttribute("value", "#ffffff");
    innerTaskPriority.appendChild(inputPriority);

    const closeInnerTask = document.createElement("i");
    closeInnerTask.className = "fa-solid fa-xmark closeInnerTask";

    const innerTaskTitle = document.createElement("h4");
    innerTaskTitle.className = "innerTaskItems__title";
    innerTaskTitle.innerHTML = `Nome da tarefa`;
    innerTaskTitle.contentEditable = "true";
    innerTaskTitle.style.cursor = "text";

    const innerTaskList = document.createElement("ul");
    innerTaskList.className = "innerTaskItems__list";

    const innerListItem = document.createElement("div");
    innerListItem.className = "innerListItem";

    const innerTaskListItems = document.createElement("li");
    innerTaskListItems.innerHTML = "Minha Lista de Tarefas";
    innerTaskListItems.contentEditable = "true";

    const removeThisItemFromList = document.createElement("i");
    removeThisItemFromList.className = "fa-solid fa-minus removeThisItemFromList";


    const innerTaskListItemsAdd = document.createElement("i");
    innerTaskListItemsAdd.className = "fa-solid fa-plus addList";

    const innerTaskListItemsDescription = document.createElement("p");
    innerTaskListItemsDescription.className = "innerTaskItems__text";
    innerTaskListItemsDescription.innerHTML = "Comece a modificar sua lista de tarefas, esta é uma descrição da tarefa.";
    innerTaskListItemsDescription.contentEditable = "true";


    innerTaskList.appendChild(innerTaskListItems);
    innerTaskList.append(innerListItem);
    innerListItem.append(innerTaskListItems);
    innerListItem.append(removeThisItemFromList);

    innerTaskBox.appendChild(innerTaskPriority);
    innerTaskBox.appendChild(closeInnerTask);
    innerTaskBox.appendChild(innerTaskTitle);
    innerTaskBox.appendChild(innerTaskList);
    innerTaskBox.appendChild(innerTaskListItemsAdd);
    innerTaskBox.appendChild(innerTaskListItemsDescription);
    innerTask.appendChild(innerTaskBox);

    innerTaskPriority.addEventListener("change", newTaskPriority);
    closeInnerTask.addEventListener("click", closeTask);
    innerTaskListItemsAdd.addEventListener("click", addListTask);
    removeThisItemFromList.addEventListener("click", deleteThisListItem)

    return innerTask

}

const addListTask = ({ target }) => {
    const innerTaskList = target.parentElement.querySelector(".innerTaskItems__list");
    const innerListItem = document.createElement("div");
    innerListItem.className = "innerListItem";

    const innerTaskListItems = document.createElement("li");

    const removeThisItemFromList = document.createElement("i");
    removeThisItemFromList.className = "fa-solid fa-minus removeThisItemFromList";


    innerListItem.append(innerTaskListItems);
    innerTaskList.append(innerListItem);
    innerListItem.append(removeThisItemFromList);

    innerTaskListItems.innerHTML = "Minha Lista de Tarefas";
    innerTaskListItems.contentEditable = "true";
    innerTaskListItems.focus();

    innerTaskList.appendChild(innerListItem);

    removeThisItemFromList.addEventListener("click", deleteThisListItem)
}

const deleteThisListItem = ({ target }) => {
    target.parentElement.remove();
    const menu = document.querySelector(".menu");
    if (menu) {
        menu.remove();
    } else {

    }
}

const innerTaskEdit = () => {

    const innerTaskTitle = document.querySelector(".innerTaskItems__title");
    const innerTaskDescription = document.querySelector(".innerTaskItems__description");

    innerTaskTitle.addEventListener("focusout", () => {
        innerTaskTitle.contentEditable = "false";
        innerTaskTitle.style.cursor = "default";
        innerTaskTitle.style.outline = "none";
    })

    innerTaskDescription.addEventListener("focusout", () => {
        innerTaskDescription.contentEditable = "false";
        innerTaskDescription.style.cursor = "default";
        innerTaskDescription.style.outline = "none";
    })
}

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
    draggedCard.style.opacity = "0.5";

}

const dragOver = (event) => {
    event.preventDefault();
};

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards")) {
        const ghostCard = document.createElement("section");
        ghostCard.className = "ghostCard";
        target.classList.add("column--highlight");
        target.append(ghostCard);

    } else if (target.classList.contains("trash")) {
        target.classList.add("lixeira--ativa");
    }
};

const dragLeave = ({ target }) => {
    const ghostCard = target.querySelector(".ghostCard");
    if (ghostCard) {
        ghostCard.remove();
    }
    target.classList.remove("column--highlight");
    target.classList.remove("lixeira--ativa");
};

const drop = ({ target }) => {
    if (target.classList.contains("column__cards",)) {
        const ghostCard = target.querySelector(".ghostCard");
        if (ghostCard) {
            ghostCard.remove();
        }
        target.classList.remove("column--highlight");
        target.append(draggedCard);
        draggedCard.style.opacity = "1";
        const menu = document.querySelector(".menu");
        if (menu) {
            menu.remove();
        }
    } else if (target.classList.contains("trash")) {
        target.classList.remove("lixeira--ativa");
        draggedCard.remove();
        const menu = document.querySelector(".menu");
        if (menu) {
            menu.remove();
        }
    }
    counter();
};

const create = ({ target }) => {

    const card = document.createElement("section")
    card.className = "card";
    const taskPriority = document.createElement("div");
    taskPriority.className = "taskPriority";
    const text = document.createElement("p");
    text.className = "text";
    text.innerHTML = `Voce comecou uma nova tarefa`;
    text.focus();
    const iconOptions = document.createElement("div");
    iconOptions.className = "iconOptions";
    const edit = document.createElement("i");
    edit.className = "fa-regular fa-pen-to-square edit";
    const moveUp = document.createElement("i");
    moveUp.className = "fa-solid fa-chevron-up moveUp";
    const copy = document.createElement("i");
    copy.className = "fa-regular fa-copy copy";
    const moveDown = document.createElement("i");
    moveDown.className = "fa-solid fa-chevron-down moveDown";
    card.appendChild(taskPriority);
    card.appendChild(text);
    card.appendChild(iconOptions);
    iconOptions.appendChild(edit);
    iconOptions.appendChild(moveUp);
    iconOptions.appendChild(copy);
    iconOptions.appendChild(moveDown);

    card.appendChild(createInnerContent());
    card.querySelector(".innerTaskItems__title").innerText = text.innerHTML;
    text.innerHTML = card.querySelector(".innerTaskItems__title").innerText;
    card.draggable = "true";
    text.contentEditable = "true";

    text.addEventListener("click", create);
    edit.addEventListener("click", editCard);
    copy.addEventListener("click", copyCard);

    text.style.cursor = "text";


    moveUp.addEventListener("click", moveThisFromUp);
    moveDown.addEventListener("click", moveThisFromDown);
    edit.addEventListener("click", editCard)
    card.addEventListener("focusout", () => {
        text.contentEditable = "false";

    })

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("click", create);
    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (card.querySelector(".text").textContent == "") card.remove();
        if (card.querySelector(".text").textContent == "delete") card.remove();
    })

    if (target.classList.contains("column__cards") || target.classList.contains("card")) return;

    if (target.classList.contains("text")) {
        target.contentEditable = "true";
        target.draggable = "false";
        target.focus();
    }

    if (target.classList.contains("adcionar")) {
        target.parentNode.parentNode.appendChild(card);
    }

    counter();
};

const editCard = ({ target }) => {
    target.parentElement.parentElement.getElementsByClassName("innerTaskItems")[0].classList.add("active");
}
const copyCard = ({ target }) => {
    const card = target.parentElement.parentElement;
    const newCardCopied = card.cloneNode(true);
    newCardCopied.addEventListener("dragstart", dragStart);
    newCardCopied.addEventListener("dragover", dragOver);
    newCardCopied.addEventListener("dragenter", dragEnter);
    newCardCopied.addEventListener("dragleave", dragLeave);
    newCardCopied.addEventListener("drop", drop)

    newCardCopied.querySelector(".edit").addEventListener("click", editCard);
    newCardCopied.querySelector(".copy").addEventListener("click", copyCard);

    newCardCopied.querySelector(".text").contentEditable = "true";
    newCardCopied.querySelector(".text").focus();
    newCardCopied.querySelector(".moveUp").addEventListener("click", moveThisFromUp);
    newCardCopied.querySelector(".moveDown").addEventListener("click", moveThisFromDown);

    newCardCopied.querySelector(".text").addEventListener("focusout", () => {
        newCardCopied.querySelector(".text").contentEditable = "false";

    })

    const innerTaskforThis = newCardCopied.querySelector(".innerTaskItems");
    innerTaskforThis.querySelector(".innerTaskItems__title").contentEditable = "true";
    innerTaskforThis.querySelector("li").contentEditable = "true";

    innerTaskforThis.querySelector("p").contentEditable = "true";
    const thisListDelete = innerTaskforThis.querySelectorAll(".removeThisItemFromList")

    thisListDelete.forEach((item) => {
        item.addEventListener("click", deleteThisListItem);
    })

    innerTaskforThis.querySelector(".addList").addEventListener("click", addListTask);

    innerTaskforThis.querySelector(".closeInnerTask").addEventListener("click", closeTask);

    innerTaskforThis.querySelector(".innerTaskPriority").addEventListener("change", newTaskPriority);



    target.parentElement.parentElement.parentElement.appendChild(newCardCopied);

    counter();
}

const newTaskPriority = ({ target }) => {
    const colorForPriority = target.value
    const recipient = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".taskPriority")
    recipient.style.backgroundColor = colorForPriority

    widthOfPriority()
}

const widthOfPriority = () => {
    const recipient = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".taskPriority")
    const recipientHeight = event.target.parentElement.parentElement.parentElement.parentElement.offsetHeight + 10

    recipient.style.height = `${recipientHeight}px`
}

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("click", create);
    column.parentElement.addEventListener("mouseenter", menu);
    column.parentElement.addEventListener("mouseleave", function () {
        const menu = document.querySelector(".menu");
        if (menu) menu.remove();
        const hovered = document.querySelector(".hovered");
        hovered.classList.remove("hovered");
    });

});

cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("touchstart", dragStart);
    card.addEventListener("click", create);
    card.addEventListener("drop", drop);
    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (card.querySelector(".text").textContent == "") card.remove();
        if (card.querySelector(".text").textContent == "delete") card.remove();
    })
});

edits.forEach((edit) => {
    edit.addEventListener("click", editCard);
})

duplicateThis.forEach((isDuplicated) => {
    isDuplicated.addEventListener("click", copyCard);
})

moveDown.forEach((moveThisDown) => {
    moveThisDown.addEventListener("click", moveThisFromDown);
})

moveUp.forEach((moveThisUp) => {
    moveThisUp.addEventListener("click", moveThisFromUp);
})

trash.forEach((lixeira) => {
    lixeira.addEventListener("click", deleteAll);
})

newFrame.addEventListener("click", addFrame);

window.onload = function () {
    counter();
}

closeInnerTask.forEach((closeThisTask) => {
    closeThisTask.addEventListener("click", closeTask);
})

innerTaskListItemsAdd.forEach((addListMyTask) => {
    addListMyTask.addEventListener("click", addListTask);
})

innerListItemsDelete.forEach((removeThisItemFromList) => {
    removeThisItemFromList.addEventListener("click", deleteThisListItem);

})

innerTaskPriority.forEach((thisTaskPriority) => {
    thisTaskPriority.addEventListener("change", newTaskPriority);
})


