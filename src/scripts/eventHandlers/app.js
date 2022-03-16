import debounce from "lodash.debounce";

import { getAttributeFromAncestors, elementHasClass } from "../utils";
import { renderLists, renderListsWithFilter } from "../ui/render";
import {
  addCard,
  editCard,
  getCard,
  removeCard,
} from "../helpers/localStorage";
import {
  closeCardDialog,
  openCardDialogToAdd,
  openCardDialogToEdit,
} from "../ui/ui";

const listContainer = document.querySelector(".board__lists");
const searchInput = document.querySelector(".header__search");
const cardDialog = document.querySelector(".card-dialog");
const cardDialogForm = document.querySelector(".card-dialog__form");
const cardDialogTitleInput = document.querySelector(".card-dialog input");
const cardDialogDescInput = document.querySelector(".card-dialog textarea");

let selectedListID = null;
let selectedCardID = null;

export default function initializeApp() {
  listContainer.addEventListener("click", handleClickCard);
  listContainer.addEventListener("click", handleClickAddNewCard);
  listContainer.addEventListener("click", handleClickRemoveCard);
  cardDialog.addEventListener("click", handleCloseCardEditDialog);
  cardDialogForm.addEventListener("submit", handleSubmitCardDialog);
  searchInput.addEventListener("keyup", () =>
    debouncedHandleSearch(searchInput.value)
  );
}

function handleClickCard({ target }) {
  const desiredClassName = "card";

  if (
    elementHasClass(target, desiredClassName) ||
    elementHasClass(target.parentElement, desiredClassName)
  ) {
    selectedCardID = getAttributeFromAncestors(target, "card-id");
    selectedListID = getAttributeFromAncestors(target, "list-id");

    const card = getCard(selectedCardID, selectedListID);
    openCardDialogToEdit(card);
  }
}

function handleClickAddNewCard({ target }) {
  const desiredClassName = "board__list__header__add";

  if (
    elementHasClass(target, desiredClassName) ||
    elementHasClass(target.parentElement, desiredClassName)
  ) {
    selectedListID = getAttributeFromAncestors(target, "list-id");
    openCardDialogToAdd();
  }
}

function handleClickRemoveCard(e) {
  if (elementHasClass(e.target, "card__remove")) {
    e.stopPropagation();

    const cardID = getAttributeFromAncestors(e.target, "card-id");
    const listID = getAttributeFromAncestors(e.target, "list-id");

    removeCard(cardID, listID);
    renderLists();
  }
}

function handleCloseCardEditDialog({ target }) {
  if (elementHasClass(target, "card-dialog")) {
    closeCardDialogAndCleanup();
  }
}

function handleSubmitCardDialog(e) {
  e.preventDefault();

  if (!cardDialogTitleInput.value || !cardDialogDescInput.value) {
    return;
  }

  const card = {
    title: cardDialogTitleInput.value,
    desc: cardDialogDescInput.value,
  };

  if (selectedCardID) {
    editCard({ id: selectedCardID, ...card }, selectedListID);
  } else {
    addCard(card, selectedListID);
  }

  renderLists();
  closeCardDialogAndCleanup();
}

const debouncedHandleSearch = debounce(renderListsWithFilter, 500);

function closeCardDialogAndCleanup() {
  closeCardDialog();
  selectedListID = null;
  selectedCardID = null;
}
