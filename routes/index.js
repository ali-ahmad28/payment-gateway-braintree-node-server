const braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  }); 

module.exports = function (app) {
    app.get("/braintree", function (req, res) {
        res.send("Braintree route is healthy");
    });

    app.get("/api/braintree/v1/getToken",async (req,res)=>{
        try{
            gateway.clientToken.generate({},(err,result)=>{
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.send(result);
                }
            });
        }
        catch(err){
            res.status(500).send(err);
        }
    });

    app.post("/api/braintree/v1/sandbox",async (req,res)=>{
        try{
            var nonceFromTheClient = req.body.nonce;

            var newTransaction = gateway.transaction.sale({
                amount: "10.00",
                paymentMethodNonce: nonceFromTheClient,
                options:{
                    submitForSettlement: true,
                }
            },
            (err,result)=>{
                if(result){
                    res.send(result);
                }
                else{
                    res.status(500).send(err);
                }
            }
            );
        }
        catch(err){
            res.send(err);
        }
    })
}