
// index.js
var http = require("http")
var mt = require("microtime")

var S = new http.Server(function(req,res){
  var body = []
  var len = 0
  req.on("data",function(data){
    body.push(data)
    len += data.length
  })
  req.on("end",function(){
    res.writeHead(200,{
      "x-by":"simple node app",
      "content-type":"text/plain"
    })
    res.write(process.pid+" at "+mt.now()+"\n")
    res.end("on "+req.url+" received request with body of "+len+" bytes\n")
  })
})

if(process.__cocaine){
  S.listen({_handle:process.__cocaine})
} else {
  S.listen(8080)
}


setTimeout(function(){S.close()},20000)

