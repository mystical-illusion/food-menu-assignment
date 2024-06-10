(function(window){
    var helloGretter = {};
    var gretterWord = "Hello";

    helloGretter.sayHello=function(names){
        console. log(gretterWord + " " + names);
    }

    window.helloGretter = helloGretter;

})(window);