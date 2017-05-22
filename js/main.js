var DoubleClick = function (name) {
    this.handler = [];
    this.name = name;
};

var Subject = (function () {
    var events = [];

    function addHandler(event, handler) {
        event.handler.push(handler);
    }

    function removeHandler(handler) {
        var i;
        for (i = 0; i < handlers.length; i++) {
            if (this.handler[i] === handler) {
                this.handler.splice(i, 1);
                break;
            }
        }
    }

    function fire(event, eventArgs) {
        event.handler.forEach(function (h) {
            h(eventArgs);
        });
    }

    function getEvent(eventName) {
        return $.grep(events, function (event) {
            return event.name === eventName;
        })[0];
    }

    return {
        publish: function (eventName, eventArgs) {
            var event = getEvent(eventName);
            if (!event) {
                event = new DoubleClick(eventName);
                events.push(event);
            }
            fire(event, eventArgs);
        },

        subscribe: function (eventName, handler) {
            var event = getEvent(eventName);
            if (!event) {
                event = new DoubleClick(eventName);
                events.push(event);
            }
            addHandler(event, handler);
        }
    };
})();

var CardItems = function () { };

CardItems.prototype = function () {
    var Cart = function () {
        var items = [];
        this.addItem = function (item) {
            items.push(item);
            Subject.publish("itemAdded", item);
        };
    };

    var cartView = (function () {
        Subject.subscribe("itemAdded", function (eventArgs) {
            var newItem = $('<li></li>')
                .html(eventArgs.getDescription())
                .attr('id-cart', eventArgs.getId())
                .appendTo("#cart");
        });
    })();

    var cartController = (function (cart) {
        Subject.subscribe(
            "productSelected",
            function (eventArgs) {
                cart.addItem(eventArgs.product);
            });
    })(new Cart());

    return {
        c: Cart,
        cView: cartView,
        cController: cartController
    }
}();

var Product = function (id, description) {
    this.getId = function () {
        return id;
    };
    this.getDescription = function () {
        return description;
    };
};

var products = [
    new Product(1, "Star Wars Lego Ship"),
    new Product(2, "Barbie Doll"),
    new Product(3, "Remote Control Airplane")];

(function () {
    function onProductSelected() {
        var productId = $(this).attr('id');
        var product = $.grep(products, function (x) {
            return x.getId() == productId;
        })[0];
        Subject.publish("productSelected", {
            product: product
        });
    }

    products.forEach(function (product) {
        var newItem = $('<li></li>')
            .html(product.getDescription())
            .attr('id', product.getId())
            .dblclick(onProductSelected)
            .appendTo("#products");
    });
})();