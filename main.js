tree = new RBTree();

for (let i = 0; i < 10; i++) {
    console.log('inserting: ', i);
    tree.insert(i);
}

console.log(tree);
console.log('height: ', tree.height());