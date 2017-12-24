<?php include_once 'includes/_header.php'; ?>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div class="card mb-4">
                        <img class="card-img-top" src="/assets/dist/images/ripple-white.svg" alt="Card image cap">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <small>Current price:</small><br>
                                <span id="price" class="h5 mr-2"></span>
                                <span id="24hr" class="h5"></span> <small>(24hr)</small>
                            </li>
                            <li class="list-group-item">
                                <small>Current rank:</small><br>
                                <span id="pos" class="h5"></span>
                            </li>
                            <li class="list-group-item">
                                <small>Market cap:</small><br>
                                <span id="marketcap" class="h5"></span>
                            </li>
                        </ul>
                        <div class="card-body">
                            <canvas id="rippleChart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card">
                        <div class="card-body">
                            <h3>Buy Ripple</h3>
                            <hr>
                            <p>We are currently offering Ripple through UK bank transer and most crytos - please get in touch with your order and we will aim to get back to you by the next working day.</p>
                            <a href="mailto:ripplewatch.co.uk" class="btn btn-outline-primary">Email us to find out more</a>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-body">
                            <h3>Buy BTC &amp; Alt Coins</h3>
                            <p>If you'd like to purchase coins to trade with us we recommend using Changelly</p>
                            <a href="https://changelly.com/?ref_id=86b230371301" target="_blank" class="btn btn-outline-primary"><i class="fa fa-btc" aria-hidden="true"></i> Buy BTC &amp; Alt Coins</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<?php include_once 'includes/_footer.php' ?>
