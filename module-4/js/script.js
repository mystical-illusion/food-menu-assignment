(function () {
  var names = ["yakvov", "jhone", "Jenny", "Angle", "jonson", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0);

    if (firstLetter === "J" || firstLetter === "j") {
      byeGretter.sayBye(names[i]);
    } else {
      helloGretter.sayHello(names[i]);
    }
  }
})();
