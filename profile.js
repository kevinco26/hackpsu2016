$(document).ready(function(){
   var url = window.location.href;
   var index = url.indexOf('profile') + 8;
   var username = url.substring(index).trim();

   $(".username").each(function(){
      $(".username").html(username);
   });
    $(".stackoverflow").each(function(){
      $(this).hide();
   });
    $(".company").each(function(){
      $(this).hide();
   });

    var previousPoint = null, previousLabel = null;
 
        $.fn.UseTooltip = function () {
            $(this).bind("plothover", function (event, pos, item) {
                if (item) {
                    if ((previousLabel != item.series.label) ||
                 (previousPoint != item.dataIndex)) {
                        previousPoint = item.dataIndex;
                        previousLabel = item.series.label;
                        $("#tooltip").remove();
 
                        var x = item.pageX;
                        var y = item.pageY;
 
                        var color = item.series.color;
                        //alert(color)
                        //console.log(item.series.xaxis.ticks[x].label);                
                        
                        if (x > $(this).width())
                        {
                           x = $(this).width();
                        }
                        showToolTip("tooltip", x, y, 14, "white",
                           "&nbsp;&nbsp;&nbsp;&nbsp;" + item.datapoint[0] + "&nbsp;&nbsp;&nbsp;&nbsp;");
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        };

    function showToolTip(id, x, y, fontSize, color, contents) {     
   //PRE:   x and y are page coordinates, id is the id of the div to be created, contents is information to be displayed
   //POST:  A div is appended to the body of the page and contains contents     
      var div = $('<div id="' + id +'">' + contents + '</div>')
      div.css({
           position: 'absolute',
           top: y - 25,
           left: x + 5,
           padding: '2px',     
           size: '10',   
           'font-size': fontSize,
           'border-radius': '6px 6px 6px 6px',
           'background-color': color
       }).appendTo('body').fadeIn(200);
   }

   jQuery.ajax({
           type: "GET",
           url: "/getData/" + username,
           success: function(data){
            data = data[0];
            if (data){
               if (data.usertype == "company")
               {
                     $(".company").each(function(){
                        $(".company").html(data.fname).show();
                     });
               }
               else
               {
                  $(".fname").each(function(){
                     $(".fname").html(data.fname);
                  });
                  $(".lname").each(function(){
                     $(".lname").html(data.lname);
                  });
               

               if (data.stackoverflow) {
                  jQuery.ajax({
                      url: "https://api.stackexchange.com/2.2/users/"+ data.stackoverflow + "?site=stackoverflow&filter=!-*f(6q0gNxwu",
                      dataType: 'json',
                      error: function(){
                        alert('Error. Stack Exchange Account Not Found.');
                      },
                      success: function(stackdata){
                           jQuery.ajax({
                             type: "GET",
                             data: {stackdata:stackdata},
                             success: "yes",
                             dataType: JSON
                           });
                           stackdata = stackdata.items[0];
                           console.log(stackdata);

                           

                           var rawData = [
                               [stackdata.answer_count, 0], 
                               [stackdata.badge_counts.gold, 1],  
                               [stackdata.badge_counts.silver, 2],   
                               [stackdata.badge_counts.bronze, 3],    
                               [stackdata.question_count, 4],  
                               [stackdata.reputation, 5],       
                               [stackdata.up_vote_count, 6]     
                           ];

                           var dataSet = [
                               { label: "Stack Overflow Data", data: rawData, color: "white" }
                           ];

                           var ticks = [
                               [0, "Question Count"], [1, "Gold Badges"], [2, "Silver Badges"], [3, "Bronze Badges"], [4, "Question Count"], [5, "Reputation"], [6, "Up Votes"]
                           ];

                           var options = {
                              series: {
                                  bars: {
                                      show: true
                                  }
                              },
                              bars: {
                                  align: "center",
                                  barWidth: 0.5,
                                  horizontal: true,
                                  fillColor: { colors: [{ opacity: 0.5 }, { opacity: 1}] },
                                  lineWidth: 1
                              },
                              xaxis: {
                                 max: 300,
                                 font:{
                                    size:15,
                                    style:"italic",
                                    weight:"bold",
                                    family:"sans-serif",
                                    variant:"small-caps",
                                    color: "white"
                                 },
                                  tickColor: "white",
                                  color: "gray"
                              },
                              legend: {
                                 show: false
                              },
                              yaxis: {
                                 font:{
                                    size:15,
                                    style:"italic",
                                    weight:"bold",
                                    family:"sans-serif",
                                    variant:"small-caps",
                                    color: "white"
                                 },
                                  axisLabel: "Collected Data",
                                  axisLabelUseCanvas: false,
                                  axisLabelFontSizePixels: 12,
                                  axisLabelFontFamily: 'Verdana, Arial',
                                  tickColor: "#5E5E5E",
                                  ticks: ticks,
                              },
                              grid: {
                                 margin: 15,
                                 hoverable: true,
                                  borderWidth: 2,
                                  backgroundColor: { colors: ["#171717", "#4F4F4F"] }
                              }
                          };
                          $(".stackoverflow").each(function(){
                              $(this).show();
                           });
                          $.plot($("#stackplot"), dataSet, options);
                          $("#stackplot").UseTooltip();
                         }
                      });

               }
               if (data.githubUser) {
                  index = data.githubUser.indexOf(".com") + 5;
                  var user = data.githubUser.substring(index).trim();
                  console.log("user is " + user);
                  jQuery.ajax({
                   url: "https://api.github.com/users/"+ user +"/repos",
                   dataType: 'json',
                   error: function(){
                     alert('Error! There was an error');
                   },
                   success: function(data){
                        if (data)
                        {
                           var repo;
                           for (var i = 0; i < data.length; i++)
                           {
                              repo = data[i].clone_url;
                              console.log(data[i]);
                              $("#repoList").append('<li><a href="' + repo + '">' + data[i].name + '</a></li>');
                           }
                        }
                     }
                  });

               }

            }
           }
        }
   });
});