var product = {
    images: [
        {url: "../../assets/images/image1.jpg", name: "", selected: false, mainimage: true},
        {url: "../../assets/images/image2.jpg", name: "", selected: false, mainimage: false},
        {url: "../../assets/images/image3.jpg", name: "", selected: false, mainimage: false}
    ],
    outofstock: false
}

var colorselection = {
    template: "\
    <select name='colors' class='browser-default' id='colors'>\
        <option v-for='color in colors' :key='color' :value='color'>{{ color }}</option>\
    </select>\
    ",
    data() {
        return {
            colors: ["Red", "Blue", "Green"]
        }
    }
}

var addtocart = {
    props: ["product"],
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
            dataLayer.push({
                // SOMETHING
            })

            // FACEBOOK

            // REMARKETING

            $.ajax({
                type: "POST",
                url: "https://example.com",
                data: {product: "product"},
                dataType: "json",
                success: function (response) {
                    // DO SOMETHING
                    // self.$emit("putincart", response)
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
        <img :src='image.url' :alt='image.name'>\
    </div>\
    "
}

var sideimages = {
    props: ["images"],
    template: "\
    <div>\
        <img @click='selectimage(image)' :class='{selected: image.selected}' v-for='(image, index) in images' :key='index' :src='image.url' :alt='image.name'>\
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
        <img :class='{selected: image.selected}' v-for='(image, index) in images' :key='index' :src='image.url' :alt='image.name'>\
    </div>\
    "
}

var product = new Vue({
    el: "#product",
    components: {sideimages, mobilesideimages, mainimage, addtocart, colorselection},
    data() {
        return {
            product: product,
            images: []
        }
    },
    beforeMount() {
        this.$data.images = product["images"]
        this.$data.images.forEach(image => {
            if (image.mainimage === true) {
                image.selected = true
            }
        })
    },
    computed: {
        selectedimage() {
            var image =  this.$data.images.filter(image => {
                return image.selected === true
            })
            return image[0]
        },
        mainimage() {
            return this.$data.images.filter(image => {
                return image.mainimage === true
            })
        }
    },
    methods: {

    }
})