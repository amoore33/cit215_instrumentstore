let popUp = document.querySelector(".popUp");
popUp.addEventListener("click", function() {
    popUp.style.display = "none";
    popUp.innerHTML = "";
});

let app = new Vue({
    el: "#app",
    data: {
        items: [
            {
                name: "Stratocaster",
                type: "Guitar",
                price: "$2099.99",
                brand: "Fender",
                image: "assets/austrato.jpg",
                inCart: false
            },
            {
                name: "Jazzmaster",
                type: "Guitar",
                price: "$1199.99",
                brand: "Fender",
                image: "assets/novjazz.jpg",
                inCart: false
            },
            {
                name: "EZ-300",
                type: "Keyboard",
                price: "$299.99",
                brand: "Yamaha",
                image: "assets/ez300.jpg",
                inCart: false
            },
            {
                name: "YX-135",
                type: "Xylophone",
                price: "$1610.95",
                brand: "Yamaha",
                image: "assets/yx135.webp",
                inCart: false
            },
            {
                name: "S70",
                type: "Guitar",
                price: "$1099.90",
                brand: "Maton",
                image: "assets/s70.png",
                inCart: false
            },
            {
                name: "Concert Ukelele",
                type: "Ukulele",
                price: "$899.99",
                brand: "Maton",
                image: "assets/conuke.png",
                inCart: false
            }
        ],
        formName: "",
        formType: "",
        formPrice: "",
        formBrand: ""
    },
    mounted() {
        if (localStorage.getItem("items")) {
            try {
                this.items = JSON.parse(localStorage.getItem("items"));
            } catch (e) {
                localStorage.removeItem("items");
            }
        }
    },
    methods: {
        addItem() {
            if (this.formName && this.formType && this.formPrice && this.formBrand) {
                let formItem = {
                    name: this.formName,
                    type: this.formType,
                    price: this.formPrice,
                    brand: this.formBrand.replace(/\s/g,""),
                    image: "assets/noimage.png",
                    inCart: false
                };
                this.items.push(formItem);
                this.formName = "";
                this.formType = "";
                this.formPrice = "";
                this.formBrand = "";
                localStorage.setItem("items", JSON.stringify(this.items));
            }
        },
        showPopUp(item) {
            popUp.innerHTML = `<p><strong>${item.name}</strong></p><p>${item.price}</p><p><em>${item.brand}</em></p>`;
            popUp.style.display = "flex";
        },
        storeEmpty() {
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i].inCart) return false;
            }
            return true;
        },
        addToCart(item) {
            item.inCart = true;
            let cartLength = 0;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].inCart) cartLength++;
            }
            document.querySelector("#cart-button").innerHTML = `CART (${cartLength})`;
        },
        emptyCart() {
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].inCart = false;
            }
            document.querySelector("#cart-button").innerHTML = "CART (0)";
        }
    }
});