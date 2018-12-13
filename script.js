$(document).ready(function() {
    
    
    //Create buttons to sort by alphabetical order and answer count by asc and desc order. These are put in a dropdown menu called "Sort Menu"
    $("div.container.header-container").append("<div class=\"dropdown\"></div>");
    $("div.dropdown").append("<button class=\"dropdown-button button\">Sort Menu <i class=\"down\"></i></button><div class=\"dropdown-content\">");
    $("div.dropdown-content").append("<button class=\"button natural alphaSort\">Sort Questions Alphabetically (Asc)</button>");
    $("div.dropdown-content").append("<button class=\"button alphaSort\">Sort Questions Alphabetically (Desc)</button>");
    $("div.dropdown-content").append("<button class=\"button natural aCountSort\">Sort Questions By Answer Count (Asc)</button>");
    $("div.dropdown-content").append("<button class=\"button aCountSort\">Sort Questions By Answer Count (Desc)</button>");
    $("div.container.header-container").append("<input class=\"input\" id=\"searchText\" type=\"text\" placeholder=\"Filter questions for...\">");

    //Adding instructions/information list
    $("section.section.header-section").append("<ul class=\"intro-text\"><li>Questions are sorted so that answered question appear at the bottom of the list.</li><li>Questions can be sorted by alphabetical order or by the number of answers, both in ascending or descending order (accessible from the dropdown 'Sort Menu' above).</li><li>All question answer forms can be shown or hidden by clicking the 'Show/Hide Question' button below each question.</li><li>Any question text can be searched by using the 'Filter questons' box above.</li><li>The number of total answers for each question can be seen to the right of each question as part of the 'answercount' field.</li></ul>")

    //Create answered/unanswered question divs (to later sort answered and unanswered questions)
    $("div.container.questions-container").append("<div class=\"unanswered-questions\"></div>");
    $("div.container.questions-container").append("<div class=\"answered-questions\"></div>");

    $("div.unanswered-questions").append($("form").parent().parent());
    $("div.answered-questions").append($("p.question-answered-text").parent().parent());

    /* ************************************************************************************ */
    /* Alphabetical Sort                                                                    */                                       
    /* ************************************************************************************ */
    $(".alphaSort").click(function() {
        var qAnsArray = [];
        var qUnansArray = [];
              
        $.each($("div.answered-questions div.question"), function(i) {
            qAnsArray[i] = $(this);
        });
        $.each($("div.unanswered-questions div.question"), function(i) {
            qUnansArray[i] = $(this);
        });

        if ($(this).hasClass("natural")) {
            qAnsArray.sort(function(a,b) {
                if (a.find("div.question-header").text() == b.find("div.question-header").text()) {
                    return 0;
                } else if (a.find("div.question-header").text() < b.find("div.question-header").text()) {
                    return -1;
                } else {
                    return 1;
                }
            });
            qUnansArray.sort(function(a,b) {
                if (a.find("div.question-header").text() == b.find("div.question-header").text()) {
                    return 0;
                } else if (a.find("div.question-header").text() < b.find("div.question-header").text()) {
                    return -1;
                } else {
                    return 1;
                }
            });
        } else {
            qAnsArray.sort(function(a,b) {
                if (a.find("div.question-header").text() == b.find("div.question-header").text()) {
                    return 0;
                } else if (a.find("div.question-header").text() < b.find("div.question-header").text()) {
                    return 1;
                } else {
                    return -1;
                }
            });
            qUnansArray.sort(function(a,b) {
                if (a.find("div.question-header").text() == b.find("div.question-header").text()) {
                    return 0;
                } else if (a.find("div.question-header").text() < b.find("div.question-header").text()) {
                    return 1;
                } else {
                    return -1;
                }
            });
        }
        
        $.each(qUnansArray, function(i) {
            $("div.unanswered-questions").append(qUnansArray[i]);
        });
        $.each(qAnsArray, function(i) {
            $("div.answered-questions").append(qAnsArray[i]);
        });
    });
    /* *********************************************************************************** */
    /* Answer Count Sort                                                                   */                                  
    /* *********************************************************************************** */
    $(".aCountSort").click(function() {
        var qAnsArray =[];
        var qUnansArray = [];
        
        $.each($("div.answered-questions div.question"), function(i) {
            qAnsArray[i] = $(this);
        });
        $.each($("div.unanswered-questions div.question"), function(i) {
            qUnansArray[i] = $(this);
        });

        if ($(this).hasClass("natural")) {
            qAnsArray.sort(function(a,b) { 
                return a.attr("data-answercount") - b.attr("data-answercount");
            });
            qUnansArray.sort(function(a,b) {
                return a.attr("data-answercount") - b.attr("data-answercount");
            }); 
        } else {
            qUnansArray.sort(function(a,b) {
                return b.attr("data-answercount") - a.attr("data-answercount");
            });
            qAnsArray.sort(function(a,b) { 
                return b.attr("data-answercount") - a.attr("data-answercount");
            });
        }

        
        $("div.unanswered-questions div.question").detach();
        $("div.answered-questions div.question").detach();
        $.each(qUnansArray, function(i) {
            $("div.unanswered-questions").append(qUnansArray[i]);
        });
        $.each(qAnsArray, function(i) {
            $("div.answered-questions").append(qAnsArray[i]);
        });
    });
    /* *********************************************************************************** */
    /* Filter Search                                                                       */
    /* *********************************************************************************** */
    $("#searchText").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("div.question").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    /* *********************************************************************************** */

    //Append answercount data to the end of each question
    $("div.question-header").append("Answercount: ");
    $("div.question-header").each(function() {
        $(this).append($(this).parent().data("answercount"));
    });

    //Add button to hide/show each question form
    $("div.question-body").append("<button class=\"button hidebutton\" >Show/Hide Question</button>");
    $("button.hidebutton").click(function(e) {
        $(e.currentTarget).prev().toggle();
    });
    
    // Format review page
    $(".review-section").before("<div><h1 class=\"rev\">Review</h1></div><hr>");
    
});
