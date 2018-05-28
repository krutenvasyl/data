$(document).ready(function(){
    var loans = [];
    var chartType = false;

    var chartColumns = {
        byTime: {
            columns: function(loan){
                var tooltipTitle = loan.loan_id;
                var tooltipCO2 = loan.co2_savings_kg;
                var tooltipDate = loan.disbursement_date;
                var investmentCosts = loan.investment_costs_eur;
                var loanAmount = loan.loan_amount_eur;
                var bankName = loan.name;

                return {
                    name: loan.loan_id,
                    y: loan.co2_savings_kg,
                    x: new Date(loan.disbursement_date),
                    z: loan.loan_amount_eur,
                    tooltipTitle: tooltipTitle,
                    tooltipCO2: tooltipCO2,
                    tooltipDate: tooltipDate,
                    investmentCosts: investmentCosts,
                    loanAmount: loanAmount,
                    bankName: bankName,
                };
            },
            chartOptions: function(chartOptions){
                chartOptions.title.text = 'Chart By Time';
                chartOptions.axisY.title = 'CO2 savings';

                return chartOptions;
            }
        },
        byLoanAmount: {
            columns: function(loan){
                var tooltipTitle = loan.loan_id;
                var tooltipCO2 = loan.co2_savings_kg;
                var tooltipDate = loan.disbursement_date;
                var investmentCosts = loan.investment_costs_eur;
                var loanAmount = loan.loan_amount_eur;
                var bankName = loan.name;

                return {
                    name: loan.loan_id,
                    y: loan.co2_savings_kg,
                    x: loan.loan_amount_eur,
                    z: loan.investment_costs_eur,
                    tooltipTitle: tooltipTitle,
                    tooltipCO2: tooltipCO2,
                    tooltipDate: tooltipDate,
                    investmentCosts: investmentCosts,
                    loanAmount: loanAmount,
                    bankName: bankName,
                };
            },
            chartOptions: function(chartOptions){
                chartOptions.title.text = 'Chart By Loan Amount';
                chartOptions.axisY.title = 'CO2 savings';

                return chartOptions;
            }
        },
        byInvestmentCosts: {
            columns: function(loan){
                var tooltipTitle = loan.loan_id;
                var tooltipCO2 = loan.co2_savings_kg;
                var tooltipDate = loan.disbursement_date;
                var investmentCosts = loan.investment_costs_eur;
                var loanAmount = loan.loan_amount_eur;
                var bankName = loan.name;

                return {
                    name: loan.loan_id,
                    y: loan.co2_savings_kg,
                    x: loan.investment_costs_eur,
                    z: loan.co2_savings_kg,
                    tooltipTitle: tooltipTitle,
                    tooltipCO2: tooltipCO2,
                    tooltipDate: tooltipDate,
                    investmentCosts: investmentCosts,
                    loanAmount: loanAmount,
                    bankName: bankName,
                };
            },
            chartOptions: function(chartOptions){
                chartOptions.title.text = 'Chart By Investment Costs';
                chartOptions.axisY.title = 'CO2 savings';

                return chartOptions;
            }
        },
    };

    $('#axis_option').change(function(){
        chartType = $(this).val();
        drawChart();
    }).change();

    $('#bank_id').change(function(){
        var bank_id = $(this).val();
        handleBankChange(bank_id);
    }).change();

    function handleBankChange(bank_id){
        loans = [];
        $('.axis-option').hide();

        $.ajax({
            url: './proxy.php',
            data: {
                bank_id: bank_id
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);

                for(item in data){
                    loans.push(data[item]);
                }

                drawChart();
                $('.axis-option').show();
            }
        });
    }

    function drawChart(){
        var dataPoints = [];

        if(typeof chartColumns[chartType] === 'undefined'){
            alert('Select Proper Chart Type!');
            return;
        }

        for(var i in loans){
            var loan = loans[i];
            dataPoints.push(chartColumns[chartType].columns(loan));
        }

        var options = {
            title:{
                text: "Fertility Rate vs Life Expectancy in Different Countries - 2015"
            },
            axisY: {
                // title:"CO2 savings",
                minimum: -50000,
            },
            legend:{
                // horizontalAlign: "left"
            },
            axisX:{
                // valueFormatString: "DD-MMM",
            },
            data: [{
                type: "bubble",
                // explodeOnClick: true,
                // xValueFormatString: "#",
                // yValueFormatString: "#",
                // zValueFormatString: "#",
                // toolTipContent: "<b>{name}</b><br/>Loan amount: {x} yrs<br/> CO2 savings: {y} kg<br/> Population: {z}mn",
                toolTipContent: "<b>{tooltipTitle}</b></br><b>CO2 savings: </b>{tooltipCO2}</br><b>Time: </b>{tooltipDate}</br><b>Investment Costs: </b>{investmentCosts}</br><b>Loan Amount: </b>{loanAmount}</br><b>Bank: </b>{bankName}",
                dataPoints: dataPoints
            }]
        };

        options = chartColumns[chartType].chartOptions(options);

        var chart = new CanvasJS.Chart("chartContainer", options);

        chart.render();
    }
});
