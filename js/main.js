function List(id, name, items) {
    this._id = id;
    this._name = name;
    this._items = [];
    this.onSelectItem = null;
    this._DOM = {};

    this._onSelectItem =  function () {
        var that = this;
        return function (item) {
            if (typeof that.onSelectItem === 'function') {
                that.onSelectItem(that, item)
            }
        };
    }

    this.setItems = function (items) {
        this._items = [];

        if (!$.isArray(items)) {
            return this;
        }

        for (let item of items) {
            this.addItem(item);
        }
        return this;
    };

    this.addItem = function (item) {
        if (!(item instanceof Item)) {
            item = new Item(item.id, item.description, this._onSelectItem());
        }
        this._items.push(item);

        if (this._DOM.list) {
            this._DOM.list.appendChild(item.getHTML());
        }

        return this;
    };

    this.getHTML = function () {
        if (!this._html) {
            this._render();
        }
        return this._html;
    };

    this._render = function () {
        var div = document.createElement('div'),
            title = document.createElement('h2'),
            list = document.createElement('ul');

        title.appendChild(document.createTextNode(this._name));
        div.appendChild(title);
        div.appendChild(list);

        this._DOM.list = list;

        this.setItems(this._items.slice(0));

        this._html = div;

        return this;
    };

    this.setItems(items);
 }

function Item (id, description, onSelect) {
    this.getId = function () {
        return id;
    };

    this.getDescription = function () {
        return description;
    };

    this.getHTML = function () {
        if (!this._html) {
            this._render();
        }
        return this._html;
    };

    this._render = function () {
        var item = document.createElement('li'),
            that = this;

        item.appendChild(document.createTextNode(description));

        item.addEventListener('dblclick', function () {
            if (typeof onSelect === 'function') {
                onSelect(that);
            }
        });

        this._html = item;

        return this;
    };
 }

document.addEventListener('DOMContentLoaded', function () {
    var store = new List('store', 'Products', [
        {
            id: 1,
            description: "Star Wars Lego Ship"
        },
        {
            id: 2,
            description: "Barbie Doll"
        },
        {
            id: 3,
            description: "Remote Control Airplane"
        }
    ]),
        cart = new List('cart', 'Cart');

    store.onSelectItem = (list, item) => {
        cart.addItem({
            id: item.getId(),
            description: item.getDescription()
        });
    };

    store.getHTML().className = 'products-wrapper';
    cart.getHTML().className = 'cart-wrapper';

    document.body.appendChild(store.getHTML());
    document.body.appendChild(cart.getHTML());
});