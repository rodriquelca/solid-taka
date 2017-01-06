var Product = function(options) {
    this.html = null;
    Product.prototype.init.call(this, options);
};
Product.prototype.init = function(options) {
    var defaults = {
        id: "",
        description: "",
        dobleClickHandler: function(){}
    };
    $.extend(true, defaults, options);
    this.setID(defaults.id);
    this.setDescription(defaults.description);
    this.setDobleClickHandler(defaults.dobleClickHandler);
    return this;
};

Product.prototype.setDobleClickHandler = function(handler){
    if (typeof handler === 'function'){
        this.dobleClickHandler = handler;
    }
    return this;
};

Product.prototype.setID = function(productID) {
    this.id = productID;
    return this;
};

Product.prototype.setDescription = function(description) {
    this.description = description;
    return this;
};

Product.prototype.getID = function() {
    return this.id;
};

Product.prototype.getDescription = function() {
    return this.description;
};

Product.prototype.createHTML = function(){
    if(this.html){
        return this.html;
    }
    this.html = $('<li></li>');
    this.html.html(this.getDescription());
    this.html.attr("id", this.getID());
    this.eventListener();
    return this.html;
};

Product.prototype.eventListener = function(){
    var that = this;
    if(this.html){
        if ( typeof this.dobleClickHandler === "function" ){
            this.html.dblclick(function(){
                that.dobleClickHandler(that.getID(), that.getDescription());
            });
        }
    }
    return this;
};