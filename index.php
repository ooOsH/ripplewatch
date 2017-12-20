<?php include_once 'includes/_header.php'; ?>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <?php //include 'parts/off-canvas-nav.php'; ?>
                        <img class="card-img-top" src="/assets/images/ripple-white.svg" alt="Card image cap">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><small>Current price:</small><br> <span id="price" class="h5"></span> <span id="24hr"></span> <small>24hr</small></li>
                            <li class="list-group-item"><small>Current rank:</small><br><span id="pos" class="h5"></span></li>
                            <li class="list-group-item"><small>Market cap:</small><br> <span id="marketcap"></span></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card mt-4 mt-0-md mt-0-lg">
                        <div class="card-body">
                            <h3>Ripple News</h3>
                            <hr>
                            <p>Coming Soon!</p>
                        </div>
                    </div>
                    <div class="card mt-4">
                        <div class="card-body">
                            <h3>Buy Ripple</h3>
                            <hr>
                            <p>Coming Soon!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-light">
            <div class="mx-auto text-center">
                <small>Tip: rKsjwKThSJtTGEHwgXjXQ4CG5f5Qqa52DQ</small><br>
                <small>&copy; RippleWatch
                    <script type="text/javascript">
                        document.write(new Date().getFullYear());
                    </script> - <a href="#">contact us</a></small>
            </div>
        </nav>
    </main>
<?php include_once 'includes/_footer.php' ?>
