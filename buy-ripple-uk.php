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
                            <h3>Buy Ripple</h3>
                            <hr>
                            <p>We are currently offering Ripple through UK bank transer and most crytos - please get in touch with your order and we will aim to get back to you by the next working day.</p>
                            <form action="">
                                <div class="form-group">
                                    <label for="">Name</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Payment</label>
                                    <select class="form-control" id="">
                                        <option value="">Please choose...</option>
                                        <option>UK Bank Transfer</option>
                                        <option>BTC</option>
                                        <option>ETH</option>
                                        <option>BCH</option>
                                        <option>Other (Please specify in message)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Message</label>
                                    <textarea class="form-control" id="" rows="4"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<?php include_once 'includes/_footer.php' ?>
