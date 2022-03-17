const INITIAL_STATE = [
  {
    id: 0,
    title: "To Do",
    cards: [
      {
        id: Date.now(),
        title: "Watch Spider-Man No Way Home movie",
        desc: "First i should download it and then watch and enjoy",
      },
    ],
  },
  {
    id: 1,
    title: "Doing",
    cards: [
      {
        id: Date.now() + 1,
        title: "Write tests for trello clone app",
        desc: "I need to config jest and a dom testing library to write tests",
      },
    ],
  },
  {
    id: 2,
    title: "Done",
    cards: [
      {
        id: Date.now() + 2,
        title: "Implement Drag and Drop api for Trello clone app",
        desc: "I need to read MDN document first and after that implement it, don't forget writing tests",
      },
      {
        id: Date.now() + 3,
        title: "Implement ui designs",
        desc: "I'm gonna pick a random design from dribble that is task manager app",
      },
    ],
  },
];

export function getLists() {
  const lists = localStorage.getItem("lists");
  return lists ? JSON.parse(lists) : INITIAL_STATE;
}

export function getListsWithFilter(filter = "") {
  const lists = getLists();
  if (!filter) return lists;

  const lowerCasedFilter = filter.toLowerCase();

  return lists.map((list) => ({
    ...list,
    cards: list.cards.filter(
      (card) =>
        card.title.toLowerCase().includes(lowerCasedFilter) ||
        card.desc.toLowerCase().includes(lowerCasedFilter)
    ),
  }));
}

export function addCard(card, listID) {
  if (!card || !listID) return;

  const lists = getLists();
  const list = lists.find((list) => list.id == listID);

  list.cards.push({ id: Date.now(), ...card });
  saveLists(lists);

  return lists;
}

export function removeCard(cardID, listID) {
  if (!cardID || !listID) return;

  const lists = getLists();
  const index = lists.findIndex((list) => list.id == listID);
  lists[index].cards = lists[index].cards.filter((card) => card.id != cardID);

  saveLists(lists);
}

export function editCard(editedCard, listID) {
  if (!editedCard || !listID) return;

  const lists = getLists();
  const list = lists.find((list) => list.id == listID);
  const cardIndex = list.cards.findIndex((card) => card.id == editedCard.id);

  list.cards[cardIndex] = editedCard;
  saveLists(lists);

  return lists;
}

export function getCard(cardID, listID) {
  if (!cardID || !listID) return;

  const lists = getLists();
  const list = lists.find((list) => list.id == listID);
  const card = list.cards.find((card) => card.id == cardID);

  return card;
}

function saveLists(lists) {
  localStorage.setItem("lists", JSON.stringify(lists));
}
