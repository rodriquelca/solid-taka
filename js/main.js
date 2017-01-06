function Product(id, description) {
    this.getId = function() {
        return id;
    };
    this.getDescription = function() {
        return description;
    };
}

function Cart() {
    var items = [];

    this.addItem = function(item) {
        items.push(item);
    };

    this.eventAggregator = function(product) {
        var newItem = $('<li></li>')
            .html(product.getDescription())
            .attr('id-cart', product.getId())
            .appendTo("#cart");
    };
}

var products = [
        new Product(1, "Star Wars Lego Ship"),
        new Product(2, "Barbie Doll"),
        new Product(3, "Remote Control Airplane")
    ],
    cart = new Cart();

(function() {
    function addToCart() {
        var productId = $(this).attr('id'),
            product = $.grep(products, function(x) {
                return x.getId() == productId;
            })[0];
            
        cart.addItem(product);
        cart.eventAggregator(product);
    }

    products.forEach(function(product) {
        $('<li></li>')
            .html(product.getDescription())
            .attr('id', product.getId())
            .dblclick(addToCart)
            .appendTo("#products");
    });
})();