
export default class DOMUtils {
    static insertBefore(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }

    static insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}
