class RBTree {
    constructor() {
        this.root = null;
    }

    insert(val){
        const node = new RBNode(val);
        node.red = true

        // Case 1: if there's no root, set new node to root and return
        if (!this.root) {
            this.root = node;
            return;
        }

        let current = this.root;
        while (current != null) {
            if (node.val < current.val) {
                if (current.left == null) {
                    current.left = node;
                    node.parent = current;
                    break;
                } else {
                    current = current.left;
                }
            } else if (node.val > current.val) {
                if (current.right == null) {
                    current.right = node;
                    node.parent = current;
                    break;
                } else {
                    current = current.right;
                }
            } else {
                // Duplicate so ignore
                return;
            }
        }

        this.insertFix(node)
    }

    insertFix(node) {
        let current = node;
        while (current != null && current.parent && current.parent.red) {
            let parent = current.parent;
            let grandparent = parent.parent;
            let uncle = null;
            if (!grandparent) break;

            if (parent == grandparent.right) {
                console.log(grandparent);
                uncle = grandparent.left;

                if (uncle && uncle.red) {
                    uncle.red = false;
                    parent.red = false;
                    grandparent.red = true;
                    current = grandparent;
                } else {
                    if (current == parent.left) {
                        current = parent;
                        this.rotateRight(current);
                        parent = current.parent;
                    }
                    parent.red = false;
                    grandparent.red = true;
                    this.rotateLeft(grandparent)
                }
            } else {
                uncle = grandparent.right;

                if (uncle && uncle.red) {
                    uncle.red = false;
                    parent.red = false;
                    grandparent.red = true;
                    current = grandparent;
                } else {
                    if (current == parent.right) {
                        current = parent;
                        this.rotateLeft(current);
                        parent = current.parent;
                    }
                    parent.red = false;
                    grandparent.red = true;
                    this.rotateRight(grandparent)
                }
            }
        }

        this.root.red = false;
    }

    rotateLeft(pivot_parent) {
        if (pivot_parent == null || pivot_parent.right == null) return;

        let pivot = pivot_parent.right;
        pivot_parent.right = pivot.left;
        if (pivot.left != null) {
            pivot.left.parent = pivot_parent
        }

        pivot.parent = pivot_parent.parent;
        if (pivot_parent.parent == null) {
            this.root = pivot;
        } else if (pivot_parent == pivot_parent.parent.left) {
            pivot_parent.parent.left = pivot;
        } else {
            pivot_parent.parent.right = pivot;
        }

        pivot.left = pivot_parent
        pivot_parent.parent = pivot;
    }

    rotateRight(pivot_parent) {
        if (pivot_parent == null || pivot_parent.left == null) return;

        pivot = pivot_parent.left;
        pivot_parent.left = pivot.right;
        if (pivot.right != null) {
            pivot.right.parent = pivot_parent
        }

        pivot.parent = pivot_parent.parent;
        if (pivot_parent.parent == null) {
            this.root = pivot;
        } else if (pivot_parent == pivot_parent.parent.right) {
            pivot_parent.parent.right = pivot;
        } else {
            pivot_parent.parent.left = pivot;
        }

        pivot.right = pivot_parent
        pivot_parent.parent = pivot;
    }

    delete(){}

    height() {
        if (!this.root) return 0;

        let left = 0;
        let current = this.root;
        while (current != null) {
            left += 1;
            current = current.left;
        }

        let right = 0;
        current = this.root;
        while (current != null) {
            right += 1;
            current = current.right;
        }

        return Math.max(left, right);
    }
}

class RBNode {
    constructor(val) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.val = val;
        this.red = false;
    }
}