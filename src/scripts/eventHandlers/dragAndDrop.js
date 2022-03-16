import { renderListsWithFilter } from "../ui/render";
import { elementHasClass, getAttributeFromAncestors } from "../utils";
import { addCard, removeCard, getCard } from "../helpers/localStorage";

const listsContainer = document.querySelector(".board__lists");
const searchInput = document.querySelector(".header__search");

export default function initializeDragAndDrop() {
  listsContainer.addEventListener("dragstart", dragStart);
  listsContainer.addEventListener("dragend", dragEnd);
  listsContainer.addEventListener("dragenter", dragEnter);
  listsContainer.addEventListener("dragover", dragOver);
  listsContainer.addEventListener("dragleave", dragLeave);
  listsContainer.addEventListener("drop", drop);
}

function dragStart(e) {
  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);

  const cardID = getAttributeFromAncestors(e.target, "card-id");
  const listID = getAttributeFromAncestors(e.target, "list-id");

  e.dataTransfer.setData("text/plain", JSON.stringify({ cardID, listID }));
}

function dragEnd(e) {
  e.target.classList.remove("hide");
}

function dragEnter(e) {
  if (elementHasClass(e.target, "card-list")) {
    e.target.parentElement.classList.add("board__list--border");
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  if (elementHasClass(e.target, "card-list")) {
    e.target.parentElement.classList.remove("board__list--border");
  }
}

function drop(e) {
  if (!elementHasClass(e.target, "card-list")) {
    return;
  }

  e.target.parentElement.classList.remove("board__list--border");

  const destinationListID = getAttributeFromAncestors(e.target, "list-id");
  const { cardID, listID } = JSON.parse(e.dataTransfer.getData("text/plain"));

  if (destinationListID == listID) {
    return;
  }

  const card = getCard(cardID, listID);
  addCard(card, destinationListID);
  removeCard(cardID, listID);

  renderListsWithFilter(searchInput.value);
}
