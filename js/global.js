$(document).ready(function(){
  $('#bank_id').change(function(){
    $('.axis-option').hide();
    var dataPoints = [];
    var axisX;
    var bank_id = $(this).val();


    var chart = new CanvasJS.Chart("chartContainer", {
      title:{
        text: "Fertility Rate vs Life Expectancy in Different Countries - 2015"
      },
      axisY: {
        title:"CO2 savings",
        minimum: -50000,
      },
      legend:{
        horizontalAlign: "left"
      },
      data: [
      {
        type: "bubble",
        explodeOnClick: true,
        xValueFormatString: "#",
    		yValueFormatString: "#",
    		zValueFormatString: "#",
        toolTipContent: "<b>{name}</b><br/>Loan amount: {x} yrs<br/> CO2 savings: {y} kg<br/> Population: {z}mn",
        dataPoints: []
      }
      ]
    });

    $('#axis-option').change(function(){
      console.log($(this).val());
      axisX = $(this).val().strin;
      // return axisX;
      // var chart = new CanvasJS.Chart("chartContainer", {
      //   title:{
      //     text: "Fertility Rate vs Life Expectancy in Different Countries - 2015"
      //   },
      //   axisX: {
      //     title: axisX,
      //   }
      //   axisY: {
      //     title:"CO2 savings",
      //     minimum: -50000,
      //   },
      //   legend:{
      //     horizontalAlign: "left"
      //   },
      //   data: [
      //   {
      //     type: "bubble",
      //     explodeOnClick: true,
      //     xValueFormatString: "#",
      // 		yValueFormatString: "#",
      // 		zValueFormatString: "#",
      //     toolTipContent: "<b>{name}</b><br/>Loan amount: {x} yrs<br/> CO2 savings: {y} kg<br/> Population: {z}mn",
      //     dataPoints: []
      //   }
      //   ]
      // });
      // console.log(axisX);
      if($(this).val() === "time"){
        console.log();
         var chart = new CanvasJS.Chart("chartContainer", {
          title:{
            text: "Fertility Rate vs Life Expectancy in Different Countries - 2015"
          },
          axisX: {
            title: "Time",
          },
          axisY: {
            title:"CO2 savings",
            minimum: -50000,
          },
          legend:{
            horizontalAlign: "left"
          },
          data: [
          {
            type: "bubble",
            explodeOnClick: true,
            xValueFormatString: "#",
        		yValueFormatString: "#",
        		zValueFormatString: "#",
            toolTipContent: "<b>{name}</b><br/>Loan amount: {x} yrs<br/> CO2 savings: {y} kg<br/> Population: {z}mn",
            dataPoints: []
          }
          ]
        });
        $.ajax({
            url: './proxy.php',
            data: {
                bank_id: bank_id
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                for(item in data){
                  var i = data[item];
                  dataPoints.push({
                    x: i.disbursement_date,
                    y: i.co2_savings_kg,
                    z: i.disbursement_date,
                    name: i.loan_id });
                  item++;
                }
                chart.options.data[0].dataPoints = dataPoints;
                // chart.render();
            }
        });
      }else{
        return var chart = new CanvasJS.Chart("chartContainer", {
          title:{
            text: "Fertility Rate vs Life Expectancy in Different Countries - 2015"
          },
          axisX: {
            title: "axisX"
          },
          axisY: {
            title:"CO2 savings",
            minimum: -50000,
          },
          legend:{
            horizontalAlign: "left"
          },
          data: [
          {
            type: "bubble",
            explodeOnClick: true,
            xValueFormatString: "#",
        		yValueFormatString: "#",
        		zValueFormatString: "#",
            toolTipContent: "<b>{name}</b><br/>Loan amount: {x} yrs<br/> CO2 savings: {y} kg<br/> Population: {z}mn",
            dataPoints: []
          }
          ]
        });
        $.ajax({
            url: './proxy.php',
            data: {
                bank_id: bank_id
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                for(item in data){
                  var i = data[item];
                  dataPoints.push({
                    x: i.loan_amount_eur,
                    y: i.co2_savings_kg,
                    z: i.loan_amount_eur,
                    name: i.loan_id });
                  item++;
                }
                chart.options.data[0].dataPoints = dataPoints;
                // chart.render();
            }
        });
      }
      chart.render();
    });

    $('.axis-option').show();
    });
  });
