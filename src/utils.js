export function elementHasClass(element, className) {
  return element.classList.contains(className);
}

export function getAttributeFromAncestors(element, attributeName) {
  let parentElement = element;

  while (parentElement) {
    if (parentElement.hasAttribute(attributeName)) {
      return parentElement.getAttribute(attributeName);
    }

    parentElement = parentElement.parentElement;
  }
}
