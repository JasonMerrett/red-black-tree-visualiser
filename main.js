tree = new RBTree();

for (let i = 0; i < 20; i++) {
    tree.insert(i);
}

// console.log(tree);
// console.log('height: ', tree.height());

const height = 400;
const width = 400;
const diameter = 25;
const treeObj = [];
const treeHeight = tree.height();

function preOrder(node, parent_node = false, parent = false, level) {
    if (!node) return;

    let new_node;

    console.log('new_node', node);

    console.log('parent node', parent_node);

    if (!parent) {
        new_node = {
            x: width/2,
            y: 50,
            diameter: diameter,
            colour: node.red ? 'red' : 'black',
            value: node.val
        };
    } else if (parent.left && parent.left == node) {
        new_node = {
            x: parent_node.x - (15 * level),
            y: parent_node.y + 40,
            diameter: diameter,
            type: 'left',
            colour: node.red ? 'red' : 'black',
            value: node.val
        };
    } else if (parent.right && parent.right == node) {
        new_node = {
            x: parent_node.x + (15 * level),
            y: parent_node.y + 40,
            diameter: diameter,
            type: 'right',
            colour: node.red ? 'red' : 'black',
            value: node.val
        };
    }

    treeObj.push(new_node);

    // TODO: Draw line to parent

    preOrder(node.left, new_node, node, level - 1);

    preOrder(node.right, new_node, node, level - 1);
}

function setupTree() {
    preOrder(tree.root, false, false, treeHeight);
    console.log('tree: ', treeObj);
}

function setup() {
    setupTree();
    createCanvas(width, height);
}

function draw() {
    background(200);

    for (const node of treeObj) {
        fill(node.colour)
        circle(node.x, node.y, node.diameter);
        fill('white');
        text(node.value, node.x - 4, node.y + 5);
    }
}