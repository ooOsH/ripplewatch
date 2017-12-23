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
                label: 'Price of XRP',
                // x time / y price
                data: [{
                        x: "13:56",
                        y: "0.41"
                    }, {
                        x: "13:57",
                        y: "0.45"
                    }, {
                        x: "13:58",
                        y: "0.44"
                    }],
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


    // get all data for graph
        var all_coin_data;
        var last_hour;
        var graph_data = [];

        function generateCoinData() {
            // 1440 request for a 24 hour graph with 1 min intervals
            $.getJSON('https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&limit=60&aggregate=3&e=CCCAGG', function(json){
                all_coin_data = json;
                var unix_time;
                var price_min;

                $.each( all_coin_data, function(k,v) {
                    // console.log("key = " + k);
                    // console.log("value = " + v);

                    if (k == "Data") {
                        last_hour = v;
                        console.log(last_hour); 
                        $.each(last_hour, function(index) {
                            unix_time = last_hour[index].time;
                            price = last_hour[index].close;
                            // console.log("unix time = " + unix_time);
                            // console.log("price min = " + price);
                            var timestampInMilliSeconds = unix_time*1000;
                            var formated_time = new Date(timestampInMilliSeconds);
                            console.log(formated_time);
                        });
                    } else {

                    }

                });
                console.log("graph data = " + graph_data[0]);
            });

           return last_hour;
        }

        // Initial Load
        generateCoinData();



});
