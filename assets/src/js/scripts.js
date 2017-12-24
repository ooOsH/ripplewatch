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
        getData()
;    }, 15000);



    // get all data for graph
    var all_coin_data;
    var last_hour;
    var graph_data = [];
    var labels_data = [];

    function generateGraphDataHour() {
        // 1440 request for a 24 hour graph with 1 min intervals
        $.getJSON('https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&limit=60&aggregate=1&e=CCCAGG', function(json){
            all_coin_data = json;
            var unix_time;
            var price_min;

            $.each( all_coin_data, function(k,v) {

                if (k == "Data") {
                    last_hour = v;

                    $.each(last_hour, function(index) {
                        unix_time = last_hour[index].time;
                        price = last_hour[index].close;

                        var formated_time = formatUnixTime(unix_time);
                        labels_data.push(formated_time);

                        plot = {x: formated_time, y: price};
                        graph_data.push(plot);


                    });
                } else {

                }

            });

             outputGraph(labels_data, graph_data);

        });
    }

    function generateGraphDataDay() {
        // 1440 request for a 24 hour graph with 1 min intervals
        $.getJSON('https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&limit=287&aggregate=5&e=CCCAGG', function(json){
            all_coin_data = json;
            var unix_time;
            var price_min;

            $.each( all_coin_data, function(k,v) {

                if (k == "Data") {
                    last_hour = v;

                    $.each(last_hour, function(index) {
                        unix_time = last_hour[index].time;
                        price = last_hour[index].close;

                        var formated_time = formatUnixTime(unix_time);
                        labels_data.push(formated_time);

                        plot = {x: formated_time, y: price};
                        graph_data.push(plot);


                    });
                } else {

                }

            });

             outputGraph(labels_data, graph_data);

        });
    }

    //ouput grap
    function outputGraph(labels_data, graph_data){
        var ctx = $('#rippleChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            responsive: true,
            data: {
                labels: labels_data,
                datasets: [{
                    label: 'Price of XRP',
                    // x time / y price
                    data: graph_data,
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
                            beginAtZero: false
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
            }
        });
    }

    // format time
    function formatUnixTime(unixTimeStamp) {
        var timestampInMilliSeconds = unixTimeStamp*1000;
        var formated_time_date = new Date(timestampInMilliSeconds);
        var hrs = formated_time_date.getHours();
        var mins = formated_time_date.getMinutes();
        if (mins < 10) {
            mins = "0" + mins;
        } else {

        }
        var seconds = formated_time_date.getSeconds();
         if (seconds < 10) {
            seconds = "0" + seconds;
        } else {

        }

        var return_time = hrs + ':' + mins;

        return return_time;
    }


<<<<<<< HEAD
   // generateGraphDataHour();
    generateGraphDataDay();

    // crypto 
    var currency_data;

    function getCurrencyData() {

        fetch('https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&markets=Coinbase,Bitfinex')
          .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
=======
    // generateGraphDataHour();
    generateGraphDataDay();
>>>>>>> 2086fc4ffa87c0cbba977f03ffb79d92d6ca67e1

              // Examine the text in the response
              response.json().then(function(data) {
                console.log(data);
                var current_price = data.USD;
                console.log(current_price);
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });

    }

    getCurrencyData(); 

});
