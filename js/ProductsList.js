var ProductsList = function(options) {
    this.products = [];
    this.el = null;
    ProductsList.prototype.init.call(this, options);
};
ProductsList.prototype.init = function(options) {
    var defaults = {
        products: [],
        el : document.body,
        dobleClickHandler: function(){}
    };
    $.extend(true, defaults, options);
    this.setDobleClickHandler(defaults.dobleClickHandler);
    this.setProducts(defaults.products);
    this.setElement(defaults.el);
    this.createHTML();
    return this;
};
ProductsList.prototype.setDobleClickHandler = function(hanlder){
    if (typeof hanlder === "function"){
        this.dobleClickHandler = hanlder;
    }
    return this;
};
ProductsList.prototype.setElement = function(el){
    this.el = el;
    return this;
};
ProductsList.prototype.addProduct = function(product) {
    var newProduct;
    $.extend(true, product, {dobleClickHandler: this.dobleClickHandler});
    newProduct = new Product(product);
    this.products.push(newProduct);
    if (this.html){
        this.html.append(newProduct.createHTML());
    }
    return this;
};
ProductsList.prototype.setProducts = function(products) {
    var i;
    this.clearProducts();
    for (i = 0; i < products.length; i += 1) {
        this.addProduct(products[i]);
    }
    return this;
};
ProductsList.prototype.findProduct = function(id) {
    var i,
        resp = null;
    for (i = 0; this.products.length; i += 1) {
        if (this.products[i].id === id) {
            resp = this.products[i];
            break;
        }
    }
    return resp;
};
ProductsList.prototype.getProducts = function() {
    return this.products;
};

ProductsList.prototype.removeProduct = function(id) {
    var product, position;
    product = this.findProduct(id);
    if (product) {
        position = this.products.indexOf(product);
        product = this.products.splice(index, 1);
    } else {
        console.log("no existe el producto");
    }
    return product;
};

ProductsList.prototype.clearProducts = function() {
    this.products = [];
    return this;
};
ProductsList.prototype.getDescription = function() {
    return this.description;
};

ProductsList.prototype.createHTML = function (){
    var html,
        i;
    if (this.html){
        return this.html;
    }
    this.html = this.el;
    for (i=0; i < this.products.length; i+=1){
        this.html.append(this.products[i].createHTML());
    }
    return this;
};