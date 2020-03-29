var trigger2 = {
    template: "\
    <a @click='triggerdropdown'>\
        <i class='material-icons'>shopping_cart</i>\
    </a>\
    ",
    methods: {
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "account")
        }
    }
}

var searchicontrigger = {
    template: "\
    <a @click='triggerdropdown'>\
        <i class='material-icons'>search</i>\
    </a>\
    ",
    methods: {
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "search")
        }
    }
}

var searchbar = {
    props: ["searchstate"],
    template: "\
    <transition name='drop'>\
        <div v-if='searchstate' class='search-bar'>\
            <div class='wrapper'>\
                <input @keypress.enter='dosearch' v-bind='searchvalue' class='browser-default' type='search' name='search' id='search' placeholder='Rechercher' autocomplete='off'>\
                <i @click='triggerdropdown' class='material-icons'>close</i>\
            </div>\
        </div>\
    </transition>\
    ",
    data() {
        return {
            searchvalue: ""
        }
    },
    methods: {
        dosearch: function() {
            $.ajax({
                type: "GET",
                url: window.location.href = "/products1.html",
                dataType: "json",
                success: function (response) {
                    
                }
            });
        },
        triggerdropdown: function() {
            this.$emit("triggerdropdown", "search")
        }
    }
}

var dropdownbar = {
    props: ["dropdownstate"],
    template: "\
    <transition name='drop'>\
        <div v-if='dropdownstate' class='dropdown'>\
            <div class='section'>\
                <ul>\
                    <li>Chaussures</li>\
                    <li>Robes</li>\
                    <li>Vêtements</li>\
                </ul>\
            </div>\
            <div class='section'>W</div>\
            <div class='section'>C</div>\
        </div>\
    </transition>\
    ",
    data() {
        return {
            sections: [
                {links: [
                    {name: "Chaussures", link: ""},
                    {name: "Robes", link: ""},
                    {name: "Vêtements", link: ""}
                ]}
            ]
        }
    }
}

var navbar = new Vue({
    el: "#vue_navbar",
    components: {dropdownbar, searchbar, searchicontrigger, trigger2},
    data() {
        return {
            searchstate: false,
            dropdownstate: false
        }
    },
    methods: {
        initiatedropdown: function(name) {
            if (name === "search") {
                setInterval(function() {$("#search").focus()}, 500)
                this.$data.dropdownstate = false
                this.$data.searchstate = !this.$data.searchstate
            }

            if (name === "account") {
                this.$data.searchstate = false
                this.$data.dropdownstate = !this.$data.dropdownstate
            }
        }
    }
})