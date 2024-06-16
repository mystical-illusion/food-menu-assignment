$( function() { //same as document.addEventListener("DOMContentLoaded"...)
    //Same as document.querySelector("#navbarToggle").addEventListener("blur",..)

    $("#navbarToggle").blur(function(event)
{
    var screenWidth = window.innerWidth;
    if(screenWidth < 768)
        {
            $("#collapsable-nav").collapse('hide');
        }
    
});

});

( function (global){
    var dc = {};
    var homeHtml = "home-snippet.html";
    var categoriesTitlehtml = "categories-title-snippet.html";
    var categoryHtml = "category-snippet.html";
    var menuItemsTitleHtml = "menu-items-title.html";
    var menuItemHtml = "menu-item.html";
    //Convinience function for insertig innerHTML for 'select'
    var insertHTML = function(selector , html){
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    //show loading icon inside element identified by 'selector'.
    var showLoading = function(selector) {
        var html = "<div class = 'text-center'>";
        html += "< img src = 'imgages/ajex-loader.gif'></div>";
        insertHTML(selector,html);
    };

    // return substitute of '{{propNamw}}'
    //with propValue in given 'string'
    var insertProperty = function (string , propName , propValue)  {
        var propToReplace = "{{"+ propName +"}}";
        string = string
        .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    //on first load(before images or css)
    document . addEventListener("DOMContentLoaded", function(event)
{
    //On first load, show home view 
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        homeHtml,
        function(responseText){
            document.querySelector("#main-content")
            .innerHTML = responseText;
        },
    false);
});

//Load the menu categories view
dc.loadMenuCategories = function() {
    showLoading("#main-content");
    $ajeaxUtils.sendGetRequest(
        allCategoriesUrl,
        buildAndShowCategoriesHTML
    );
};

// Load the menu item view
//'categoryShort' is a short_name for a category
dc.loadMenuItem = function (categoryShort){
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
        menuItemUrl + categoryShort,
        buildAndShowMenuItemsHtml
    );
};

//Builds HTML for categories page based on the data
// from the server
function buildAndShowCategoriesHTML(categories){
    // Load title snippet of categories page 
    $ajaxUtils.sendGetRequest(
        categoriesTitleHtml,
        function(categoriesTitleHtml){
            // retrieve single category snippet
            $ajaxUtils.sendGetRequest(
                categoryHtml,
                function(categoryHtml){
                    var categoriesViewHtml=
                    buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml);
                    insertHTML("#main-content",categoriesViewHtml);
                },
           false);
        },
    false);
}

// using categories data and snippet html
// build categories view HTML to be inserted into page

function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){
    var finalHtml = categoriesTitleHtml;
    finalHtml += "<section class ='row>";

    //Loop over categories
    for(var i = 0; i < categories.length; i++){
        // Insert categories
        var html = categoryHtml;
        var name = "" + categories[i].name;
        var short_name = categories[i].short_name;
        html = 
        insertProperty(html, "name", name);
        html = 
         insertProperty(html,"short_name",short_name);
         finalHtml += html;

    }
    finalHtml += "</section>";
    return finalHtml;
}

// Build HTML for the single category page based on the data
// from the server

function buildAndShowMenuItemsHTML (categoryMenuItem){
    // Load title snippet of menu item page
    $ajaxUtils.sendGetRequest(
        menuItemsTitleHtml,
        function(menuItemsTitleHtml){
            //retrieve single menu item snippet
            $ajaxUtils.sendRequest(
                menuItemHtml,
                function(menuItemHtml){
                    var menuItemsViewHtml = 
                    buildMenuItemsViewHtml(categoryMenuItems,menuItemsTitleHtml,menuItemHtml);
                    insertHTML("#main-content",menuItemsViewHtml);
                },
            false);
        },
    false);
}
 // using category and menu items data and snippet html
 // build menu items view HTML to be inserted into page

 function buildMenuItemsViewHtml( categoryMenuItems,menuItemsTitleHtml,menuItemHtml){
    menuItemsTitleHtml = 
    insertProperty(menuItemsTitleHtml,"name",categoryMenuItems.category.name);
    menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions",
        categoryMenuItems.category.special_instruction
    );
    var finalHtml = menuItemsTitleHtml;
    finalHtml += "<section class='row>";
    // Loop over menu item
    var menuItems = categoryMenuItems.menu_items;
    var catShortName = categoryMenuItems.category.short_name;
    for(var i = 0; i < menuItems.length; i++){
        //insert menu item values
        var html = menuItemHtml;
        html = insertProperty(html,"short_name", menuItems[i], short_name);
        html = insertProperty(html,"catSortName",catShortName);
        html = insertItemPrice(html,"price_small",menuItems[i].price_small);
        html = insertItemPortionName(html,"large_portion_name",menuItems[i],large_portion_name);
        html = insertProperty(html,"name",menuItems[i].name);
        html = insertProperty("description",menuItems[i].description);
        //Add clearfix after every second menu item
        if(i%2 != 0){
            html += "<div class='clearfix visible-lg-block visible-md-block></div>"
        }
        finalHtml += html;
    }
    finalHtml += "</section>;";
    return finalHtml
 }
  //Append price with '$' if price exists
  function insertItemPrice(html,pricePropName,priceValue){
    //if not specified, replace with empty string
    if(!priceValue){
        return insertProperty(html,pricePropName,"");;
    }
    priceValue = "$" + priceValue.toFixed(2);
    html = insertProperty(html,pricePropName, priceValue);
    return html;
  }
  //Appends portion name in paens if it exists
  function insertItemPortionName(html,portionPropName,portionValue){
    // if not specified ,return original strinh
    if(!portionValue){
        return insertProperty(html, portionPropName, "");
    }
    portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
  }

 global.$dc=dc;

    })(window);




function redirectSpecial() {
    var domains = ["www.google.com" , "www.gmail.com" , "www.github.com"];
    var randomChoice = Math.floor(Math.random() * domains.length);
    window.location.href = domains[randomChoice];
}