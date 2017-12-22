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

    // Add data to graph
    var ctx = $('#rippleChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        responsive: true,
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


    // Refresh Price every 15 sec
    setInterval(function() {
        getData();
    }, 15000);


});
