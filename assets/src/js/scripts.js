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

    // // Hook in the coincapmarket api
    // var ripple_price;

    // function getData() {
    //     $.getJSON('https://api.coinmarketcap.com/v1/ticker/ripple/', function(json){
    //         ripple_price = json;
    //         console.log(ripple_price);

    //         var price = formatCurrency(ripple_price[0].price_usd, 4);
    //         var marketcap  = formatCurrency(ripple_price[0].market_cap_usd, 1);
    //         var dailychange = ripple_price[0].percent_change_24h + '%';

    //         if (parseInt(dailychange) < 0) {
    //             $('#24hr').css('color', 'red');
    //         } else {
    //             $('#24hr').css('color', 'green');
    //         }

    //         $('#price').text(price);
    //         $('#pos').text('#' + ripple_price[0].rank);
    //         $('#marketcap').text(marketcap);
    //         $('#1hr').text(ripple_price[0].percent_change_1h + '%');
    //         $('#24hr').text(dailychange);
    //         $('#7days').text(ripple_price[0].percent_change_7d + '%');
    //     });
    // }

    // // Initial Load
    // getData();

    // // Refresh Price every 15 sec
    // setInterval(function() {
    //     getData();
    // }, 120000)



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
        $.getJSON('https://min-api.cryptocompare.com/data/histominute?fsym=XRP&tsym=USD&limit=71&aggregate=20&e=CCCAGG', function(json){
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
            data: {
                labels: labels_data,
                datasets: [{
                    label: 'XRP',
                    data: graph_data,
                    backgroundColor: [
                        'rgba(45, 159, 227, 0.2)',
                    ],
                    borderColor: [
                        '#2d9fe3',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        display: false
                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    // enabled: false
                },
                elements: {
                    point: {
                        // radius: 0
                    }
                }
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


   // generateGraphDataHour();
    generateGraphDataDay();

    // cryptocurrecy api functions
    var coin_id = "";
    var coin_price_dol = "";
    var coin_price_euro = "";
    var coin_price_btc = "";
    var percent_change_24h = "";
    var rank = "";
    var coin_symbol = "";
    var coin_full_name = "";
    var market_cap = "";
    var coin_base_url = "";
    var coin_image_url = "";
    var coin_full_img_url = "";
    var total_coin_supply = "";


    function genCoinData(coinName) {

        getCoinListData(coinName);
        getCoinPriceData(coinName);
        getGenAvgData(coinName);
        getCoinSnapShot(coin_id);

        console.log("coinid - " + coin_id);
        console.log("coin_price_dol - " + coin_price_dol);
        console.log("percent_change_24h - " + percent_change_24h);
        console.log("coin_symbol - " + coin_symbol);
        console.log("coin_full_name - " + coin_full_name);
        console.log("total_coin_supply - " + total_coin_supply);
        console.log("market_cap - " + market_cap);
        console.log("coin_full_img_url - " + coin_full_img_url);

        if (parseInt(percent_change_24h) < 0) {
            $('#24hr').css('color', 'red');
        } else {
            $('#24hr').css('color', 'green');
        }

        $('#price').text("$" + coin_price_dol);
        $('#marketcap').text("$" + market_cap);
        $('#24hr').text(percent_change_24h + "%");
    
    }

    function getCoinListData(coinName) {

        fetch('https://min-api.cryptocompare.com/data/all/coinlist')
             .then(
               function(response) {
                 if (response.status !== 200) {
                   console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                   return;
                 }

                 // Examine the text in the response
                 response.json().then(function(data) {
                  
                    coin_full_name = data.Data[coinName].FullName;
                    coin_symbol = data.Data[coinName].Name;
                    coin_id = data.Data[coinName].Id;

                 });
               }
             )
             .catch(function(err) {
               console.log('Fetch Error :-S', err);
             });

    }

    function getCoinPriceData(coinName){
        fetch('https://min-api.cryptocompare.com/data/price?fsym='+ coinName + '&tsyms=BTC,USD,EUR')
             .then(
               function(response) {
                 if (response.status !== 200) {
                   console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                   return;
                 }

                 // Examine the text in the response
                 response.json().then(function(data) {

                    coin_price_btc = data.BTC;
                    coin_price_euro = data.EUR;
                    coin_price_dol = data.USD;

                   
                 });
               }
             )
             .catch(function(err) {
               console.log('Fetch Error :-S', err);
             });
    }

    function getGenAvgData(coinName){
        fetch('https://min-api.cryptocompare.com/data/generateAvg?fsym=' + coinName + '&tsym=USD&e=Bitfinex')
             .then(
               function(response) {
                 if (response.status !== 200) {
                   console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                   return;
                 }

                 // Examine the text in the response
                 response.json().then(function(data) {
                    

                    $.each( data, function(k,v) {

                        percent_change_24h = v.CHANGEPCT24HOUR;

                    });
                   
                 });
               }
             )
             .catch(function(err) {
               console.log('Fetch Error :-S', err);
             });
    }

    function getCoinSnapShot(coinID) {
        console.log("coin id = " + coinID);
        fetch('https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182')
             .then(
               function(response) {
                 if (response.status !== 200) {
                   console.log('Looks like there was a problem. Status Code: ' +
                     response.status);
                   return;
                 }

                 // Examine the text in the response
                 response.json().then(function(data) {

                    coin_base_url = data.General.BaseUrl;
                    coin_image_url = data.General.ImageUrl;
                    coin_full_img_url = "https://www.cryptocompare.com" + coin_base_url + coin_image_url;
                    total_coin_supply = data.General.TotalCoinSupply;
                    market_cap = total_coin_supply * coin_price_dol;

                 });
               }
             )
             .catch(function(err) {
               console.log('Fetch Error :-S', err);
             });
    }


    genCoinData("XRP");

    // genCoinData("XRP");

    setInterval(function() {
        genCoinData("XRP");
    }, 10000)

});
