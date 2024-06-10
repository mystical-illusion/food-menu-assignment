(function(window){
    var byeGretter = {};
    var gretterWord = "Goodbye";

    byeGretter.sayBye=function(names){
        console. log(gretterWord + " " + names);
    }

    window.byeGretter = byeGretter;

})(window);