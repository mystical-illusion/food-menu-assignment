function redirectSpecial() {
    var domains = ["single-category.html" , "single-category2.html" , "single-category3.html"];
    var randomChoice = Math.floor(Math.random() * domains.length);
    window.location.href = domains[randomChoice];
}