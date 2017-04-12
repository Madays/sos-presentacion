function previewImage() {
    var oFReader = new FileReader();
    
    oFReader.readAsDataURL(document.getElementById("form-image").files[0]);

    oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
};

    var ParseObj = Parse.Object.extend('myClass'); //create local parse object from your Parse class

$('#form-info').submit(function(e) {
        //on form submit
        e.preventDefault();

        var imageVars = $("#form-image").val().split('.');
        var imageName = "name." + imageVars[imageVars.length - 1];
        var imageData = document.getElementById("uploadPreview").src;
        var parseFile = prepareSaveFile(imageName, imageData);
 
        //get data from form
        var data = {
            direction: $("#direction").val(),
            select: $("#myselect option:selected").text(),
            image : parseFile
        };
    
    console.log(data);
        
    parseObj = new ParseObj();
    //create new Parse object
    /*
    parseObj.set('fname',data.fname);
    parseObj.set('lname',data.lname);
    parseObj.set('email',data.email);
    */
    //match the key values from the form, to your parse class, then save it
    parseObj.save(data, {
    //if successful
        success: function(parseObj) {
            alert(parseObj.get('direction') + " " + parseObj.get('select') + " saved to Parse.")
        },
        error: function(parseObj, error) {
            console.log(parseObj);
            console.log(error);
            }
        }
    );
});

 function prepareSaveFile(name, imageData){         
        var parseFile = new Parse.File(name, { base64: imageData });
        parseFile.save().then(function() {
            // The file has been saved to Parse.
        }, function(error) {
            // The file either could not be read, or could not be saved to Parse.
            console.log('error parseFile');
        });
        return parseFile;
    }
                                  
         /*SEGUNDA FORMA                         
        function parseConection() {
            alert('Holis');
            
            var TableMessage = Parse.Object.extend("Message");
            var tableMessage = new TableMessage();
            tableMessage.set("emisor", 'Mari');
            tableMessage.set("mensaje", 'HOLIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Buenas noches');
            tableMessage.set("foto", 'HOLIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Buenas noches');
            

            tableMessage.save(null, {
                success: function(tableMessage) {

                },
                error: function(tableMessage, error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });

        }
        
        function parseConsulta(){
            var TableMessage = Parse.Object.extend("Message");
            var query = new Parse.Query(TableMessage);
            
            query.equalTo('emisor','Mari');
            query.include('Message');
            
            query.find({
               success: function(results){
                    for (var i = 0; i < results.length; i++) {
                               var object = results[i];
                                console.log(object.get('mensaje'));
                        
                        }
               },
                error: function(message){
                    
                },
            });
        }*/
   