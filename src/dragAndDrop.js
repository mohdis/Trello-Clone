import { renderListsWithFilter } from "./render";
import { getAttributeFromAncestors } from "./utils";
import { addCard, removeCard, getCard } from "./localStorage";

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
  if (e.target.classList.contains("card-list")) {
    e.target.parentElement.classList.add("board__list--border");
  }
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {
  if (e.target.classList.contains("card-list")) {
    e.target.parentElement.classList.remove("board__list--border");
  }
}

function drop(e) {
  if (!e.target.classList.contains("card-list")) {
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
