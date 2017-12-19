
<?php include_once 'header.php'; 
      ?> 
    <main>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card mx-auto" style="width: 20rem;margin-top: 5%; margin-bottom: 20px;">
                        <?php include 'parts/off-canvas-nav.php'; ?>
                        <img class="card-img-top" src="/assets/images/ripple-white.svg" alt="Card image cap">
                        <div class="card-body">
                            <h4 class="card-title">XRP</h4>
                            Everything Ripple
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><small>Current price:</small><br> <span id="price"></span> (<span id="24hr"></span>) <small>24hr</small></li>
                            <li class="list-group-item"><small>Current rank:</small><br><span id="pos"></span></li>
                            <li class="list-group-item"><small>Market cap:</small><br> <span id="marketcap"></span></li>
                        </ul>
                    </div>

                </div>

                
            </div>
        </div>
        <nav class="navbar navbar-light">
            <div class="mx-auto text-center">
                <ul class="list-inline">
                    <!-- <li class="list-inline-item"><a href="#" class="btn btn-outline-dark btn-sm">GBP</a></li> -->
                    <li class="list-inline-item"><a href="#" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#contact_modal">Buy Ripple via Ripple Watch</a></li>
                </ul>
                <small>Tip: rKsjwKThSJtTGEHwgXjXQ4CG5f5Qqa52DQ</small><br>
                <small>&copy; RippleWatch
                    <script type="text/javascript">
                        document.write(new Date().getFullYear());
                    </script> - <a href="#">contact us</a></small>
            </div>
        </nav>
    </main>


    <!-- Contact Modal -->
    <div class="modal fade" id="contact_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="">Name</label>
                            <input type="text" class="form-control" id="name" aria-describedby="name" placeholder="Enter your name">
                        </div>
                        <div class="form-group">
                            <label for="">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter your email">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


       
<?php include_once 'footer.php' ?>
