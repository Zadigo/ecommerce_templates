var cart = [
    {
        pk: 1, name: "Bracelet en diamant pure", 
        price: "56.23", 
        taille: 45, 
        couleur: "Rouge", 
        image: "https://mybusinesses.s3.eu-west-3.amazonaws.com/nawoka/products/619f2b92f32710494895beb7b21eb2d9381edd1b/bottines_lacets_contours1.jpg"
    }
]

const globalvariables = {
    showdrawer: false
}

Vue.filter("euro", function(price) {
    return price + "€"
})

var likebutton = {
    template: "\
    <button @click='dolike' class='btn-floating btn-large grey lighten-1 z-depth-0'>\
        <i v-if='clicked' class='material-icons'>favorite</i>\
        <i v-else class='material-icons'>favorite_border</i>\
    </button>\
    ",
    data() {
        return {
            clicked: false,
            text: "favorite_border"
        }
    },
    methods: {
        dolike: function() {
           this.$data.clicked = !this.$data.clicked
        }
    }
}

var cartdrawer = {
    props: ["cart", "globalvariables"],
    template: "\
    <transition name='cart_drawer'>\
        <div @mouseover='activatedrawer' @mouseleave='deactivatedrawer' \
            v-if='globalvariables.showdrawer' class='dropdown-cart'>\
            <div class='products'>\
                <div v-for='product in cart' :key='product.pk' class='product'>\
                    <img :src='product.image' :alt='product.name'>\
                    <div class='details'>\
                        <div>Product name</div>\
                        <div>1 x {{ product.price|euro }}</div>\
                        <div>Taille : {{ product.taile }}</div>\
                        <div>Couleur : {{ product.color }}</div>\
                    </div>\
                </div>\
            </div>\
            <div class='actions'>\
                <a href='../cart.html' class='btn-large blue lighten-1 z-depth-0'>Voir le panier</a>\
            </div>\
        </div>\
    </transition>\
    ",
    methods: {
        activatedrawer: function() {
            globalvariables.showdrawer = true
        },
        deactivatedrawer: function() {
            setTimeout(function() {globalvariables.showdrawer=false}, 1000)
        }
    }
}

var cartapp = new Vue({
    el: "#vue_drawer",
    components: {cartdrawer},
    data() {
        return {
            cart: cart,
            globalvariables
        }
    }
})


var colortext = {
    props: ["color"],
    template: "\
    <div class='color'>\
        <span>Couleur :</span> {{ color }}\
    </div>\
    "
}

var descriptionbox = {
    template: "\
    <div>\
        <transition name='expanded_description' tag='div'>\
            <div @click='expandbox' class='title'>\
                <div>Description</div>\
                <i v-if='expanded' class='material-icons expand-description'>remove</i>\
                <i v-else class='material-icons expand-description'>add</i>\
            </div>\
        </transition>\
        <div class='content' :class='{\"expanded\": expanded}'>\
            <ul class='browser-default'>\
                <li>Longueur environ 83 cm (Basé sur une taille échantillon EU 36)</li>\
                <li>Le mannequin porte une taille UK 8/ EU 36/ AUS 8/ US 4</li>\
                <li>Taille du mannequin - 175 cm</li>\
            </ul>\
        </div>\
    </div>\
    ",
    data() {
        return {
            expanded: false
        }
    },
    methods: {
        expandbox: function() {
            this.$data.expanded = !this.$data.expanded
        }
    }
}

var colorselection = {
    props: ["colors"],
    template: "\
    <select @change='docolor' v-model='selectedcolor' name='colors' class='browser-default' id='colors'>\
        <option v-for='color in colors' :key='color' :value='color'>{{ color }}</option>\
    </select>\
    ",
    data() {
        return {
            selectedcolor: "",
            selectedimageurl: "",
        }
    },
    methods: {
        docolor: function() {
            this.$emit("docolor", "color", this.$data.selectedcolor)
        }
    }
}

var addtocart = {
    props: ["product", "image", "color"],
    template: "\
    <button @click='putincart' :class='buttonclass' id='btn_add_to_cart'>\
        {{ buttonname }}\
    </button>\
    ",
    data() {
        return {
            buttonname: "Ajouter au panier"
        }
    },
    computed: {
        buttonclass() {
            if (this.$props.product.outofstock === true) {
                return "btn-large waves-effect waves-light grey darken-1 z-depth-0 disabled"
            }
            return "btn-large waves-effect waves-light grey darken-1 z-depth-0"
        }
    },
    methods: {
        putincart: function() {
            var self = this

            // ANALYTICS
            // dataLayer.push({})

            // FACEBOOK

            // REMARKETING

            $.ajax({
                type: "GET",
                url: "/",
                // data: {product: "product"},
                dataType: "json",
                success: function (response) {
                    self.$emit("putincart", response)

                     // CART DRAWER
                    cart.push(
                        {
                            pk: self.$props.product.pk,
                            price: self.$props.product.price,
                            image: self.$props.image,
                            size: 45,
                            color: self.$props.color
                        }
                    )
                    globalvariables["showdrawer"] = true
                    $(".dropdown-cart").css({top: window.scrollY + "px"})
                    setTimeout(function() {globalvariables["showdrawer"] = false}, 3000)
                }
            });
        }
    }
}

var mainimage = {
    props: ["image", "stockstate"],
    template: "\
    <div class='image'>\
        <div v-if='stockstate' class='banner-out-of-stock'>\
            <span>Out of stock</span>\
        </div>\
        <div class='wm-zoom-container my-zoom'>\
            <div class='wm-zoom-box'>\
                <img :src='image.image_url' :alt='image.name'\
                         class='wm-zoom-default-img' :data-height-src='image.image_url'>\
            </div>\
        </div>\
    </div>\
    "
}

var sideimages = {
    props: ["images"],
    template: "\
    <div>\
        <img @click='selectimage(image)' :class='{selected: image.selected}' \
            v-for='(image, index) in images' :key='index' :src='image.image_url' :alt='image.name'>\
    </div>\
    ",
    methods: {
        selectimage: function(selectedimage) {
            this.$props.images.forEach(image => {
                image.selected = false
            })
            selectedimage.selected = true
        }
    }
}

var mobilesideimages = {
    props: ["images"],
    template: "\
    <div>\
        <img :class='{selected: image.selected}' v-for='(image, index) in images' :key='index' :src='image.image_url' :alt='image.name'>\
    </div>\
    "
}

var productapp = new Vue({
    el: "#product",
    components: {sideimages, mobilesideimages, mainimage, 
                    addtocart, colorselection, descriptionbox,
                        colortext, likebutton},
    data() {
        return {
            product: product,
            userselections: {},
            cursor: 0,
            colors: [],
            images: []
        }
    },
    beforeMount() {
        // this.$data.images = product["images"]
        // this.$data.images.forEach(image => {
        //     if (image.mainimage === true) {
        //         image.selected = true
        //     }
        // })

        // IMAGES
        this.$data.images = [...this.$data.product.images]

        // COLORS
        var colors = []
        _.forEach(this.$data.product.images, function(image) {
            colors.push(image.variant)
        })
        this.$data.colors = _.uniq(colors)
    },
    computed: {
        selectedimage() {
            return this.$data.images[this.$data.cursor]
        },
        mainimageurl() {
            return this.$data.images.filter(image => {
                return image.main_image == true
            })
        },
        mainimage() {
            return this.$data.images.filter(image => {
                return image.mainimage === true
            })
        }
    },
    methods: {
        updateuserselection: function(type, data) {
            this.$data.userselections[type] = data
        }
    }
})