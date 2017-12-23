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




    // get all data for graph
    var all_coin_data;
    var last_hour;
    var graph_data = "";
    var labels_data = []; 

    function generateGraphData() {
        // 1440 request for a 24 hour graph with 1 min intervals
        $.getJSON('https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&limit=20&aggregate=3&e=CCCAGG', function(json){
            all_coin_data = json;
            var unix_time;
            var price_min;

            $.each( all_coin_data, function(k,v) {
                // console.log("key = " + k);
                // console.log("value = " + v);

                if (k == "Data") {
                    last_hour = v;
                    //console.log(last_hour); 
                    $.each(last_hour, function(index) {
                        unix_time = last_hour[index].time;
                        price = last_hour[index].close;
                        // console.log("unix time = " + unix_time);
                        // console.log("price min = " + price);
                        var timestampInMilliSeconds = unix_time*1000;
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
                        var formated_time = hrs + ":" + mins;

                        graph_data = graph_data + '{x: "' + formated_time + '",y: ' + price + '},';
                        labels_data.push(formated_time);

                    });
                } else {

                }

            });

            graph_data = graph_data.substring(0,graph_data.length - 1);
            // labels_data = labels_data.substring(0,labels_data.length - 1);

            console.log("graph data - " + graph_data);
            console.log("labels data - " + labels_data);

            // Add data to graph
            var ctx = $('#rippleChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                responsive: true,
                data: {
                    labels: labels_data,
                    datasets: [{
                        label: 'Price of XRP',
                        // x time / y price
                        data: [graph_data],
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
            
        });
    }

    // Initial Load
    generateGraphData();




});
