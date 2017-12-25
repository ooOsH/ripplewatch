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
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card">
                        <div class="card-body">
                            <h3>Last 24hr</h3>
                            <hr>
                            <canvas id="rippleChart"></canvas>
                       </div>
                    </div>
                    <div class="card">
                        <div class="card-body">                      
                            <a class="twitter-timeline" data-height="550" href="https://twitter.com/Ripple?ref_src=twsrc%5Etfw">Tweets by Ripple</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<?php include_once 'includes/_footer.php' ?>
