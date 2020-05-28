// VUE

var changegrid = {
    template: "\
    <div class='change-grid'>\
        <i v-if='viewcomfy' @click='changegrid' class='material-icons'>view_module</i>\
        <i v-else @click='changegrid' class='material-icons'>view_comfy</i>\
    </div>\
    ",
    data() {
        return {
            viewcomfy: true
        }
    },
    methods: {
        changegrid: function() {
            this.$data.viewcomfy = !this.$data.viewcomfy
            $(".ecommerce").find("#products").toggleClass("comfy")
        }
    }
}

var productcount = {
    props: ["products"],
    template: "<p class='product-count center'>{{ n }} produits trouvées</p>",
    computed: {
        n() {
            return this.$props.products.length
        }
    }
}

var productbycolor = {
    props: ["products"],
    template: "\
    <div class='wrapper'>\
        <select @change='filterbycolor' v-model='selectedelement' \
                    class='browser-default' id='filterprice'>\
            <option v-for='option in options' :key='option.name' \
                    :value='option.value'>{{ option.name }}</option>\
        </select>\
    </div>\
    ",
    data() {
        return {
            selectedelement: "initial",
            options: [
                {name: "------", value: "initial"},
                {name: "Marron", value: "Marron"},
                {name: "Rose", value: "Rose"},
                {name: "Noir", value: "Noir"},
                {name: "Bordeau", value: "Bordeau"}
            ],
            images: []
        }
    },
    beforeMount() {
        var self = this
        self.$props.products.forEach(product => {
            self.$data.options.push(product)
        })
    },
    methods: {
        filterbycolor: function(color) {
            this.$emit("filterbycolor", this.$data.selectedelement)
        }
    }
}

var filterbar = {
    props: ["showpreload"],
    template: "\
    <div class='wrapper'>\
        <select @change='filterprice' v-model='selectedelement' \
                    class='browser-default' id='filterprice'>\
            <option v-for='option in options' :key='option.name' \
                    :value='option.value'>{{ option.name }}</option>\
        </select>\
    </div>\
    ",
    data() {
        return {
            selectedelement: "initial",
            options: [
                {name: "------", value: "initial"},
                {name: "Promotions", value: "promotions"},
                // {name: "Exclusive", value: "exclusive"},
                {name: "Croissant", value: "croissant"},
                {name: "Décroissant", value: "decroissant"}
            ]
        }
    },
    methods: {
        filterprice: function() {
            this.updateproducts()
            this.$emit("filterprice", "priceorder", this.$data.selectedelement)
        },
        updateproducts: function() {
            var self = this
            $.ajax({
                type: "GET",
                url: "http://example.com",
                cache: false,
                dataType: "json",
                beforeSend: function(){
                    self.$emit("updateproducts")
                },
                complete: function(){
                    self.$emit("updateproducts")
                },
                success: function (response) {
                    return response
                },
                error: function(response) {
                    return {response: "Error"}
                } 
            });
        }
    }
}

var cards = {
    props: ["products", "showpreload"],
    template:"\
    <div class='grid' id='products'>\
        <slot name='product_cards' tag='div'>\
            <div v-for='(product, index) in products' :key='product.id' class='product'>\
                <div v-if='showpreload' class='card-preloader'></div>\
                <a v-else @click='pushdatalayer(index, product)' :href='builddetailurl(product)' id='btn_product_details'>\
                    <div class='image'>\
                        <img :src='getmainimage(product.images)' :alt='product.slug'>\
                        <div v-if='displayedprice(product.discount_price)' class='discount-pct grey darken-2'>-{{ product.discount_pct }}%</div>\
                        <div v-show='product.exclusive' class='banner'>Exclusive</div>\
                    </div>\
                    <div class='details'>\
                        <div class='title'>{{ product.name }}</div>\
                        <div v-if='displayedprice(product.discount_pct)' class='price-details with-discount'>\
                            <div class='price'>{{ product.price_ht }}€</div>\
                            <div class='discounted-price'>{{ product.discount_pct }}€</div>\
                        </div>\
                        <div v-else class='price-details'>\
                            <div class='price'>{{ product.price_ht }}€</div>\
                        </div>\
                    </div>\
                </a>\
            </div>\
        </slot>\
    </div>\
    ",
    methods: {
        builddetailurl: function(product) {
            return "/" + window.location.pathname + product.id + "/" + product.slug
        },
        pushdatalayer: function(index, product) {
            if (product.discount_price) {
                price = product.discount_price
            } else {
                price = product.price_ht
            }

            // ANALYTICS
            dataLayer.push({
                "event": "productClick",
                "ecommerce": {
                    "click": {
                        "actionField": {
                            "list": "product collections"
                        },
                        "products": [{
                            "id": product.pk,
                            "name": product.name,
                            "price": product.price_ht,
                            "brand": "Nawoka",
                            "category": product.category,
                            "position": index
                        }]
                    }
                }
            })
        },
        getmainimage: function(images) {
            // Returns the main image of between
            // the list of images of the product
            var mainimage = ""
            images.forEach(image => {
                if (image.main_image === true) {
                    mainimage = image.image_url
                }
            })
            return mainimage
        },
        displayedprice: function(pct) {
            if (pct > 0) {
                return true
            }
            return false
        }
    }
}

var products = new Vue({
    el: "#vue_products",
    components: {cards, filterbar, productcount, productbycolor, changegrid},
    data() {
        return {
            products: [],
            productfilters: {priceorder: "initial", color: "initial"},
            showpreload: false
        }
    },
    mounted() {
        var self = this
        var baseurl = window.location.origin + "/api/v1"
        var currentpath = window.location.pathname

        this.$data.products = products

        // GET products
        // $.ajax({
        //     type: "get",
        //     url: baseurl + currentpath,
        //     success: function (response) {
        //         self.$data.products = response
        //     }
        // });
    },
    computed: {
        listproducts() {
            var products = this.$data.products
            if (products.length == 0) {
                return products
            }
            return this.sortproductsbycolor
        },
        sortproductsbycolor() {
            var self = this
            var products = self.sortproducts
            if (self.$data.productfilters["color"] === "initial") {
                return products
            }
            return products.filter(product => {
                var image = _.first(product.images)
                return image.variant === self.$data.productfilters["color"]
            })
        },
        sortproducts() {
            var self = this
            var copiedproducts = [...this.$data.products]

            if (self.$data.productfilters.priceorder === "initial") {
                return self.$data.products
            }
            
            if (self.$data.productfilters.priceorder === "croissant") {
                return copiedproducts.sort((a, b) => {
                    return a.price_ht - b.price_ht
                })
            }

            if (self.$data.productfilters.priceorder === "decroissant") {
                return copiedproducts.sort((a, b) => {
                    return b.price_ht - a.price_ht
                })
            }

            if (self.$data.productfilters.priceorder === "exclusive") {
                return self.$data.products.filter(product => {
                    return product.exclusive === true
                })
            }

            if (self.$data.productfilters.priceorder === "promotions") {
                return self.$data.products.filter(product => {
                    return product.discount_pct > 0
                })
            }
        }
    },
    methods: {
        dofilterbycolor: function(color) {
            this.$data.productfilters["color"] = color
        },
        dosort: function(value, method) {
            if (value === "priceorder") {
                this.$data.productfilters["priceorder"] = method
            }
        },
        dopreload: function() {
            this.$data.showpreload = !this.$data.showpreload
        }
    }
})