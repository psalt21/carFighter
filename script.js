var hybrid = {
  type: 'h',
  initialCost: '',
  mpg: '',
  resale: '',
  totalCost: '',
  gasUsed: '',
};

var normal = {
  type: 'n',
  initialCost: '',
  mpg: '',
  resale: '',
  totalCost: '',
  gasUsed: '',
};

var battleType;
var gasCost;
var milesDriven;

$(document).ready(function(){
  $('#fight').click(function(){

    battleType = $(".radio:checked").val();
    gasCost = $('#gas-cost').val();
    milesDriven = $('#num-miles').val();

    fillCar(hybrid);
    fillCar(normal);

    console.log('battleType', battleType);
    console.log('normal', normal);
    console.log('hybrid', hybrid);
    console.log('gasCost', gasCost);
    console.log('milesDriven', milesDriven);


    if(gasCost == '' || milesDriven == '' || normal.initialCost == '' || normal.mpg == '' || normal.resale == '' || hybrid.initialCost == '' || hybrid.mpg == '' || hybrid.resale== '' || battleType == null) {
  			alert('Don\'t hold back, my friend. Fill up the stats!');
  		}else{

      outputResults(hybrid);
      outputResults(normal);

      assignWinner(battleType);
      }
  });

  function fillCar(car) {
    car.initialCost = $('#' + car.type + '-initial-cost').val();
    car.mpg = $('#' + car.type + '-mpg').val();
    car.resale = $('#' + car.type + '-resale').val();

    car.totalCost = cost(car);
    car.gasUsed = fuelConsumed(car);
  }

  function cost(car) {
    var depreciation = car.initialCost - car.resale;
    var gallons = fuelConsumed(car);
    var costOfGas = gallons * gasCost;
    var totalCost = costOfGas + depreciation;

    return totalCost;
  }

  function fuelConsumed(car) {
    var gallons = milesDriven / car.mpg;
    return gallons;
  }


  function outputResults(car) {
    var gallonElm = $('#' + car.type + '-results span')[0];
    var costElm = $('#' + car.type + '-results span')[1];

    gallonElm.innerHTML = Math.round(car.gasUsed * 10) / 10;
    costElm.innerHTML = '$' + Math.round(car.totalCost);
  }

  function assignWinner(battleType) {
    if(battleType == 'gas'){
      if(hybrid.gasUsed <= normal.gasUsed){
        $('#h-results').removeClass('hidden');
        $('#h-results').css('background-color', 'gold');
        $('#n-results').removeClass('hidden');
        $('#n-results').css('background-color', 'silver');
      }else{
        $('#h-results').removeClass('hidden');
        $('#h-results').css('background-color', 'silver');
        $('#n-results').removeClass('hidden');
        $('#n-results').css('background-color', 'gold');
      }
    }else if(battleType == "cost"){
      if(hybrid.totalCost <= normal.totalCost){
        $('#h-results').removeClass('hidden');
        $('#h-results').css('background-color', 'gold');
        $('#n-results').removeClass('hidden');
        $('#n-results').css('background-color', 'silver');
      }else{
        $('#h-results').removeClass('hidden');
        $('#h-results').css('background-color', 'silver');
        $('#n-results').removeClass('hidden');
        $('#n-results').css('background-color', 'gold');
      }
    }else{
      alert('Please selcet battle type!');
    }
  }

});
