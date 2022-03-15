import debounce from "lodash.debounce";
import { elementHasClass, getAttributeFromAncestors } from "./utils";

import {
  getLists,
  getListsWithFilter,
  addCardToList,
  editCard,
  getCard,
} from "./localStorage";
import {
  paintLists,
  closeCardDialog,
  openCardDialogToAdd,
  openCardDialogToEdit,
} from "./ui";

const listContainer = document.querySelector(".board__lists");
const searchInput = document.querySelector(".header__search");
const cardDialog = document.querySelector(".card-dialog");
const cardDialogForm = document.querySelector(".card-dialog__form");
const cardDialogTitleInput = document.querySelector(".card-dialog input");
const cardDialogDescInput = document.querySelector(".card-dialog textarea");

searchInput.addEventListener("keyup", () =>
  debouncedHandleSearch(searchInput.value)
);
listContainer.addEventListener("click", handleClickCard);
listContainer.addEventListener("click", handleClickAddNewCard);
cardDialog.addEventListener("click", handleCloseCardEditDialog);
cardDialogForm.addEventListener("submit", handleSubmitCardDialog);

let selectedListID = null;
let selectedCardID = null;

showLists();

function showLists() {
  const lists = getLists();
  paintLists(lists);
}

function showListsWithFilter(filter = "") {
  const filteredLists = getListsWithFilter(filter);
  paintLists(filteredLists);
}

function cleanup() {
  selectedListID = null;
  selectedCardID = null;
}

function closeCardDialogAndCleanup() {
  closeCardDialog();
  cleanup();
}

const debouncedHandleSearch = debounce(showListsWithFilter, 500);

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
    addCardToList(card, selectedListID);
  }

  showLists();
  closeCardDialogAndCleanup();
}
