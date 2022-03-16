import initializeApp from "./scripts/eventHandlers/app";
import initializeDragAndDrop from "./scripts/eventHandlers/dragAndDrop";
import { renderLists } from "./scripts/ui/render";

initializeApp();
initializeDragAndDrop();

renderLists();
