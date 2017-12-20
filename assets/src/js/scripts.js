// Main js file for ripplewatch.co.uk
// Version 1.0

// Optional JavaScript
// jQuery first, then Popper.js, then Bootstrap JS

$(function() {

    // Format those large numbers
    function formatCurrency(total, decimal) {
        var neg = false;
        if(total < 0) {
            neg = true;
            total = Math.abs(total);
        }
        return (neg ? "-$" : '$') + parseFloat(total, 10).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
    }

    // Hook in the coincapmarket api
    var ripple_price;

    function getData() {
        $.getJSON('https://api.coinmarketcap.com/v1/ticker/ripple/', function(json){
            ripple_price = json;
            console.log(ripple_price);

            var price = formatCurrency(ripple_price[0].price_usd, 4);
            var marketcap  = formatCurrency(ripple_price[0].market_cap_usd, 1);
            var dailychange = ripple_price[0].percent_change_24h + '%';

            if (parseInt(dailychange) < 0) {
                $('#24hr').css('color', 'red');
            } else {
                $('#24hr').css('color', 'green');
            }

            $('#price').text(price);
            $('#pos').text('#' + ripple_price[0].rank);
            $('#marketcap').text(marketcap);
            $('#1hr').text(ripple_price[0].percent_change_1h + '%');
            $('#24hr').text(dailychange);
            $('#7days').text(ripple_price[0].percent_change_7d + '%');
        });
    }

    // Initial Load
    getData();

    // Refresh Price every 15 sec
    setInterval(function() {
        getData();
    }, 15000);


});
