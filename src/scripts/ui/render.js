import { paintLists } from "./ui";
import { getLists, getListsWithFilter } from "../helpers/localStorage";

export function renderLists() {
  const lists = getLists();
  paintLists(lists);
}

export function renderListsWithFilter(filter = "") {
  const filteredLists = getListsWithFilter(filter);
  paintLists(filteredLists);
}
