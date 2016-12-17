var BinarySearchTree = function (key) {

  var Node = function (key) {
    this.value = key;
    this.right = null;
    this.left = null;
  };

  var root = new Node(key);

  this.insert = function (key) {
    var newNode = new Node (key);

    var insertNode = function (node) {
      if (newNode.value < node.value) {
        if(node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      }
      if(newNode.value > node.value) {
        if(node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right);
        }
      }
    }
    insertNode(root);
  }
  this.contains = function (key) {

    function searchNode (node) {
      if (node === null) {
        return false;
      } else if(node.value === key) {
        return true;
      } else if (key < node.value) {
        return searchNode(node.left);
      } else if (key > node.value) {
        return searchNode (node.right);
      }
    }
   return searchNode(root);

  }

  this.inOrderTraverse = function (callback, returnALL, returnEach) {
    var results = [];

    function inOrderTraverseNode (node) {
      if(node !== null){
        inOrderTraverseNode(node.left);
        if (returnEach) {
          callback(node.value);
        }
        if (returnALL) {
          results.push(node.value);
        }
        inOrderTraverseNode(node.right);
      }
    }

    inOrderTraverseNode(root)
    if(returnALL){
      return results;
    }

  }

  this.preOrderTraverse = function (callback, returnALL, returnEach) {
    var results = [];
    function preOrderTraverseNode (callback, node) {
      if (node!==null) {
        if (returnALL) {
          results.push(node.value);
        }
        if (returnEach) {
          callback(node.value);
        }
        preOrderTraverseNode(callback, node.left);
        preOrderTraverseNode(callback, node.right);
      }
    }
    preOrderTraverseNode(callback, root);
    if (returnALL) {
      return results;
    }
  }

  this.postOrderTraverse = function (callback, returnALL, returnEach) {
    var results = [];
    function postOrderTraverseNode (callback, node) {
      if (node !== null && node !== undefined) {
        postOrderTraverseNode(callback, node.left);
        postOrderTraverseNode(callback, node.right);
        if (returnEach) {
          callback(node.value)
        }
        if (returnALL) {
          results.push(node.value)
        }
      }
    }
    postOrderTraverseNode(callback, root);
    if (returnALL) {
      return results;
    }
  }

  this.min = function () {
    function minNode (node) {
      while(node.left !== null) {
        node = node.left
      }
      return node.value;
    }
      return minNode(root);
  }

  this.max = function () {
   function maxNode (node) {
     while(node.right) {
       node = node.right;
     }
     return node.value;
   }
   return maxNode(root);
  }

  this.remove = function (key) {
  var context = this;
  function minNode (node) {
      while(node.left !== null) {
        node = node.left
      }
      return node;
    }
  function removeNode (node, key) {
    if (node === null) {
      return null;
    } else if (key < node.value) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.value) {
      node.right = removeNode(node.right, key);
      return node;
    } else { // the key is found
      //case 1 when node is a leaf
      if (node.left === null && node.right === null) {
        node = null;
        return node;
        // case 2 when node has 1 child
      } else if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
        // case 2 when node has right and left child
      } else {
        var aux = minNode(node.right);
        node.value = aux.value;
        node.right = removeNode(node.right, aux.value)
        return node;
      }
    }
  }
  removeNode(root, key);
  };
};
