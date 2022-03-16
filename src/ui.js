const listsContainer = document.querySelector(".board__lists");

const cardDialog = document.querySelector(".card-dialog");
const cardDialogTitleInput = document.querySelector(".card-dialog input");
const cardDialogDescInput = document.querySelector(".card-dialog textarea");
const cardDialogTitle = document.querySelector(".card-dialog__title");

export function paintLists(lists) {
  listsContainer.innerHTML = lists
    .map(
      (list) => `
        <div class="board__list" list-id=${list.id}>
          <div class="board__list__header">
            <div class="board__list__header__info">
              <p class="board__list__header__info__title">${list.title}</p>
              <div class="board__list__header__info__count">
              <p>${list.cards.length}</p>
            </div>
            </div>
            <div class="board__list__header__add">
              <i class="material-icons">add</i>
            </div>
          </div>
          <div class="card-list">
            ${cardsListHTML(list.cards)}
          </div>
        </div>
      `
    )
    .join("");
}

function cardsListHTML(cards) {
  return cards
    .map(
      (card) => `
      <div draggable="true" class="card" card-id=${card.id}>
        <div>
          <i class="card__remove tiny material-icons">close</i>
        </div>
        <p class="card__title">${card.title}</p>
        <p class="card__desc">
          ${card.desc}
        </p>
      </div>
    `
    )
    .join("");
}

export function closeCardDialog() {
  cardDialog.classList.remove("card-dialog--show");

  cardDialogTitleInput.value = "";
  cardDialogDescInput.value = "";
}

export function openCardDialogToEdit(card) {
  cardDialogTitle.textContent = "Edit Card";
  cardDialogTitleInput.value = card.title;
  cardDialogDescInput.value = card.desc;

  openCardDialog();
}

export function openCardDialogToAdd() {
  cardDialogTitle.textContent = "New Card";

  openCardDialog();
}

function openCardDialog() {
  cardDialog.classList.add("card-dialog--show");
}
